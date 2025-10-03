import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UserRoleBadgeProps {
  role: string | null;
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  if (!role || role === "user") {
    return <Badge variant="secondary">User</Badge>;
  }

  if (role === "admin") {
    return (
      <Badge variant="default" className="bg-red-400">
        <ShieldCheck className="mr-1 size-3" />
        Admin
      </Badge>
    );
  }

  return <Badge>{role}</Badge>;
}
