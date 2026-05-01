import { useMatchScore } from "@/api/matching";
import { useAssignVolunteer } from "@/api/tasks";
import { useMyNGOTasks } from "@/api/tasks";
import { MatchScoreBadge } from "@/components/shared/MatchScoreBadge";
import { SkillTag } from "@/components/shared/SkillTag";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { TaskStatus } from "@/types";
import type { VolunteerProfilePublic } from "@/types";
import { Calendar, CheckCircle2, MapPin, Star, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  volunteer: VolunteerProfilePublic | null;
  open: boolean;
  onClose: () => void;
}

export function VolunteerProfileModal({ volunteer, open, onClose }: Props) {
  const { data: tasks = [] } = useMyNGOTasks();
  const assignVolunteer = useAssignVolunteer();
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");

  const assignableTaskId = selectedTaskId ? BigInt(selectedTaskId) : null;
  const { data: matchScore } = useMatchScore(
    volunteer?.id ?? null,
    assignableTaskId,
  );

  async function handleAssign() {
    if (!volunteer || !selectedTaskId) return;
    try {
      await assignVolunteer.mutateAsync({
        taskId: BigInt(selectedTaskId),
        volunteerId: volunteer.id,
      });
      toast.success(`${volunteer.name} assigned successfully!`);
      onClose();
    } catch {
      toast.error("Failed to assign volunteer.");
    }
  }

  if (!volunteer) return null;

  const initials = volunteer.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const pendingTasks = tasks.filter(
    (t) => t.status === TaskStatus.pending && !t.assignedVolunteer,
  );

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-lg max-h-[85vh] overflow-y-auto"
        data-ocid="volunteer-profile.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">Volunteer Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 flex-shrink-0">
              {volunteer.profilePhoto ? (
                <img
                  src={volunteer.profilePhoto.getDirectURL()}
                  alt={volunteer.name}
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="min-w-0">
              <h2 className="font-display font-bold text-lg text-foreground truncate">
                {volunteer.name}
              </h2>
              <div className="flex items-center gap-3 flex-wrap mt-1">
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star size={13} className="text-accent fill-accent" />
                  {volunteer.rating.toFixed(1)} (
                  {volunteer.ratingCount.toString()} reviews)
                </span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    volunteer.isActive
                      ? "bg-success/10 text-success border border-success/30"
                      : "bg-muted text-muted-foreground border border-border"
                  }`}
                >
                  {volunteer.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-muted/40 rounded-lg border border-border">
              <div className="flex items-center justify-center gap-1 mb-1">
                <CheckCircle2 size={14} className="text-success" />
              </div>
              <p className="font-display font-bold text-foreground text-lg">
                {volunteer.totalTasksCompleted.toString()}
              </p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div className="text-center p-3 bg-muted/40 rounded-lg border border-border">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star size={14} className="text-accent" />
              </div>
              <p className="font-display font-bold text-foreground text-lg">
                {volunteer.rating.toFixed(1)}
              </p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="text-center p-3 bg-muted/40 rounded-lg border border-border">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Zap size={14} className="text-primary" />
              </div>
              <p className="font-display font-bold text-foreground text-lg">
                {volunteer.skills.length}
              </p>
              <p className="text-xs text-muted-foreground">Skills</p>
            </div>
          </div>

          {/* Bio */}
          {volunteer.bio && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">
                About
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {volunteer.bio}
              </p>
            </div>
          )}

          {/* Details */}
          <div className="space-y-2">
            {volunteer.location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="flex-shrink-0" />
                {volunteer.location.displayName}
              </div>
            )}
            {volunteer.availability && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar size={14} className="flex-shrink-0" />
                {volunteer.availability}
              </div>
            )}
          </div>

          {/* Skills */}
          {volunteer.skills.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {volunteer.skills.map((s) => (
                  <SkillTag key={s} skill={s} />
                ))}
              </div>
            </div>
          )}

          {/* Quick Assign */}
          <div className="border-t border-border pt-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              Quick Assign
            </h3>
            <Select value={selectedTaskId} onValueChange={setSelectedTaskId}>
              <SelectTrigger data-ocid="volunteer-profile.task_select">
                <SelectValue placeholder="Select a task to assign..." />
              </SelectTrigger>
              <SelectContent>
                {pendingTasks.length === 0 ? (
                  <SelectItem value="__none" disabled>
                    No pending tasks available
                  </SelectItem>
                ) : (
                  pendingTasks.map((t) => (
                    <SelectItem key={t.id.toString()} value={t.id.toString()}>
                      {t.title}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>

            {selectedTaskId && matchScore !== undefined && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  Match for selected task:
                </span>
                <MatchScoreBadge score={matchScore} size="sm" />
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={onClose}
                data-ocid="volunteer-profile.close_button"
              >
                Close
              </Button>
              <Button
                className="flex-1"
                disabled={!selectedTaskId || assignVolunteer.isPending}
                onClick={handleAssign}
                data-ocid="volunteer-profile.assign_button"
              >
                {assignVolunteer.isPending ? "Assigning..." : "Assign to Task"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
