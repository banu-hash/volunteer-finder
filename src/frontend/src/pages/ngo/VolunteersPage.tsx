import { useFilterVolunteersBySkills, useVolunteers } from "@/api/volunteers";
import { VolunteerProfileModal } from "@/components/ngo/VolunteerProfileModal";
import { VolunteerCard } from "@/components/shared/VolunteerCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import type { VolunteerProfilePublic } from "@/types";
import type { Principal } from "@icp-sdk/core/principal";
import { Filter, Search, Users, X } from "lucide-react";
import { useMemo, useState } from "react";

const SKILL_POOL = [
  "Teaching",
  "Coding",
  "Design",
  "Medical",
  "Construction",
  "Cooking",
  "Driving",
  "Language",
  "Legal",
  "Counseling",
  "Photography",
  "Marketing",
  "Fundraising",
  "Childcare",
];

export default function VolunteersPage() {
  const { data: allVolunteers = [], isLoading } = useVolunteers();
  const [searchText, setSearchText] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [profileVolunteer, setProfileVolunteer] =
    useState<VolunteerProfilePublic | null>(null);

  const { data: filteredBySkills = [] } =
    useFilterVolunteersBySkills(selectedSkills);

  const baseList = selectedSkills.length > 0 ? filteredBySkills : allVolunteers;

  const displayed = useMemo(() => {
    if (!searchText) return baseList;
    const q = searchText.toLowerCase();
    return baseList.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.bio.toLowerCase().includes(q) ||
        v.skills.some((s) => s.toLowerCase().includes(q)) ||
        v.location?.displayName.toLowerCase().includes(q),
    );
  }, [baseList, searchText]);

  function toggleSkill(skill: string) {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  }

  function handleViewProfile(volunteerId: Principal) {
    const vol = allVolunteers.find(
      (v) => v.id.toString() === volunteerId.toString(),
    );
    if (vol) setProfileVolunteer(vol);
  }

  return (
    <div className="space-y-6 p-4 md:p-6" data-ocid="ngo-volunteers.page">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Volunteer Management
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {allVolunteers.length} volunteer
            {allVolunteers.length !== 1 ? "s" : ""} on the platform
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2 self-start"
          onClick={() => setShowFilters((p) => !p)}
          data-ocid="ngo-volunteers.filter_toggle"
        >
          <Filter size={14} />
          Filters
          {selectedSkills.length > 0 && (
            <Badge className="ml-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground rounded-full">
              {selectedSkills.length}
            </Badge>
          )}
        </Button>
      </div>

      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by name, skill, or location..."
          className="pl-9"
          data-ocid="ngo-volunteers.search_input"
        />
        {searchText && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setSearchText("")}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {showFilters && (
        <div
          className="bg-card border border-border rounded-xl p-4 space-y-3"
          data-ocid="ngo-volunteers.filters_panel"
        >
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold">Filter by Skills</Label>
            {selectedSkills.length > 0 && (
              <button
                type="button"
                className="text-xs text-muted-foreground hover:text-foreground"
                onClick={() => setSelectedSkills([])}
                data-ocid="ngo-volunteers.clear_filters_button"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SKILL_POOL.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`px-2.5 py-1 text-xs rounded-full border transition-smooth ${
                  selectedSkills.includes(skill)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-border hover:border-primary/50"
                }`}
                data-ocid={`ngo-volunteers.skill_filter.${skill.toLowerCase()}`}
              >
                {skill}
              </button>
            ))}
          </div>
          {selectedSkills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1 px-2 py-0.5 text-xs bg-primary/10 text-primary border border-primary/30 rounded-full"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className="hover:text-destructive"
                    aria-label={`Remove ${skill} filter`}
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {(searchText || selectedSkills.length > 0) && !isLoading && (
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {displayed.length}
          </span>{" "}
          result
          {displayed.length !== 1 ? "s" : ""}
        </p>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["v1", "v2", "v3", "v4", "v5", "v6"].map((k) => (
            <Skeleton key={k} className="h-56 rounded-xl" />
          ))}
        </div>
      ) : displayed.length === 0 ? (
        <div
          className="text-center py-14 border border-dashed border-border rounded-xl text-muted-foreground"
          data-ocid="ngo-volunteers.empty_state"
        >
          <Users size={32} className="mx-auto mb-2 opacity-40" />
          <p className="font-medium">No volunteers found</p>
          <p className="text-sm mt-1">
            {searchText || selectedSkills.length > 0
              ? "Try adjusting your search or filters"
              : "Volunteers will appear here once they register"}
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="ngo-volunteers.list"
        >
          {displayed.map((volunteer, i) => (
            <VolunteerCard
              key={volunteer.id.toString()}
              volunteer={volunteer}
              index={i + 1}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>
      )}

      <VolunteerProfileModal
        volunteer={profileVolunteer}
        open={!!profileVolunteer}
        onClose={() => setProfileVolunteer(null)}
      />
    </div>
  );
}
