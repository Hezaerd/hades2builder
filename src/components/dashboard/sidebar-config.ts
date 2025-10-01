import { Hammer, Layers, LayoutDashboard } from "lucide-react";

export type SidebarItem = {
  title: string;
  href: string;
  tab: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export const dashboardSidebarItems: SidebarItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    tab: "overview",
    icon: LayoutDashboard,
  },
  {
    title: "Builds",
    href: "/dashboard?tab=builds",
    tab: "builds",
    icon: Hammer,
  },
  {
    title: "Templates",
    href: "/dashboard?tab=templates",
    tab: "templates",
    icon: Layers,
  },
];
