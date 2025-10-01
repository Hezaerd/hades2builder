"use client";

import { useQueryState } from "nuqs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BuildsTab } from "./tabs/builds-tab";
import { OverviewTab } from "./tabs/overview-tab";
import { SettingsTab } from "./tabs/settings-tab";
import { TemplatesTab } from "./tabs/templates-tab";

const TAB_OPTIONS = [
  { value: "overview", label: "Overview" },
  { value: "builds", label: "Builds" },
  { value: "templates", label: "Templates" },
  { value: "settings", label: "Settings" },
] as const;

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "overview",
    shallow: false,
  });

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsContent value="overview" className="mt-6">
        <OverviewTab />
      </TabsContent>

      <TabsContent value="builds" className="mt-6">
        <BuildsTab />
      </TabsContent>

      <TabsContent value="templates" className="mt-6">
        <TemplatesTab />
      </TabsContent>

      <TabsContent value="settings" className="mt-6">
        <SettingsTab />
      </TabsContent>
    </Tabs>
  );
}
