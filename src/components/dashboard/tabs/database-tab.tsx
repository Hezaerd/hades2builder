import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DatabaseTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Game Database Editor</CardTitle>
          <CardDescription>
            Manage game content and add new items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Game database editor interface coming soon.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
