import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { UserRole__1 } from "@/types";
import type { VolunteerProfilePublic } from "@/types";
import type { Principal } from "@icp-sdk/core/principal";
import { MapPin, Star, UserX } from "lucide-react";
import { useState } from "react";

interface UserManagementTableProps {
  volunteers: VolunteerProfilePublic[];
  onDeactivate: (userId: Principal) => void;
  onAssignRole: (userId: Principal, role: UserRole__1) => void;
  isDeactivating: boolean;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function UserManagementTable({
  volunteers,
  onDeactivate,
  onAssignRole,
  isDeactivating,
}: UserManagementTableProps) {
  const [deactivateTarget, setDeactivateTarget] =
    useState<VolunteerProfilePublic | null>(null);

  if (!volunteers.length) {
    return (
      <div
        className="text-center py-12 text-muted-foreground text-sm"
        data-ocid="users_table.empty_state"
      >
        No volunteers found matching your criteria.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto" data-ocid="users_table.table">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {[
                "Volunteer",
                "Skills",
                "Location",
                "Joined",
                "Tasks",
                "Rating",
                "Status",
                "Role",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left text-muted-foreground font-medium text-xs uppercase tracking-wide pb-3 pr-4 last:pr-0"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {volunteers.map((v, i) => (
              <tr
                key={v.id.toString()}
                className="hover:bg-muted/20 transition-colors group"
                data-ocid={`users_table.item.${i + 1}`}
              >
                {/* Volunteer */}
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-semibold text-xs">
                      {v.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-foreground truncate max-w-[120px]">
                      {v.name}
                    </span>
                  </div>
                </td>

                {/* Skills */}
                <td className="py-3 pr-4">
                  <div className="flex flex-wrap gap-1 max-w-[160px]">
                    {v.skills.slice(0, 3).map((s) => (
                      <Badge
                        key={s}
                        variant="secondary"
                        className="text-xs px-1.5 py-0 h-5"
                      >
                        {s}
                      </Badge>
                    ))}
                    {v.skills.length > 3 && (
                      <Badge
                        variant="outline"
                        className="text-xs px-1.5 py-0 h-5 text-muted-foreground"
                      >
                        +{v.skills.length - 3}
                      </Badge>
                    )}
                    {v.skills.length === 0 && (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </div>
                </td>

                {/* Location */}
                <td className="py-3 pr-4">
                  {v.location ? (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate max-w-[100px]">
                        {v.location.displayName}
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-xs">—</span>
                  )}
                </td>

                {/* Joined */}
                <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap text-xs">
                  {formatDate(v.createdAt)}
                </td>

                {/* Tasks */}
                <td className="py-3 pr-4 text-right font-mono text-xs font-medium text-foreground">
                  {v.totalTasksCompleted.toString()}
                </td>

                {/* Rating */}
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-1 text-xs whitespace-nowrap">
                    <Star className="w-3 h-3 text-accent fill-accent" />
                    <span className="font-medium">{v.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">
                      ({v.ratingCount.toString()})
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="py-3 pr-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-md border ${
                      v.isActive
                        ? "bg-success/10 text-success border-success/30"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {v.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Role */}
                <td className="py-3 pr-4">
                  <Select
                    defaultValue={UserRole__1.volunteer}
                    onValueChange={(val) =>
                      onAssignRole(v.id, val as UserRole__1)
                    }
                  >
                    <SelectTrigger
                      className="h-7 text-xs w-28"
                      data-ocid={`users_table.select.${i + 1}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserRole__1.volunteer}>
                        Volunteer
                      </SelectItem>
                      <SelectItem value={UserRole__1.ngo}>NGO</SelectItem>
                      <SelectItem value={UserRole__1.superAdmin}>
                        Admin
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </td>

                {/* Actions */}
                <td className="py-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => setDeactivateTarget(v)}
                    disabled={!v.isActive}
                    title="Deactivate volunteer"
                    aria-label="Deactivate volunteer"
                    data-ocid={`users_table.delete_button.${i + 1}`}
                  >
                    <UserX className="w-3.5 h-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Deactivate confirmation dialog */}
      <Dialog
        open={!!deactivateTarget}
        onOpenChange={(open) => !open && setDeactivateTarget(null)}
      >
        <DialogContent data-ocid="user_deactivate.dialog">
          <DialogHeader>
            <DialogTitle>Deactivate Volunteer</DialogTitle>
            <DialogDescription>
              Are you sure you want to deactivate{" "}
              <strong>{deactivateTarget?.name}</strong>? They will lose access
              to the platform.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setDeactivateTarget(null)}
              data-ocid="user_deactivate.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isDeactivating}
              onClick={() => {
                if (deactivateTarget) {
                  onDeactivate(deactivateTarget.id);
                  setDeactivateTarget(null);
                }
              }}
              data-ocid="user_deactivate.confirm_button"
            >
              {isDeactivating ? "Deactivating..." : "Deactivate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
