import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditRoleDialogProps {
  open: boolean;
  userName: string | undefined;
  role: string;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onRoleChange: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function EditRoleDialog({
  open,
  userName,
  role,
  isPending,
  onOpenChange,
  onRoleChange,
  onConfirm,
  onCancel,
}: EditRoleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Role</DialogTitle>
          <DialogDescription>Change role for {userName}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="userRole"
              className="mb-2 block text-sm font-medium"
            >
              Role
            </label>
            <Select value={role} onValueChange={onRoleChange}>
              <SelectTrigger id="userRole">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isPending || !role}>
            {isPending ? "Updating..." : "Update Role"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
