"use client";

import Link from "next/link";
import { useQueryState } from "nuqs";
import { dashboardSidebarItems } from "@/components/dashboard/sidebar-config";
import { DashboardSidebarUser } from "@/components/dashboard/sidebar-user";
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

function SidebarContentComponent() {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "overview",
  });

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {dashboardSidebarItems.map((item) => (
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
          <div className="px-2 py-1.5">
            <Link href="/" className="text-base font-semibold">
              Hades 2 Builder
            </Link>
          </div>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContentComponent />
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
