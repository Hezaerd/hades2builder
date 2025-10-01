import Link from "next/link";
import { Suspense } from "react";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Quick actions and recent activity
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard?tab=builds">
              <Button>New Build</Button>
            </Link>
            <Link href="#">
              <Button variant="outline">Import Save</Button>
            </Link>
          </div>
        </div>
      </div>

      <Separator />

      <Suspense fallback={<div className="mt-6">Loading dashboard...</div>}>
        <DashboardTabs />
      </Suspense>
    </div>
  );
}
