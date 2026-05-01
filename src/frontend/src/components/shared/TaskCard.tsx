import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TaskPriority, TaskStatus } from "@/types";
import type { TaskPublic } from "@/types";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { Calendar, ChevronRight, MapPin } from "lucide-react";
import { MatchScoreBadge } from "./MatchScoreBadge";
import { SkillTag } from "./SkillTag";
import { PriorityBadge, StatusBadge } from "./StatusBadge";

interface TaskCardProps {
  task: TaskPublic;
  matchScore?: number;
  showActions?: boolean;
  onAccept?: (taskId: bigint) => void;
  onReject?: (taskId: bigint) => void;
  onViewDetails?: (taskId: bigint) => void;
  className?: string;
  index?: number;
}

export function TaskCard({
  task,
  matchScore,
  showActions,
  onAccept,
  onReject,
  onViewDetails,
  className,
  index,
}: TaskCardProps) {
  const deadline = new Date(Number(task.deadline / 1_000_000n));
  const isUrgent = task.priority === TaskPriority.urgent;
  const isExpired = deadline < new Date();

  return (
    <Card
      className={cn(
        "task-card overflow-hidden",
        isUrgent && "border-accent/40",
        className,
      )}
      data-ocid={index !== undefined ? `task.card.${index}` : "task.card"}
    >
      <CardContent className="p-0">
        {/* Priority strip */}
        {isUrgent && <div className="h-1 bg-accent w-full" />}
        <div className="p-4 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-semibold text-foreground text-sm leading-tight truncate">
                {task.title}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <PriorityBadge priority={task.priority} />
              <StatusBadge status={task.status} />
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {task.location && (
              <span className="flex items-center gap-1">
                <MapPin size={11} />
                {task.location.displayName}
              </span>
            )}
            <span
              className={cn(
                "flex items-center gap-1",
                isExpired && "text-destructive",
              )}
            >
              <Calendar size={11} />
              {format(deadline, "MMM d, yyyy")}
            </span>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}

          {/* Skills */}
          {task.requiredSkills.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.requiredSkills.slice(0, 4).map((s) => (
                <SkillTag key={s} skill={s} />
              ))}
              {task.requiredSkills.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{task.requiredSkills.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Match Score */}
          {matchScore !== undefined && (
            <MatchScoreBadge score={matchScore} size="sm" />
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs h-8"
              onClick={() => onViewDetails?.(task.id)}
              asChild={!onViewDetails}
              data-ocid={
                index !== undefined
                  ? `task.view_button.${index}`
                  : "task.view_button"
              }
            >
              {onViewDetails ? (
                <span>View Details</span>
              ) : (
                <Link to="/volunteer/tasks">
                  View Details <ChevronRight size={12} />
                </Link>
              )}
            </Button>
            {showActions && task.status === TaskStatus.pending && (
              <>
                <Button
                  size="sm"
                  className="flex-1 text-xs h-8"
                  onClick={() => onAccept?.(task.id)}
                  data-ocid={
                    index !== undefined
                      ? `task.accept_button.${index}`
                      : "task.accept_button"
                  }
                >
                  Accept
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8 text-muted-foreground"
                  onClick={() => onReject?.(task.id)}
                  data-ocid={
                    index !== undefined
                      ? `task.reject_button.${index}`
                      : "task.reject_button"
                  }
                >
                  Reject
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
