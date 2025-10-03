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
  onEditRole: (user: User) => void;
  onBanUser: (user: User) => void;
  onUnbanUser: (user: User) => void;
  isUnbanPending: boolean;
}

export function UsersTable({
  users,
  onEditRole,
  onBanUser,
  onUnbanUser,
  isUnbanPending,
}: UsersTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
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
              onEditRole={onEditRole}
              onBanUser={onBanUser}
              onUnbanUser={onUnbanUser}
              isUnbanPending={isUnbanPending}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
