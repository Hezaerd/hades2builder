"use client";

import { MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UserRoleBadge } from "@/components/dashboard/tabs/users/user-role-badge";
import { DiscordAuthButton } from "@/components/discord-auth-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

export function DashboardSidebarUser() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  if (!user) {
    return (
      <div className="flex items-center justify-between gap-3 px-2 py-2">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <span className="text-sm font-medium">?</span>
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">Guest</div>
          </div>
        </div>
        <DiscordAuthButton variant="ghost" size="sm" />
      </div>
    );
  }

  const name = user.name ?? "User";
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="flex items-center justify-between gap-3 px-2 py-2">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {user.image ? (
          <Image
            src={user.image}
            alt={name}
            width={40}
            height={40}
            className="size-10 rounded-lg"
          />
        ) : (
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <span className="text-sm font-medium">{initial}</span>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium">{name}</div>
          <UserRoleBadge
            role={(user as { role?: string | null }).role ?? null}
          />
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="/dashboard?tab=settings">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
