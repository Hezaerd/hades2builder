"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InfoIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Theme = "LIGHT" | "DARK";

interface UserSettings {
  id: string;
  userId: string;
  theme: Theme;
  createdAt: string;
  updatedAt: string;
}

interface SettingsResponse {
  success: boolean;
  data: UserSettings;
}

async function fetchSettings(): Promise<SettingsResponse> {
  const response = await fetch("/api/settings");
  if (!response.ok) {
    throw new Error("Failed to load settings");
  }
  return response.json();
}

async function updateSettings(theme: Theme): Promise<SettingsResponse> {
  const response = await fetch("/api/settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ theme }),
  });

  if (!response.ok) {
    throw new Error("Failed to update settings");
  }

  return response.json();
}

export function SettingsTab() {
  const { setTheme } = useTheme();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["userSettings"],
    queryFn: fetchSettings,
  });

  useEffect(() => {
    if (data?.data?.theme) {
      setTheme(data.data.theme.toLowerCase());
    }
  }, [data?.data?.theme, setTheme]);

  const { mutate: updateTheme, isPending } = useMutation({
    mutationFn: updateSettings,
    onMutate: async (newTheme) => {
      await queryClient.cancelQueries({ queryKey: ["userSettings"] });

      const previousSettings = queryClient.getQueryData(["userSettings"]);

      setTheme(newTheme.toLowerCase());

      return { previousSettings };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["userSettings"], data);
      toast.success("Theme updated successfully");
    },
    onError: (error, _variables, context) => {
      if (context?.previousSettings) {
        queryClient.setQueryData(["userSettings"], context.previousSettings);
        const previousTheme = (context.previousSettings as SettingsResponse)
          ?.data?.theme;
        if (previousTheme) {
          setTheme(previousTheme.toLowerCase());
        }
      }
      console.error("Error updating theme:", error);
      toast.error("Failed to update theme");
    },
  });

  function handleThemeChange(newTheme: string) {
    const themeValue = newTheme.toUpperCase() as Theme;
    updateTheme(themeValue);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account preferences and application settings
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Appearance
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Choose your preferred theme. Your selection will be saved
                      and applied across all devices.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs
              value={data?.data?.theme.toLowerCase() || "dark"}
              onValueChange={handleThemeChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="light" disabled={isLoading || isPending}>
                  Light
                </TabsTrigger>
                <TabsTrigger value="dark" disabled={isLoading || isPending}>
                  Dark
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
