import { useAcceptTask, useRejectTask } from "@/api/tasks";
import { MatchScoreBadge } from "@/components/shared/MatchScoreBadge";
import { SkillTag } from "@/components/shared/SkillTag";
import { PriorityBadge, StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { TaskPriority, TaskStatus } from "@/types";
import type { TaskPublic, TaskWithScore } from "@/types";
import { format } from "date-fns";
import { Calendar, CheckCircle, MapPin, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProofUploadForm } from "./ProofUploadForm";

interface TaskDetailModalProps {
  taskWithScore?: TaskWithScore | null;
  task?: TaskPublic | null;
  open: boolean;
  onClose: () => void;
  onProofSubmitted?: () => void;
}

export function TaskDetailModal({
  taskWithScore,
  task: taskProp,
  open,
  onClose,
  onProofSubmitted,
}: TaskDetailModalProps) {
  const task = taskWithScore?.task ?? taskProp;
  const matchScore = taskWithScore?.matchScore;
  const [showProofForm, setShowProofForm] = useState(false);

  const acceptTask = useAcceptTask();
  const rejectTask = useRejectTask();

  if (!task) return null;

  const deadline = new Date(Number(task.deadline / 1_000_000n));
  const isUrgent = task.priority === TaskPriority.urgent;
  const isAccepted = task.status === TaskStatus.accepted;
  const isPending = task.status === TaskStatus.pending;

  async function handleAccept() {
    if (!task) return;
    try {
      await acceptTask.mutateAsync(task.id);
      toast.success("Task accepted successfully!");
      onClose();
    } catch {
      toast.error("Failed to accept task");
    }
  }

  async function handleReject() {
    if (!task) return;
    try {
      await rejectTask.mutateAsync(task.id);
      toast.success("Task rejected");
      onClose();
    } catch {
      toast.error("Failed to reject task");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="task.dialog"
      >
        <DialogHeader>
          <div className="flex items-start gap-3 pr-6">
            <div className="flex-1 min-w-0">
              {isUrgent && (
                <div className="w-full h-1 bg-accent rounded-full mb-3 -mt-1" />
              )}
              <DialogTitle className="font-display text-lg leading-snug">
                {task.title}
              </DialogTitle>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <PriorityBadge priority={task.priority} />
            <StatusBadge status={task.status} />
            {matchScore !== undefined && (
              <MatchScoreBadge score={matchScore} size="sm" />
            )}
          </div>
        </DialogHeader>

        <Separator />

        <div className="space-y-4 py-2">
          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {task.location && (
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-primary" />
                {task.location.displayName}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-primary" />
              Deadline: {format(deadline, "MMM d, yyyy")}
            </span>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
              Description
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              {task.description || "No description provided."}
            </p>
          </div>

          {/* Required Skills */}
          {task.requiredSkills.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Required Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {task.requiredSkills.map((s) => (
                  <SkillTag key={s} skill={s} variant="outline" />
                ))}
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-1">
          {isPending && (
            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={handleAccept}
                disabled={acceptTask.isPending}
                data-ocid="task.confirm_button"
              >
                <CheckCircle size={15} className="mr-1.5" />
                {acceptTask.isPending ? "Accepting..." : "Accept Task"}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleReject}
                disabled={rejectTask.isPending}
                data-ocid="task.cancel_button"
              >
                <X size={15} className="mr-1.5" />
                {rejectTask.isPending ? "Rejecting..." : "Reject"}
              </Button>
            </div>
          )}

          {isAccepted && !showProofForm && (
            <Button
              className="w-full"
              onClick={() => setShowProofForm(true)}
              data-ocid="task.mark_complete_button"
            >
              <CheckCircle size={15} className="mr-1.5" />
              Mark as Completed
            </Button>
          )}

          {isAccepted && showProofForm && (
            <ProofUploadForm
              taskId={task.id}
              onSuccess={() => {
                setShowProofForm(false);
                onProofSubmitted?.();
                onClose();
              }}
              onCancel={() => setShowProofForm(false)}
            />
          )}

          <Button
            variant="ghost"
            onClick={onClose}
            className="text-muted-foreground"
            data-ocid="task.close_button"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
