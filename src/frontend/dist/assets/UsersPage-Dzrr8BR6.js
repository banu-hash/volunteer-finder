import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, M as MapPin, ah as UserRole__1, B as Button, J as Users, I as Input, d as LoadingSpinner, h as ue } from "./index-D4bjddjr.js";
import { d as useAssignUserRole } from "./admin-BzL0N7YX.js";
import { c as useVolunteers, e as useDeactivateVolunteer } from "./volunteers-DGSeelEA.js";
import { B as Badge } from "./badge-BxCo0bvE.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, h as DialogDescription, i as DialogFooter } from "./dialog-DqdYP-o_.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-NY3S6kgM.js";
import { S as Star } from "./star-Cm4lNMeQ.js";
import { S as Search } from "./search-CyXTpNOG.js";
import { F as Funnel } from "./funnel-C4qFvEfW.js";
import { C as ChevronRight } from "./chevron-right-BLww6Yyb.js";
import "./index-DSMb5Lro.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function UserManagementTable({
  volunteers,
  onDeactivate,
  onAssignRole,
  isDeactivating
}) {
  const [deactivateTarget, setDeactivateTarget] = reactExports.useState(null);
  if (!volunteers.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center py-12 text-muted-foreground text-sm",
        "data-ocid": "users_table.empty_state",
        children: "No volunteers found matching your criteria."
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", "data-ocid": "users_table.table", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: [
        "Volunteer",
        "Skills",
        "Location",
        "Joined",
        "Tasks",
        "Rating",
        "Status",
        "Role",
        "Actions"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "text-left text-muted-foreground font-medium text-xs uppercase tracking-wide pb-3 pr-4 last:pr-0",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: volunteers.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "hover:bg-muted/20 transition-colors group",
          "data-ocid": `users_table.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-semibold text-xs", children: v.name.charAt(0).toUpperCase() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate max-w-[120px]", children: v.name })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1 max-w-[160px]", children: [
              v.skills.slice(0, 3).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "text-xs px-1.5 py-0 h-5",
                  children: s
                },
                s
              )),
              v.skills.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs px-1.5 py-0 h-5 text-muted-foreground",
                  children: [
                    "+",
                    v.skills.length - 3
                  ]
                }
              ),
              v.skills.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "—" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4", children: v.location ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[100px]", children: v.location.displayName })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4 text-muted-foreground whitespace-nowrap text-xs", children: formatDate(v.createdAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4 text-right font-mono text-xs font-medium text-foreground", children: v.totalTasksCompleted.toString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs whitespace-nowrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 text-accent fill-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: v.rating.toFixed(1) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "(",
                v.ratingCount.toString(),
                ")"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-md border ${v.isActive ? "bg-success/10 text-success border-success/30" : "bg-muted text-muted-foreground border-border"}`,
                children: v.isActive ? "Active" : "Inactive"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                defaultValue: UserRole__1.volunteer,
                onValueChange: (val) => onAssignRole(v.id, val),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "h-7 text-xs w-28",
                      "data-ocid": `users_table.select.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: UserRole__1.volunteer, children: "Volunteer" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: UserRole__1.ngo, children: "NGO" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: UserRole__1.superAdmin, children: "Admin" })
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-7 w-7 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive",
                onClick: () => setDeactivateTarget(v),
                disabled: !v.isActive,
                title: "Deactivate volunteer",
                "aria-label": "Deactivate volunteer",
                "data-ocid": `users_table.delete_button.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-3.5 h-3.5" })
              }
            ) })
          ]
        },
        v.id.toString()
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!deactivateTarget,
        onOpenChange: (open) => !open && setDeactivateTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "user_deactivate.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Deactivate Volunteer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
              "Are you sure you want to deactivate",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deactivateTarget == null ? void 0 : deactivateTarget.name }),
              "? They will lose access to the platform."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                onClick: () => setDeactivateTarget(null),
                "data-ocid": "user_deactivate.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "destructive",
                disabled: isDeactivating,
                onClick: () => {
                  if (deactivateTarget) {
                    onDeactivate(deactivateTarget.id);
                    setDeactivateTarget(null);
                  }
                },
                "data-ocid": "user_deactivate.confirm_button",
                children: isDeactivating ? "Deactivating..." : "Deactivate"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const PAGE_SIZE = 25;
function AdminUsersPage() {
  const { data: volunteers = [], isLoading } = useVolunteers();
  const deactivate = useDeactivateVolunteer();
  const assignRole = useAssignUserRole();
  const [search, setSearch] = reactExports.useState("");
  const [skillFilter, setSkillFilter] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [page, setPage] = reactExports.useState(0);
  const allSkills = reactExports.useMemo(() => {
    const skillSet = /* @__PURE__ */ new Set();
    for (const v of volunteers) {
      for (const s of v.skills) skillSet.add(s);
    }
    return Array.from(skillSet).slice(0, 12);
  }, [volunteers]);
  const filtered = reactExports.useMemo(() => {
    const q = search.trim().toLowerCase();
    const skillQ = skillFilter.trim().toLowerCase();
    return volunteers.filter((v) => {
      var _a;
      const matchesSearch = !q || v.name.toLowerCase().includes(q) || (((_a = v.location) == null ? void 0 : _a.displayName) ?? "").toLowerCase().includes(q);
      const matchesSkill = !skillQ || v.skills.some((s) => s.toLowerCase().includes(skillQ));
      const matchesStatus = statusFilter === "all" || statusFilter === "active" && v.isActive || statusFilter === "inactive" && !v.isActive;
      return matchesSearch && matchesSkill && matchesStatus;
    });
  }, [volunteers, search, skillFilter, statusFilter]);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  function handleDeactivate(userId) {
    deactivate.mutate(userId, {
      onSuccess: () => ue.success("Volunteer deactivated"),
      onError: () => ue.error("Failed to deactivate volunteer")
    });
  }
  function handleAssignRole(userId, role) {
    assignRole.mutate(
      { userId, role },
      {
        onSuccess: () => ue.success("Role updated successfully"),
        onError: () => ue.error("Failed to update role")
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-6 max-w-7xl mx-auto space-y-6",
      "data-ocid": "admin_users.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "User Management" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Manage volunteers, assign roles, and control access" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-muted rounded-lg px-3 py-1.5 text-sm shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: volunteers.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "total" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search by name or location...",
                value: search,
                onChange: (e) => {
                  setSearch(e.target.value);
                  setPage(0);
                },
                className: "pl-9",
                "data-ocid": "admin_users.search_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Filter by skill...",
                value: skillFilter,
                onChange: (e) => {
                  setSkillFilter(e.target.value);
                  setPage(0);
                },
                className: "pl-9 w-44",
                "data-ocid": "admin_users.skill_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: ["all", "active", "inactive"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: statusFilter === s ? "default" : "ghost",
              className: "capitalize",
              onClick: () => {
                setStatusFilter(s);
                setPage(0);
              },
              "data-ocid": `admin_users.status_filter.${s}`,
              children: s
            },
            s
          )) })
        ] }),
        allSkills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: allSkills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: skillFilter === skill ? "default" : "secondary",
            className: "cursor-pointer hover:bg-primary/20 transition-colors text-xs",
            onClick: () => {
              setSkillFilter(skillFilter === skill ? "" : skill);
              setPage(0);
            },
            "data-ocid": `admin_users.skill_tag.${skill}`,
            children: skill
          },
          skill
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex justify-center py-20",
            "data-ocid": "users_table.loading_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md", label: "Loading volunteers..." })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          UserManagementTable,
          {
            volunteers: paginated,
            onDeactivate: handleDeactivate,
            onAssignRole: handleAssignRole,
            isDeactivating: deactivate.isPending
          }
        ) }) }),
        totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Showing ",
            page * PAGE_SIZE + 1,
            "–",
            Math.min((page + 1) * PAGE_SIZE, filtered.length),
            " of",
            " ",
            filtered.length,
            " volunteers"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "ghost",
                onClick: () => setPage((p) => Math.max(0, p - 1)),
                disabled: page === 0,
                "data-ocid": "admin_users.pagination_prev",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                  "Prev"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground px-2", children: [
              page + 1,
              " / ",
              totalPages
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "ghost",
                onClick: () => setPage((p) => Math.min(totalPages - 1, p + 1)),
                disabled: page >= totalPages - 1,
                "data-ocid": "admin_users.pagination_next",
                children: [
                  "Next",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  AdminUsersPage as default
};
