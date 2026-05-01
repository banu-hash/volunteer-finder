import { cn } from "@/lib/utils";
import { TaskPriority, TaskStatus } from "@/types";

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  [TaskStatus.pending]: {
    label: "Pending",
    className: "bg-muted text-muted-foreground border-border",
  },
  [TaskStatus.accepted]: {
    label: "Accepted",
    className: "bg-primary/10 text-primary border-primary/30",
  },
  [TaskStatus.completed]: {
    label: "Completed",
    className: "bg-success/10 text-success border-success/30",
  },
  [TaskStatus.verified]: {
    label: "Verified",
    className: "bg-success/20 text-success border-success/40",
  },
  [TaskStatus.rejected]: {
    label: "Rejected",
    className: "bg-destructive/10 text-destructive border-destructive/30",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}

interface PriorityBadgeProps {
  priority: TaskPriority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border",
        priority === TaskPriority.urgent
          ? "bg-accent/10 text-accent border-accent/30"
          : "bg-secondary text-secondary-foreground border-border",
        className,
      )}
    >
      {priority === TaskPriority.urgent ? "🔴 Urgent" : "Normal"}
    </span>
  );
}
