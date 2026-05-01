import { useAssignVolunteer } from "@/api/tasks";
import { useTopVolunteers } from "@/api/volunteers";
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
import { Skeleton } from "@/components/ui/skeleton";
import type { TaskPublic } from "@/types";
import type { Principal } from "@icp-sdk/core/principal";
import { Bot, MapPin, Star } from "lucide-react";
import { toast } from "sonner";

interface Props {
  task: TaskPublic | null;
  open: boolean;
  onClose: () => void;
}

export function AISuggestionModal({ task, open, onClose }: Props) {
  const { data: topVolunteers = [], isLoading } = useTopVolunteers(
    open && task ? task.id : null,
    5n,
  );
  const assignVolunteer = useAssignVolunteer();

  async function handleAssign(volunteerId: Principal) {
    if (!task) return;
    try {
      await assignVolunteer.mutateAsync({ taskId: task.id, volunteerId });
      toast.success("Volunteer assigned successfully!");
      onClose();
    } catch {
      toast.error("Failed to assign volunteer. Please try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-lg max-h-[80vh] overflow-y-auto"
        data-ocid="ai-suggestion.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Bot size={18} className="text-primary" />
            AI Volunteer Suggestions
          </DialogTitle>
          {task && (
            <p className="text-sm text-muted-foreground">
              Top matches for:{" "}
              <span className="text-foreground font-medium">{task.title}</span>
            </p>
          )}
        </DialogHeader>

        <div className="space-y-3 mt-2" data-ocid="ai-suggestion.list">
          {isLoading ? (
            ["s1", "s2", "s3"].map((k) => (
              <Skeleton key={k} className="h-24 w-full rounded-lg" />
            ))
          ) : topVolunteers.length === 0 ? (
            <div
              className="text-center py-8 text-muted-foreground text-sm"
              data-ocid="ai-suggestion.empty_state"
            >
              No matching volunteers found for this task.
            </div>
          ) : (
            topVolunteers.map(({ profile, matchScore }, i) => {
              const initials = profile.name
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("")
                .toUpperCase();

              return (
                <div
                  key={profile.id.toString()}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border hover:border-primary/30 transition-smooth"
                  data-ocid={`ai-suggestion.item.${i + 1}`}
                >
                  {/* Rank */}
                  <span className="text-xs font-bold text-muted-foreground w-4 flex-shrink-0">
                    #{i + 1}
                  </span>

                  {/* Avatar */}
                  <Avatar className="h-9 w-9 flex-shrink-0">
                    {profile.profilePhoto ? (
                      <img
                        src={profile.profilePhoto.getDirectURL()}
                        alt={profile.name}
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {initials}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">
                      {profile.name}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap mt-0.5">
                      <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                        <Star size={10} className="text-accent fill-accent" />
                        {profile.rating.toFixed(1)}
                      </span>
                      {profile.location && (
                        <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                          <MapPin size={10} />
                          {profile.location.displayName}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.skills.slice(0, 3).map((s) => (
                        <SkillTag key={s} skill={s} />
                      ))}
                    </div>
                  </div>

                  {/* Score + Assign */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <MatchScoreBadge score={matchScore} size="sm" />
                    <Button
                      size="sm"
                      className="h-7 text-xs px-3"
                      onClick={() => handleAssign(profile.id)}
                      disabled={assignVolunteer.isPending}
                      data-ocid={`ai-suggestion.assign_button.${i + 1}`}
                    >
                      Assign
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex justify-end pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="ai-suggestion.close_button"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
