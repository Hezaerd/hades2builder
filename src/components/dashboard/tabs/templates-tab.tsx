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

export function TemplatesTab() {
  const { filters, setFilters } = useDashboardStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Templates</h2>
          <p className="text-muted-foreground">
            Browse and use build templates
          </p>
        </div>
        <Button>Create Template</Button>
      </div>

      <div className="flex gap-4">
        <Input placeholder="Search templates..." className="max-w-sm" />
        <select
          value={filters.templateCategory || ""}
          onChange={(e) =>
            setFilters({ templateCategory: e.target.value || null })
          }
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">All Categories</option>
          <option value="beginner">Beginner</option>
          <option value="advanced">Advanced</option>
          <option value="speedrun">Speedrun</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Lightning Storm</CardTitle>
            <CardDescription>Zeus-focused build template</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              A comprehensive template for lightning-based builds.
            </div>
          </CardContent>
        </Card>
        {/* Add more template cards here */}
      </div>
    </div>
  );
}
