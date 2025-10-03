import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type User, UserTableRow } from "./user-table-row";

interface UsersTableProps {
  users: User[];
  selectedUsers: Set<string>;
  onEditRole: (user: User) => void;
  onBanUser: (user: User) => void;
  onUnbanUser: (user: User) => void;
  isUnbanPending: boolean;
  onSelectUser: (userId: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
}

export function UsersTable({
  users,
  selectedUsers,
  onEditRole,
  onBanUser,
  onUnbanUser,
  isUnbanPending,
  onSelectUser,
  onSelectAll,
}: UsersTableProps) {
  const allSelected =
    users.length > 0 && users.every((user) => selectedUsers.has(user.id));
  const someSelected =
    users.some((user) => selectedUsers.has(user.id)) && !allSelected;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                onCheckedChange={onSelectAll}
                aria-label="Select all users"
                className={
                  someSelected ? "data-[state=checked]:bg-primary/50" : ""
                }
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Sessions</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              selected={selectedUsers.has(user.id)}
              onEditRole={onEditRole}
              onBanUser={onBanUser}
              onUnbanUser={onUnbanUser}
              isUnbanPending={isUnbanPending}
              onSelectUser={onSelectUser}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
