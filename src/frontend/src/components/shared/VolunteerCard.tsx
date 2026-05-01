import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { VolunteerProfilePublic } from "@/types";
import { MapPin, Star } from "lucide-react";
import { MatchScoreBadge } from "./MatchScoreBadge";
import { SkillTag } from "./SkillTag";

interface VolunteerCardProps {
  volunteer: VolunteerProfilePublic;
  matchScore?: number;
  onAssign?: (volunteerId: import("@icp-sdk/core/principal").Principal) => void;
  onViewProfile?: (
    volunteerId: import("@icp-sdk/core/principal").Principal,
  ) => void;
  className?: string;
  index?: number;
}

export function VolunteerCard({
  volunteer,
  matchScore,
  onAssign,
  onViewProfile,
  className,
  index,
}: VolunteerCardProps) {
  const initials =
    volunteer.name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "?";

  return (
    <Card
      className={cn("task-card", className)}
      data-ocid={
        index !== undefined ? `volunteer.card.${index}` : "volunteer.card"
      }
    >
      <CardContent className="p-4 space-y-3">
        {/* Avatar + Name */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            {volunteer.profilePhoto ? (
              <img
                src={volunteer.profilePhoto.getDirectURL()}
                alt={volunteer.name}
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                {initials}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-foreground text-sm truncate">
              {volunteer.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-0.5">
                <Star size={10} className="text-accent fill-accent" />
                {volunteer.rating.toFixed(1)} (
                {volunteer.ratingCount.toString()} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Location */}
        {volunteer.location && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin size={11} />
            <span className="truncate">{volunteer.location.displayName}</span>
          </div>
        )}

        {/* Bio */}
        {volunteer.bio && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {volunteer.bio}
          </p>
        )}

        {/* Skills */}
        {volunteer.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {volunteer.skills.slice(0, 4).map((s) => (
              <SkillTag key={s} skill={s} />
            ))}
            {volunteer.skills.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{volunteer.skills.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Match Score */}
        {matchScore !== undefined && (
          <MatchScoreBadge score={matchScore} size="sm" />
        )}

        {/* Stats */}
        <div className="flex gap-3 text-xs">
          <span className="text-muted-foreground">
            <span className="font-semibold text-foreground">
              {volunteer.totalTasksCompleted.toString()}
            </span>{" "}
            tasks
          </span>
          <span
            className={cn(
              "font-medium",
              volunteer.isActive ? "text-success" : "text-muted-foreground",
            )}
          >
            {volunteer.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Actions */}
        {(onViewProfile || onAssign) && (
          <div className="flex gap-2 pt-1">
            {onViewProfile && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs h-8"
                onClick={() => onViewProfile(volunteer.id)}
                data-ocid={
                  index !== undefined
                    ? `volunteer.view_button.${index}`
                    : "volunteer.view_button"
                }
              >
                View Profile
              </Button>
            )}
            {onAssign && (
              <Button
                size="sm"
                className="flex-1 text-xs h-8"
                onClick={() => onAssign(volunteer.id)}
                data-ocid={
                  index !== undefined
                    ? `volunteer.assign_button.${index}`
                    : "volunteer.assign_button"
                }
              >
                Assign
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
