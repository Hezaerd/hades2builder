"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import {
  BanUserDialog,
  EditRoleDialog,
  TablePagination,
  type User,
  UserFilters,
  UsersTable,
} from "./users";

interface UsersResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

async function fetchUsers(
  page: number,
  limit: number,
  search: string,
  roleFilter: string,
  bannedFilter: string,
): Promise<UsersResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
    ...(roleFilter && roleFilter !== "all" && { role: roleFilter }),
    ...(bannedFilter && bannedFilter !== "all" && { banned: bannedFilter }),
  });

  const response = await fetch(`/api/admin/users?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export function UsersTab() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [bannedFilter, setBannedFilter] = useState("all");

  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [banReason, setBanReason] = useState("");
  const [banExpiresIn, setBanExpiresIn] = useState("");
  const [newRole, setNewRole] = useState("");

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", page, limit, search, roleFilter, bannedFilter],
    queryFn: () => fetchUsers(page, limit, search, roleFilter, bannedFilter),
  });

  const banUserMutation = useMutation({
    mutationFn: async ({
      userId,
      banReason,
      banExpiresIn,
    }: {
      userId: string;
      banReason?: string;
      banExpiresIn?: number;
    }) => {
      return authClient.admin.banUser({
        userId,
        banReason,
        banExpiresIn,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User banned successfully");
      setBanDialogOpen(false);
      setBanReason("");
      setBanExpiresIn("");
    },
    onError: (error: Error) => {
      toast.error(error?.message || "Failed to ban user");
    },
  });

  const unbanUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      return authClient.admin.unbanUser({ userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User unbanned successfully");
    },
    onError: (error: Error) => {
      toast.error(error?.message || "Failed to unban user");
    },
  });

  const setRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      return authClient.admin.setRole({ userId, role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User role updated successfully");
      setRoleDialogOpen(false);
      setNewRole("");
    },
    onError: (error: Error) => {
      toast.error(error?.message || "Failed to update user role");
    },
  });

  function handleSearch() {
    setSearch(searchInput);
    setPage(1);
  }

  function handleBanUser(user: User) {
    setSelectedUser(user);
    setBanDialogOpen(true);
  }

  function handleUnbanUser(user: User) {
    unbanUserMutation.mutate(user.id);
  }

  function handleEditRole(user: User) {
    setSelectedUser(user);
    setNewRole(user.role || "user");
    setRoleDialogOpen(true);
  }

  function confirmBan() {
    if (!selectedUser) return;

    const expiresInSeconds = banExpiresIn
      ? Number.parseInt(banExpiresIn, 10) * 24 * 60 * 60
      : undefined;

    banUserMutation.mutate({
      userId: selectedUser.id,
      banReason: banReason || undefined,
      banExpiresIn: expiresInSeconds,
    });
  }

  function confirmRoleChange() {
    if (!selectedUser || !newRole) return;
    setRoleMutation.mutate({
      userId: selectedUser.id,
      role: newRole,
    });
  }

  function handleCancelBan() {
    setBanDialogOpen(false);
    setBanReason("");
    setBanExpiresIn("");
  }

  function handleCancelRoleChange() {
    setRoleDialogOpen(false);
    setNewRole("");
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage users, roles, and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserFilters
            searchInput={searchInput}
            roleFilter={roleFilter}
            bannedFilter={bannedFilter}
            onSearchInputChange={setSearchInput}
            onRoleFilterChange={setRoleFilter}
            onBannedFilterChange={setBannedFilter}
            onSearch={handleSearch}
          />

          {isLoading ? (
            <div className="text-muted-foreground py-8 text-center">
              Loading users...
            </div>
          ) : error ? (
            <div className="py-8 text-center text-red-500">
              Error loading users
            </div>
          ) : !data?.users?.length ? (
            <div className="text-muted-foreground py-8 text-center">
              No users found
            </div>
          ) : (
            <>
              <UsersTable
                users={data.users}
                onEditRole={handleEditRole}
                onBanUser={handleBanUser}
                onUnbanUser={handleUnbanUser}
                isUnbanPending={unbanUserMutation.isPending}
              />

              <TablePagination
                currentPage={page}
                totalPages={data.pagination.totalPages}
                pageSize={limit}
                totalItems={data.pagination.total}
                onPageChange={setPage}
              />
            </>
          )}
        </CardContent>
      </Card>

      <BanUserDialog
        open={banDialogOpen}
        userName={selectedUser?.name}
        banReason={banReason}
        banExpiresIn={banExpiresIn}
        isPending={banUserMutation.isPending}
        onOpenChange={setBanDialogOpen}
        onBanReasonChange={setBanReason}
        onBanExpiresInChange={setBanExpiresIn}
        onConfirm={confirmBan}
        onCancel={handleCancelBan}
      />

      <EditRoleDialog
        open={roleDialogOpen}
        userName={selectedUser?.name}
        role={newRole}
        isPending={setRoleMutation.isPending}
        onOpenChange={setRoleDialogOpen}
        onRoleChange={setNewRole}
        onConfirm={confirmRoleChange}
        onCancel={handleCancelRoleChange}
      />
    </div>
  );
}
