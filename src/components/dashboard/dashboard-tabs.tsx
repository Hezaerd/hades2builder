"use client";

import { ShieldAlert } from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";
import {
  BuildsTab,
  DatabaseTab,
  OverviewTab,
  SettingsTab,
  TemplatesTab,
  UsersTab,
} from "./tabs";

const ADMIN_ONLY_TABS = ["users", "database"];

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "overview",
    shallow: false,
  });
  const { data: session } = authClient.useSession();
  const isAdmin = session?.user?.role === "admin";

  // Redirect non-admin users trying to access admin tabs
  useEffect(() => {
    if (activeTab && ADMIN_ONLY_TABS.includes(activeTab) && !isAdmin) {
      setActiveTab("overview");
    }
  }, [activeTab, isAdmin, setActiveTab]);

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
        {isAdmin ? (
          <UsersTab />
        ) : (
          <Alert variant="destructive">
            <ShieldAlert className="size-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You don't have permission to access this page. Admin privileges
              are required.
            </AlertDescription>
          </Alert>
        )}
      </TabsContent>

      <TabsContent value="database" className="mt-6">
        {isAdmin ? (
          <DatabaseTab />
        ) : (
          <Alert variant="destructive">
            <ShieldAlert className="size-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You don't have permission to access this page. Admin privileges
              are required.
            </AlertDescription>
          </Alert>
        )}
      </TabsContent>
    </Tabs>
  );
}
