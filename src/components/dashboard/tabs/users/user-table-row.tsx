import { format } from "date-fns";
import { Ban, CheckCircle, Edit, UserX, XCircle } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { UserRoleBadge } from "./user-role-badge";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string | null;
  banned: boolean | null;
  banReason: string | null;
  banExpires: string | null;
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  image: string | null;
  isAnonymous: boolean | null;
  _count: {
    sessions: number;
  };
}

interface UserTableRowProps {
  user: User;
  onEditRole: (user: User) => void;
  onBanUser: (user: User) => void;
  onUnbanUser: (user: User) => void;
  isUnbanPending: boolean;
}

export function UserTableRow({
  user,
  onEditRole,
  onBanUser,
  onUnbanUser,
  isUnbanPending,
}: UserTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          {user.image && (
            <Image
              src={user.image}
              alt={user.name}
              width={32}
              height={32}
              className="size-8 rounded-full"
            />
          )}
          <div>
            <div>{user.name}</div>
            {user.isAnonymous && (
              <Badge variant="outline" className="text-xs">
                Anonymous
              </Badge>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {user.email}
          {user.emailVerified && (
            <CheckCircle className="size-4 text-green-500" />
          )}
        </div>
      </TableCell>
      <TableCell>
        <UserRoleBadge role={user.role} />
      </TableCell>
      <TableCell>
        {user.banned ? (
          <Badge variant="destructive" className="gap-1">
            <UserX className="size-3" />
            Banned
          </Badge>
        ) : (
          <Badge variant="outline" className="gap-1">
            <CheckCircle className="size-3" />
            Active
          </Badge>
        )}
      </TableCell>
      <TableCell>{user._count.sessions}</TableCell>
      <TableCell>{format(new Date(user.createdAt), "MMM d, yyyy")}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={() => onEditRole(user)}>
            <Edit className="size-3" />
          </Button>
          {user.banned ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onUnbanUser(user)}
              disabled={isUnbanPending}
            >
              <XCircle className="size-3" />
            </Button>
          ) : (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onBanUser(user)}
            >
              <Ban className="size-3" />
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
