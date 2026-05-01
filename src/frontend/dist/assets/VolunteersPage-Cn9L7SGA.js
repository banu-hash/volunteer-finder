import { i as useActor, a4 as useQuery, k as createActor, r as reactExports, T as TaskStatus, j as jsxRuntimeExports, K as Avatar, N as AvatarFallback, e as CircleCheck, M as MapPin, B as Button, h as ue, A as Card, D as CardContent, a as cn, I as Input, X, F as Label, J as Users } from "./index-D4bjddjr.js";
import { c as useVolunteers, d as useFilterVolunteersBySkills } from "./volunteers-DGSeelEA.js";
import { e as useMyNGOTasks, f as useAssignVolunteer } from "./tasks-7B4Gj8SA.js";
import { Z as Zap, M as MatchScoreBadge } from "./MatchScoreBadge-I1ajIjKO.js";
import { S as SkillTag } from "./SkillTag-CgRS11xk.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DqdYP-o_.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-NY3S6kgM.js";
import { S as Star } from "./star-Cm4lNMeQ.js";
import { C as Calendar } from "./calendar-CdS3BWq4.js";
import { B as Badge } from "./badge-BxCo0bvE.js";
import { S as Skeleton } from "./skeleton-BvS_Zcv3.js";
import { F as Funnel } from "./funnel-C4qFvEfW.js";
import { S as Search } from "./search-CyXTpNOG.js";
import "./trending-up-B8guMjXx.js";
import "./index-DSMb5Lro.js";
function useMatchScore(volunteerId, taskId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["matchScore", volunteerId == null ? void 0 : volunteerId.toString(), taskId == null ? void 0 : taskId.toString()],
    queryFn: async () => {
      if (!actor || !volunteerId || taskId === null) return 0;
      return actor.getMatchScore(volunteerId, taskId);
    },
    enabled: !!actor && !isFetching && !!volunteerId && taskId !== null
  });
}
function VolunteerProfileModal({ volunteer, open, onClose }) {
  const { data: tasks = [] } = useMyNGOTasks();
  const assignVolunteer = useAssignVolunteer();
  const [selectedTaskId, setSelectedTaskId] = reactExports.useState("");
  const assignableTaskId = selectedTaskId ? BigInt(selectedTaskId) : null;
  const { data: matchScore } = useMatchScore(
    (volunteer == null ? void 0 : volunteer.id) ?? null,
    assignableTaskId
  );
  async function handleAssign() {
    if (!volunteer || !selectedTaskId) return;
    try {
      await assignVolunteer.mutateAsync({
        taskId: BigInt(selectedTaskId),
        volunteerId: volunteer.id
      });
      ue.success(`${volunteer.name} assigned successfully!`);
      onClose();
    } catch {
      ue.error("Failed to assign volunteer.");
    }
  }
  if (!volunteer) return null;
  const initials = volunteer.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const pendingTasks = tasks.filter(
    (t) => t.status === TaskStatus.pending && !t.assignedVolunteer
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-lg max-h-[85vh] overflow-y-auto",
      "data-ocid": "volunteer-profile.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Volunteer Profile" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-16 w-16 flex-shrink-0", children: volunteer.profilePhoto ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: volunteer.profilePhoto.getDirectURL(),
                alt: volunteer.name,
                className: "h-full w-full object-cover rounded-full"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/10 text-primary font-bold text-xl", children: initials }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground truncate", children: volunteer.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 13, className: "text-accent fill-accent" }),
                  volunteer.rating.toFixed(1),
                  " (",
                  volunteer.ratingCount.toString(),
                  " reviews)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs font-medium px-2 py-0.5 rounded-full ${volunteer.isActive ? "bg-success/10 text-success border border-success/30" : "bg-muted text-muted-foreground border border-border"}`,
                    children: volunteer.isActive ? "Active" : "Inactive"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-muted/40 rounded-lg border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14, className: "text-success" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-lg", children: volunteer.totalTasksCompleted.toString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Completed" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-muted/40 rounded-lg border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14, className: "text-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-lg", children: volunteer.rating.toFixed(1) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Rating" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-muted/40 rounded-lg border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 14, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-lg", children: volunteer.skills.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Skills" })
            ] })
          ] }),
          volunteer.bio && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-1", children: "About" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: volunteer.bio })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            volunteer.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, className: "flex-shrink-0" }),
              volunteer.location.displayName
            ] }),
            volunteer.availability && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14, className: "flex-shrink-0" }),
              volunteer.availability
            ] })
          ] }),
          volunteer.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-2", children: "Skills" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: volunteer.skills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillTag, { skill: s }, s)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Quick Assign" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedTaskId, onValueChange: setSelectedTaskId, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "volunteer-profile.task_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a task to assign..." }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: pendingTasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__none", disabled: true, children: "No pending tasks available" }) : pendingTasks.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t.id.toString(), children: t.title }, t.id.toString())) })
            ] }),
            selectedTaskId && matchScore !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Match for selected task:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(MatchScoreBadge, { score: matchScore, size: "sm" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  className: "flex-1",
                  onClick: onClose,
                  "data-ocid": "volunteer-profile.close_button",
                  children: "Close"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "flex-1",
                  disabled: !selectedTaskId || assignVolunteer.isPending,
                  onClick: handleAssign,
                  "data-ocid": "volunteer-profile.assign_button",
                  children: assignVolunteer.isPending ? "Assigning..." : "Assign to Task"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  ) });
}
function VolunteerCard({
  volunteer,
  matchScore,
  onAssign,
  onViewProfile,
  className,
  index
}) {
  const initials = volunteer.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: cn("task-card", className),
      "data-ocid": index !== void 0 ? `volunteer.card.${index}` : "volunteer.card",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-10 w-10 flex-shrink-0", children: volunteer.profilePhoto ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: volunteer.profilePhoto.getDirectURL(),
              alt: volunteer.name,
              className: "h-full w-full object-cover rounded-full"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/10 text-primary font-semibold text-sm", children: initials }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm truncate", children: volunteer.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 10, className: "text-accent fill-accent" }),
              volunteer.rating.toFixed(1),
              " (",
              volunteer.ratingCount.toString(),
              " reviews)"
            ] }) })
          ] })
        ] }),
        volunteer.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 11 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: volunteer.location.displayName })
        ] }),
        volunteer.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: volunteer.bio }),
        volunteer.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
          volunteer.skills.slice(0, 4).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillTag, { skill: s }, s)),
          volunteer.skills.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "+",
            volunteer.skills.length - 4
          ] })
        ] }),
        matchScore !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(MatchScoreBadge, { score: matchScore, size: "sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: volunteer.totalTasksCompleted.toString() }),
            " ",
            "tasks"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "font-medium",
                volunteer.isActive ? "text-success" : "text-muted-foreground"
              ),
              children: volunteer.isActive ? "Active" : "Inactive"
            }
          )
        ] }),
        (onViewProfile || onAssign) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          onViewProfile && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "flex-1 text-xs h-8",
              onClick: () => onViewProfile(volunteer.id),
              "data-ocid": index !== void 0 ? `volunteer.view_button.${index}` : "volunteer.view_button",
              children: "View Profile"
            }
          ),
          onAssign && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "flex-1 text-xs h-8",
              onClick: () => onAssign(volunteer.id),
              "data-ocid": index !== void 0 ? `volunteer.assign_button.${index}` : "volunteer.assign_button",
              children: "Assign"
            }
          )
        ] })
      ] })
    }
  );
}
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
  "Childcare"
];
function VolunteersPage() {
  const { data: allVolunteers = [], isLoading } = useVolunteers();
  const [searchText, setSearchText] = reactExports.useState("");
  const [selectedSkills, setSelectedSkills] = reactExports.useState([]);
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const [profileVolunteer, setProfileVolunteer] = reactExports.useState(null);
  const { data: filteredBySkills = [] } = useFilterVolunteersBySkills(selectedSkills);
  const baseList = selectedSkills.length > 0 ? filteredBySkills : allVolunteers;
  const displayed = reactExports.useMemo(() => {
    if (!searchText) return baseList;
    const q = searchText.toLowerCase();
    return baseList.filter(
      (v) => {
        var _a;
        return v.name.toLowerCase().includes(q) || v.bio.toLowerCase().includes(q) || v.skills.some((s) => s.toLowerCase().includes(q)) || ((_a = v.location) == null ? void 0 : _a.displayName.toLowerCase().includes(q));
      }
    );
  }, [baseList, searchText]);
  function toggleSkill(skill) {
    setSelectedSkills(
      (prev) => prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  }
  function handleViewProfile(volunteerId) {
    const vol = allVolunteers.find(
      (v) => v.id.toString() === volunteerId.toString()
    );
    if (vol) setProfileVolunteer(vol);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-4 md:p-6", "data-ocid": "ngo-volunteers.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Volunteer Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
          allVolunteers.length,
          " volunteer",
          allVolunteers.length !== 1 ? "s" : "",
          " on the platform"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "gap-2 self-start",
          onClick: () => setShowFilters((p) => !p),
          "data-ocid": "ngo-volunteers.filter_toggle",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { size: 14 }),
            "Filters",
            selectedSkills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground rounded-full", children: selectedSkills.length })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Search,
        {
          size: 14,
          className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: searchText,
          onChange: (e) => setSearchText(e.target.value),
          placeholder: "Search by name, skill, or location...",
          className: "pl-9",
          "data-ocid": "ngo-volunteers.search_input"
        }
      ),
      searchText && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
          onClick: () => setSearchText(""),
          "aria-label": "Clear search",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
        }
      )
    ] }),
    showFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-4 space-y-3",
        "data-ocid": "ngo-volunteers.filters_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold", children: "Filter by Skills" }),
            selectedSkills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "text-xs text-muted-foreground hover:text-foreground",
                onClick: () => setSelectedSkills([]),
                "data-ocid": "ngo-volunteers.clear_filters_button",
                children: "Clear all"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: SKILL_POOL.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => toggleSkill(skill),
              className: `px-2.5 py-1 text-xs rounded-full border transition-smooth ${selectedSkills.includes(skill) ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border hover:border-primary/50"}`,
              "data-ocid": `ngo-volunteers.skill_filter.${skill.toLowerCase()}`,
              children: skill
            },
            skill
          )) }),
          selectedSkills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 pt-1", children: selectedSkills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "flex items-center gap-1 px-2 py-0.5 text-xs bg-primary/10 text-primary border border-primary/30 rounded-full",
              children: [
                skill,
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => toggleSkill(skill),
                    className: "hover:text-destructive",
                    "aria-label": `Remove ${skill} filter`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 10 })
                  }
                )
              ]
            },
            skill
          )) })
        ]
      }
    ),
    (searchText || selectedSkills.length > 0) && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
      "Showing",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: displayed.length }),
      " ",
      "result",
      displayed.length !== 1 ? "s" : ""
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: ["v1", "v2", "v3", "v4", "v5", "v6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56 rounded-xl" }, k)) }) : displayed.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-14 border border-dashed border-border rounded-xl text-muted-foreground",
        "data-ocid": "ngo-volunteers.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 32, className: "mx-auto mb-2 opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No volunteers found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: searchText || selectedSkills.length > 0 ? "Try adjusting your search or filters" : "Volunteers will appear here once they register" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        "data-ocid": "ngo-volunteers.list",
        children: displayed.map((volunteer, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          VolunteerCard,
          {
            volunteer,
            index: i + 1,
            onViewProfile: handleViewProfile
          },
          volunteer.id.toString()
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      VolunteerProfileModal,
      {
        volunteer: profileVolunteer,
        open: !!profileVolunteer,
        onClose: () => setProfileVolunteer(null)
      }
    )
  ] });
}
export {
  VolunteersPage as default
};
