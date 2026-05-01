import { useAssignUserRole } from "@/api/admin";
import { useDeactivateVolunteer, useVolunteers } from "@/api/volunteers";
import { UserManagementTable } from "@/components/admin/UserManagementTable";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UserRole__1 } from "@/types";
import type { Principal } from "@icp-sdk/core/principal";
import { ChevronLeft, ChevronRight, Filter, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const PAGE_SIZE = 25;

export default function AdminUsersPage() {
  const { data: volunteers = [], isLoading } = useVolunteers();
  const deactivate = useDeactivateVolunteer();
  const assignRole = useAssignUserRole();

  const [search, setSearch] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [page, setPage] = useState(0);

  const allSkills = useMemo(() => {
    const skillSet = new Set<string>();
    for (const v of volunteers) {
      for (const s of v.skills) skillSet.add(s);
    }
    return Array.from(skillSet).slice(0, 12);
  }, [volunteers]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const skillQ = skillFilter.trim().toLowerCase();
    return volunteers.filter((v) => {
      const matchesSearch =
        !q ||
        v.name.toLowerCase().includes(q) ||
        (v.location?.displayName ?? "").toLowerCase().includes(q);
      const matchesSkill =
        !skillQ || v.skills.some((s) => s.toLowerCase().includes(skillQ));
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && v.isActive) ||
        (statusFilter === "inactive" && !v.isActive);
      return matchesSearch && matchesSkill && matchesStatus;
    });
  }, [volunteers, search, skillFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function handleDeactivate(userId: Principal) {
    deactivate.mutate(userId, {
      onSuccess: () => toast.success("Volunteer deactivated"),
      onError: () => toast.error("Failed to deactivate volunteer"),
    });
  }

  function handleAssignRole(userId: Principal, role: UserRole__1) {
    assignRole.mutate(
      { userId, role },
      {
        onSuccess: () => toast.success("Role updated successfully"),
        onError: () => toast.error("Failed to update role"),
      },
    );
  }

  return (
    <div
      className="p-6 max-w-7xl mx-auto space-y-6"
      data-ocid="admin_users.page"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            User Management
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage volunteers, assign roles, and control access
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-muted rounded-lg px-3 py-1.5 text-sm shrink-0">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-foreground">
            {volunteers.length}
          </span>
          <span className="text-muted-foreground text-xs">total</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="pl-9"
            data-ocid="admin_users.search_input"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Filter by skill..."
            value={skillFilter}
            onChange={(e) => {
              setSkillFilter(e.target.value);
              setPage(0);
            }}
            className="pl-9 w-44"
            data-ocid="admin_users.skill_input"
          />
        </div>
        <div className="flex gap-1.5">
          {(["all", "active", "inactive"] as const).map((s) => (
            <Button
              key={s}
              size="sm"
              variant={statusFilter === s ? "default" : "ghost"}
              className="capitalize"
              onClick={() => {
                setStatusFilter(s);
                setPage(0);
              }}
              data-ocid={`admin_users.status_filter.${s}`}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Skill quick-filters */}
      {allSkills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {allSkills.map((skill) => (
            <Badge
              key={skill}
              variant={skillFilter === skill ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary/20 transition-colors text-xs"
              onClick={() => {
                setSkillFilter(skillFilter === skill ? "" : skill);
                setPage(0);
              }}
              data-ocid={`admin_users.skill_tag.${skill}`}
            >
              {skill}
            </Badge>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {isLoading ? (
          <div
            className="flex justify-center py-20"
            data-ocid="users_table.loading_state"
          >
            <LoadingSpinner size="md" label="Loading volunteers..." />
          </div>
        ) : (
          <div className="p-5">
            <UserManagementTable
              volunteers={paginated}
              onDeactivate={handleDeactivate}
              onAssignRole={handleAssignRole}
              isDeactivating={deactivate.isPending}
            />
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            Showing {page * PAGE_SIZE + 1}–
            {Math.min((page + 1) * PAGE_SIZE, filtered.length)} of{" "}
            {filtered.length} volunteers
          </p>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              data-ocid="admin_users.pagination_prev"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </Button>
            <span className="text-xs text-muted-foreground px-2">
              {page + 1} / {totalPages}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              data-ocid="admin_users.pagination_next"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
