"use client";

import Link from "next/link";
import { useQueryState } from "nuqs";
import { Suspense } from "react";
import { dashboardSidebarItems } from "@/components/dashboard/sidebar-config";
import { DashboardSidebarUser } from "@/components/dashboard/sidebar-user";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

function SidebarContentComponent() {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "overview",
  });
  const { data: session } = authClient.useSession();
  const isAdmin = session?.user?.role === "admin";

  // Filter items based on admin status
  const filteredItems = dashboardSidebarItems.filter(
    (item) => !item.adminOnly || isAdmin,
  );

  // Group items by category
  const itemsByCategory = filteredItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof filteredItems>,
  );

  return (
    <SidebarContent>
      {Object.entries(itemsByCategory).map(([category, items]) => (
        <SidebarGroup key={category}>
          <SidebarGroupLabel className="capitalize">
            {category}
          </SidebarGroupLabel>
          <Separator className="mb-2 bg-muted" />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.tab}>
                  <SidebarMenuButton asChild isActive={activeTab === item.tab}>
                    <Link
                      href={item.href}
                      className="flex items-center"
                      onClick={() => setActiveTab(item.tab)}
                    >
                      {item.icon ? <item.icon className="size-4" /> : null}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas" className="border-r">
        <SidebarHeader>
          <div className="flex h-14 items-center px-2">
            <Link href="/" className="text-base font-semibold">
              Hades 2 Builder
            </Link>
          </div>
        </SidebarHeader>
        <SidebarSeparator className="mx-0" />
        <Suspense fallback={<div className="p-2">Loading...</div>}>
          <SidebarContentComponent />
        </Suspense>
        <SidebarFooter>
          <DashboardSidebarUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <div className="text-sm text-muted-foreground">Dashboard</div>
        </div>
        <div className="flex-1 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
