import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { NGOStatus } from "@/types";
import type { NGOProfilePublic } from "@/types";
import { Building2, Calendar, CheckCircle, Mail, XCircle } from "lucide-react";
import { useState } from "react";

interface NGOApprovalCardProps {
  ngo: NGOProfilePublic;
  onApprove?: () => void;
  onReject?: (reason: string) => void;
  onDeactivate?: () => void;
  isPending?: boolean;
  index: number;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const statusConfig: Record<NGOStatus, { label: string; className: string }> = {
  [NGOStatus.pending]: {
    label: "Pending",
    className: "bg-accent/10 text-accent border-accent/30",
  },
  [NGOStatus.approved]: {
    label: "Approved",
    className: "bg-success/10 text-success border-success/30",
  },
  [NGOStatus.rejected]: {
    label: "Rejected",
    className: "bg-destructive/10 text-destructive border-destructive/30",
  },
};

export function NGOApprovalCard({
  ngo,
  onApprove,
  onReject,
  onDeactivate,
  isPending = false,
  index,
}: NGOApprovalCardProps) {
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const statusStyle = statusConfig[ngo.status];

  return (
    <>
      <div
        className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-elevated transition-smooth"
        data-ocid={`ngo_card.item.${index}`}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-semibold text-foreground text-sm truncate">
                {ngo.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <Mail className="w-3 h-3 shrink-0" />
                <span className="truncate">{ngo.contactEmail}</span>
              </div>
            </div>
          </div>
          <span
            className={`shrink-0 inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-md border ${statusStyle.className}`}
          >
            {statusStyle.label}
          </span>
        </div>

        <p className="text-muted-foreground text-xs line-clamp-2 mb-3">
          {ngo.description || "No description provided."}
        </p>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <Calendar className="w-3 h-3" />
          <span>Registered {formatDate(ngo.createdAt)}</span>
        </div>

        {isPending && onApprove && onReject && (
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-success/10 text-success hover:bg-success/20 border border-success/30"
              variant="ghost"
              onClick={onApprove}
              data-ocid={`ngo_card.approve_button.${index}`}
            >
              <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
              Approve
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/30"
              variant="ghost"
              onClick={() => setRejectDialogOpen(true)}
              data-ocid={`ngo_card.reject_button.${index}`}
            >
              <XCircle className="w-3.5 h-3.5 mr-1.5" />
              Reject
            </Button>
          </div>
        )}

        {!isPending && ngo.isActive && onDeactivate && (
          <Button
            size="sm"
            variant="ghost"
            className="w-full bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/30"
            onClick={() => setDeactivateDialogOpen(true)}
            data-ocid={`ngo_card.delete_button.${index}`}
          >
            Suspend NGO
          </Button>
        )}
      </div>

      {/* Reject dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent data-ocid="ngo_reject.dialog">
          <DialogHeader>
            <DialogTitle>Reject NGO Application</DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting <strong>{ngo.name}</strong>. This
              will be recorded.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Enter rejection reason..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="min-h-[100px]"
            data-ocid="ngo_reject.textarea"
          />
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setRejectDialogOpen(false)}
              data-ocid="ngo_reject.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onReject?.(rejectReason);
                setRejectDialogOpen(false);
                setRejectReason("");
              }}
              disabled={!rejectReason.trim()}
              data-ocid="ngo_reject.confirm_button"
            >
              Confirm Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deactivate dialog */}
      <Dialog
        open={deactivateDialogOpen}
        onOpenChange={setDeactivateDialogOpen}
      >
        <DialogContent data-ocid="ngo_deactivate.dialog">
          <DialogHeader>
            <DialogTitle>Suspend NGO</DialogTitle>
            <DialogDescription>
              Are you sure you want to suspend <strong>{ngo.name}</strong>? This
              will deactivate their account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setDeactivateDialogOpen(false)}
              data-ocid="ngo_deactivate.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onDeactivate?.();
                setDeactivateDialogOpen(false);
              }}
              data-ocid="ngo_deactivate.confirm_button"
            >
              Confirm Suspend
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
