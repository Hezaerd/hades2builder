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
  BulkActionsToolbar,
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

  // Selection state
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [isBulkOperation, setIsBulkOperation] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", page, limit, search, roleFilter, bannedFilter],
    queryFn: () => fetchUsers(page, limit, search, roleFilter, bannedFilter),
    staleTime: 60_000, // Consider data fresh for 1 minute
    gcTime: 5 * 60_000, // Keep unused data in cache for 5 minutes
    refetchOnMount: true, // Refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnReconnect: true, // Refetch when reconnecting
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
    setIsBulkOperation(false);
    setBanDialogOpen(true);
  }

  function handleUnbanUser(user: User) {
    unbanUserMutation.mutate(user.id);
  }

  function handleEditRole(user: User) {
    setSelectedUser(user);
    setNewRole(user.role || "user");
    setIsBulkOperation(false);
    setRoleDialogOpen(true);
  }

  // Selection handlers
  function handleSelectUser(userId: string, selected: boolean) {
    setSelectedUsers((prev) => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(userId);
      } else {
        newSet.delete(userId);
      }
      return newSet;
    });
  }

  function handleSelectAll(selected: boolean) {
    if (selected && data?.users) {
      setSelectedUsers(new Set(data.users.map((user) => user.id)));
    } else {
      setSelectedUsers(new Set());
    }
  }

  function handleClearSelection() {
    setSelectedUsers(new Set());
  }

  // Bulk operation handlers
  function handleBulkEditRole() {
    if (selectedUsers.size === 0) return;
    setIsBulkOperation(true);
    setNewRole("user");
    setRoleDialogOpen(true);
  }

  function handleBulkBan() {
    if (selectedUsers.size === 0) return;
    setIsBulkOperation(true);
    setBanDialogOpen(true);
  }

  function handleBulkUnban() {
    if (selectedUsers.size === 0) return;

    const userIds = Array.from(selectedUsers);
    let completed = 0;
    let failed = 0;

    toast.promise(
      Promise.all(
        userIds.map(async (userId) => {
          try {
            await authClient.admin.unbanUser({ userId });
            completed++;
          } catch (error) {
            failed++;
            throw error;
          }
        }),
      ).finally(() => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        setSelectedUsers(new Set());
      }),
      {
        loading: `Unbanning ${userIds.length} users...`,
        success: () => {
          if (failed > 0) {
            return `Unbanned ${completed} users (${failed} failed)`;
          }
          return `Successfully unbanned ${completed} users`;
        },
        error: "Failed to unban some users",
      },
    );
  }

  function confirmBan() {
    const expiresInSeconds = banExpiresIn
      ? Number.parseInt(banExpiresIn, 10) * 24 * 60 * 60
      : undefined;

    if (isBulkOperation) {
      // Bulk ban operation
      const userIds = Array.from(selectedUsers);
      let completed = 0;
      let failed = 0;

      toast.promise(
        Promise.all(
          userIds.map(async (userId) => {
            try {
              await authClient.admin.banUser({
                userId,
                banReason: banReason || undefined,
                banExpiresIn: expiresInSeconds,
              });
              completed++;
            } catch (error) {
              failed++;
              throw error;
            }
          }),
        ).finally(() => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          setSelectedUsers(new Set());
          setBanDialogOpen(false);
          setBanReason("");
          setBanExpiresIn("");
        }),
        {
          loading: `Banning ${userIds.length} users...`,
          success: () => {
            if (failed > 0) {
              return `Banned ${completed} users (${failed} failed)`;
            }
            return `Successfully banned ${completed} users`;
          },
          error: "Failed to ban some users",
        },
      );
    } else if (selectedUser) {
      // Single user ban
      banUserMutation.mutate({
        userId: selectedUser.id,
        banReason: banReason || undefined,
        banExpiresIn: expiresInSeconds,
      });
    }
  }

  function confirmRoleChange() {
    if (!newRole) return;

    if (isBulkOperation) {
      // Bulk role change operation
      const userIds = Array.from(selectedUsers);
      let completed = 0;
      let failed = 0;

      toast.promise(
        Promise.all(
          userIds.map(async (userId) => {
            try {
              await authClient.admin.setRole({ userId, role: newRole });
              completed++;
            } catch (error) {
              failed++;
              throw error;
            }
          }),
        ).finally(() => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          setSelectedUsers(new Set());
          setRoleDialogOpen(false);
          setNewRole("");
        }),
        {
          loading: `Updating ${userIds.length} users...`,
          success: () => {
            if (failed > 0) {
              return `Updated ${completed} users (${failed} failed)`;
            }
            return `Successfully updated ${completed} users`;
          },
          error: "Failed to update some users",
        },
      );
    } else if (selectedUser) {
      // Single user role change
      setRoleMutation.mutate({
        userId: selectedUser.id,
        role: newRole,
      });
    }
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
              <BulkActionsToolbar
                selectedCount={selectedUsers.size}
                onBulkEditRole={handleBulkEditRole}
                onBulkBan={handleBulkBan}
                onBulkUnban={handleBulkUnban}
                onClearSelection={handleClearSelection}
              />

              <UsersTable
                users={data.users}
                selectedUsers={selectedUsers}
                onEditRole={handleEditRole}
                onBanUser={handleBanUser}
                onUnbanUser={handleUnbanUser}
                isUnbanPending={unbanUserMutation.isPending}
                onSelectUser={handleSelectUser}
                onSelectAll={handleSelectAll}
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
        userName={
          isBulkOperation
            ? `${selectedUsers.size} selected users`
            : selectedUser?.name
        }
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
        userName={
          isBulkOperation
            ? `${selectedUsers.size} selected users`
            : selectedUser?.name
        }
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
