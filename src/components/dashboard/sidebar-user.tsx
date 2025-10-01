"use client";

import { Settings } from "lucide-react";
import Link from "next/link";
import { DiscordAuthButton } from "@/components/discord-auth-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function DashboardSidebarUser() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  if (!user) {
    return (
      <div className="flex items-center justify-between gap-2 rounded-md border bg-background px-2 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <Avatar className="size-8">
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
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
    <div className="flex items-center justify-between gap-2 rounded-md border bg-background px-2 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <Avatar className="size-8">
          <AvatarImage src={user.image || ""} alt={name} />
          <AvatarFallback>{initial}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">{name}</div>
        </div>
      </div>
      <Button asChild variant="ghost" size="icon" aria-label="Settings">
        <Link href="/dashboard?tab=settings">
          <Settings className="size-4" />
        </Link>
      </Button>
    </div>
  );
}
