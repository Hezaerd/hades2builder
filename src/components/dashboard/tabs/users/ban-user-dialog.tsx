import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface BanUserDialogProps {
  open: boolean;
  userName: string | undefined;
  banReason: string;
  banExpiresIn: string;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onBanReasonChange: (value: string) => void;
  onBanExpiresInChange: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function BanUserDialog({
  open,
  userName,
  banReason,
  banExpiresIn,
  isPending,
  onOpenChange,
  onBanReasonChange,
  onBanExpiresInChange,
  onConfirm,
  onCancel,
}: BanUserDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ban User</DialogTitle>
          <DialogDescription>
            Ban {userName} from the application
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="banReason"
              className="mb-2 block text-sm font-medium"
            >
              Ban Reason (optional)
            </label>
            <Input
              id="banReason"
              placeholder="Reason for ban..."
              value={banReason}
              onChange={(e) => onBanReasonChange(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="banDuration"
              className="mb-2 block text-sm font-medium"
            >
              Ban Duration (days, optional)
            </label>
            <Input
              id="banDuration"
              type="number"
              placeholder="Leave empty for permanent ban"
              value={banExpiresIn}
              onChange={(e) => onBanExpiresInChange(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? "Banning..." : "Ban User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
