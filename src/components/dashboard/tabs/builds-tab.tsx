import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDashboardStore } from "@/lib/stores/dashboard-store";

export function BuildsTab() {
  const { filters, setFilters } = useDashboardStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Builds</h2>
          <p className="text-muted-foreground">
            Manage and organize your Hades 2 builds
          </p>
        </div>
        <Button>New Build</Button>
      </div>

      <div className="flex gap-4">
        <Input placeholder="Search builds..." className="max-w-sm" />
        <select
          value={filters.buildType || ""}
          onChange={(e) => setFilters({ buildType: e.target.value || null })}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">All Types</option>
          <option value="melee">Melee</option>
          <option value="ranged">Ranged</option>
          <option value="magic">Magic</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Sample Build</CardTitle>
            <CardDescription>Zeus Lightning Build</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              A powerful lightning-based build focusing on Zeus boons.
            </div>
          </CardContent>
        </Card>
        {/* Add more build cards here */}
      </div>
    </div>
  );
}
