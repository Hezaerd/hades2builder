import { Database, Hammer, Layers, LayoutDashboard, Users } from "lucide-react";

export type SidebarItem = {
  title: string;
  category: string;
  href: string;
  tab: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export const dashboardSidebarItems: SidebarItem[] = [
  {
    title: "Overview",
    category: "Home",
    href: "/dashboard",
    tab: "overview",
    icon: LayoutDashboard,
  },
  {
    title: "Builds",
    category: "Home",
    href: "/dashboard?tab=builds",
    tab: "builds",
    icon: Hammer,
  },
  {
    title: "Templates",
    category: "Home",
    href: "/dashboard?tab=templates",
    tab: "templates",
    icon: Layers,
  },
  {
    title: "Users",
    category: "admin",
    href: "/dashboard?tab=users",
    tab: "users",
    icon: Users,
  },
  {
    title: "Database Editor",
    category: "admin",
    href: "/dashboard?tab=database",
    tab: "database",
    icon: Database,
  },
];
