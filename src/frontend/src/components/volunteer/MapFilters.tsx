import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Filter, X } from "lucide-react";
import { useState } from "react";

const ALL_SKILLS = [
  "Teaching",
  "Medical",
  "Construction",
  "IT Support",
  "Counseling",
  "Logistics",
  "Fundraising",
  "Community Outreach",
  "Driving",
  "Photography",
];

export interface MapFiltersState {
  maxDistance: number;
  skills: string[];
  urgentOnly: boolean;
}

interface MapFiltersProps {
  filters: MapFiltersState;
  onChange: (filters: MapFiltersState) => void;
  onClose?: () => void;
  className?: string;
}

export function MapFilters({
  filters,
  onChange,
  onClose,
  className,
}: MapFiltersProps) {
  const [localFilters, setLocalFilters] = useState<MapFiltersState>(filters);

  function toggleSkill(skill: string) {
    const next = localFilters.skills.includes(skill)
      ? localFilters.skills.filter((s) => s !== skill)
      : [...localFilters.skills, skill];
    const updated = { ...localFilters, skills: next };
    setLocalFilters(updated);
    onChange(updated);
  }

  function updateDistance(val: number[]) {
    const updated = { ...localFilters, maxDistance: val[0] };
    setLocalFilters(updated);
    onChange(updated);
  }

  function toggleUrgent() {
    const updated = { ...localFilters, urgentOnly: !localFilters.urgentOnly };
    setLocalFilters(updated);
    onChange(updated);
  }

  function resetFilters() {
    const reset: MapFiltersState = {
      maxDistance: 50,
      skills: [],
      urgentOnly: false,
    };
    setLocalFilters(reset);
    onChange(reset);
  }

  const activeCount =
    localFilters.skills.length +
    (localFilters.urgentOnly ? 1 : 0) +
    (localFilters.maxDistance < 50 ? 1 : 0);

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl shadow-elevated p-4 space-y-4",
        className,
      )}
      data-ocid="map.filters"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-primary" />
          <h3 className="font-display font-semibold text-sm text-foreground">
            Filters
          </h3>
          {activeCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full px-2 py-0.5">
              {activeCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {activeCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7 text-muted-foreground"
              onClick={resetFilters}
              data-ocid="map.filters.reset_button"
            >
              Reset
            </Button>
          )}
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-muted-foreground"
              onClick={onClose}
              aria-label="Close filters"
              data-ocid="map.filters.close_button"
            >
              <X size={14} />
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Distance */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Max Distance
          </p>
          <span className="text-xs font-bold text-primary">
            {localFilters.maxDistance} km
          </span>
        </div>
        <Slider
          min={5}
          max={50}
          step={5}
          value={[localFilters.maxDistance]}
          onValueChange={updateDistance}
          className="w-full"
          data-ocid="map.distance_slider"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>5 km</span>
          <span>50 km</span>
        </div>
      </div>

      <Separator />

      {/* Urgent toggle */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Urgent only</p>
          <p className="text-xs text-muted-foreground">Show urgent tasks</p>
        </div>
        <Switch
          checked={localFilters.urgentOnly}
          onCheckedChange={toggleUrgent}
          data-ocid="map.urgent_toggle"
        />
      </div>

      <Separator />

      {/* Skills */}
      <div className="space-y-2.5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Skills
        </p>
        <div className="flex flex-wrap gap-1.5">
          {ALL_SKILLS.map((skill) => {
            const active = localFilters.skills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={cn(
                  "text-xs px-2.5 py-1 rounded-lg border transition-smooth font-medium",
                  active
                    ? "bg-primary/15 text-primary border-primary/40"
                    : "bg-muted/50 text-muted-foreground border-transparent hover:border-border",
                )}
                data-ocid={`map.skill_filter.${skill.toLowerCase().replace(/\s+/g, "_")}`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
