"use client";

import { useQueryState } from "nuqs";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  BuildsTab,
  DatabaseTab,
  OverviewTab,
  SettingsTab,
  TemplatesTab,
  UsersTab,
} from "./tabs";

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

      <TabsContent value="users" className="mt-6">
        <UsersTab />
      </TabsContent>

      <TabsContent value="database" className="mt-6">
        <DatabaseTab />
      </TabsContent>
    </Tabs>
  );
}
