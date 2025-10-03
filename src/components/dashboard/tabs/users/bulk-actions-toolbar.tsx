import { Ban, Edit, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

interface BulkActionsToolbarProps {
  selectedCount: number;
  onBulkEditRole: () => void;
  onBulkBan: () => void;
  onBulkUnban: () => void;
  onClearSelection: () => void;
}

export function BulkActionsToolbar({
  selectedCount,
  onBulkEditRole,
  onBulkBan,
  onBulkUnban,
  onClearSelection,
}: BulkActionsToolbarProps) {
  if (selectedCount === 0) return null;

  return (
    <Card className="mb-4 border-primary/50">
      <CardHeader className="pb-3">
        <CardDescription className="flex items-center justify-between">
          <span className="text-base font-medium">
            {selectedCount} user{selectedCount !== 1 ? "s" : ""} selected
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClearSelection}
            className="h-auto p-1"
          >
            Clear selection
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={onBulkEditRole}>
            <Edit className="mr-2 size-4" />
            Change Role
          </Button>
          <Button size="sm" variant="destructive" onClick={onBulkBan}>
            <Ban className="mr-2 size-4" />
            Ban Selected
          </Button>
          <Button size="sm" variant="outline" onClick={onBulkUnban}>
            <XCircle className="mr-2 size-4" />
            Unban Selected
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
