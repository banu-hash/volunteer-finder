import { useVerifyTask } from "@/api/tasks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TaskPublic } from "@/types";
import { CheckCircle, Image, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  task: TaskPublic | null;
  open: boolean;
  onClose: () => void;
}

export function ProofReviewPanel({ task, open, onClose }: Props) {
  const verifyTask = useVerifyTask();
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  async function handleVerify(approved: boolean) {
    if (!task) return;
    try {
      await verifyTask.mutateAsync({ taskId: task.id, approved });
      toast.success(
        approved ? "Task verified and approved!" : "Task completion rejected.",
      );
      onClose();
    } catch {
      toast.error("Failed to update task. Please try again.");
    }
  }

  if (!task) return null;

  const proofs = task.proofUrls;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-2xl max-h-[85vh] overflow-y-auto"
        data-ocid="proof-review.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">
            Review Completion Proof
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Task:{" "}
            <span className="text-foreground font-medium">{task.title}</span>
          </p>
        </DialogHeader>

        {/* Proof Gallery */}
        <div className="space-y-3">
          {proofs.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-10 border border-dashed border-border rounded-lg text-muted-foreground gap-2"
              data-ocid="proof-review.empty_state"
            >
              <Image size={32} className="opacity-40" />
              <p className="text-sm">No proof uploads yet</p>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-foreground">
                {proofs.length} proof file{proofs.length !== 1 ? "s" : ""}{" "}
                uploaded
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {proofs.map((proof, i) => {
                  const url = proof.getDirectURL();
                  const ocid = `proof-review.item.${i + 1}`;
                  return (
                    <button
                      key={url}
                      type="button"
                      className="relative group rounded-lg overflow-hidden bg-muted aspect-video border border-border hover:border-primary/50 transition-smooth w-full"
                      onClick={() => setSelectedImage(url)}
                      aria-label={`View proof ${i + 1}`}
                      data-ocid={ocid}
                    >
                      <img
                        src={url}
                        alt={`Proof ${i + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <span className="absolute bottom-1 right-1 text-xs bg-background/80 px-1.5 py-0.5 rounded">
                        #{i + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <button
            type="button"
            className="fixed inset-0 z-50 bg-background/90 flex items-center justify-center p-4 w-full"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image preview"
          >
            <img
              src={selectedImage}
              alt="Proof full view"
              className="max-w-full max-h-full object-contain rounded-lg shadow-elevated"
            />
          </button>
        )}

        {/* Reject Form */}
        {showRejectForm && (
          <div className="space-y-2 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
            <Label className="text-destructive text-sm font-medium">
              Rejection reason (optional)
            </Label>
            <Textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Explain why the proof is insufficient..."
              rows={3}
              data-ocid="proof-review.reject_reason_textarea"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="proof-review.cancel_button"
          >
            Cancel
          </Button>
          {!showRejectForm ? (
            <>
              <Button
                variant="outline"
                className="flex-1 text-destructive border-destructive/40 hover:bg-destructive/10"
                onClick={() => setShowRejectForm(true)}
                data-ocid="proof-review.reject_button"
              >
                <XCircle size={14} className="mr-1.5" />
                Reject
              </Button>
              <Button
                className="flex-1 bg-success text-success-foreground hover:bg-success/90"
                onClick={() => handleVerify(true)}
                disabled={verifyTask.isPending}
                data-ocid="proof-review.approve_button"
              >
                <CheckCircle size={14} className="mr-1.5" />
                {verifyTask.isPending ? "Approving..." : "Approve"}
              </Button>
            </>
          ) : (
            <Button
              className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => handleVerify(false)}
              disabled={verifyTask.isPending}
              data-ocid="proof-review.confirm_button"
            >
              {verifyTask.isPending ? "Rejecting..." : "Confirm Rejection"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
