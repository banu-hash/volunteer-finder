import { l as TaskPriority, j as jsxRuntimeExports, A as Card, D as CardContent, M as MapPin, a as cn, B as Button, H as Link, T as TaskStatus } from "./index-D4bjddjr.js";
import { M as MatchScoreBadge } from "./MatchScoreBadge-I1ajIjKO.js";
import { S as SkillTag } from "./SkillTag-CgRS11xk.js";
import { P as PriorityBadge, S as StatusBadge } from "./StatusBadge-DX9GDhWP.js";
import { C as Calendar } from "./calendar-CdS3BWq4.js";
import { f as format } from "./format-d5MMsb9-.js";
import { C as ChevronRight } from "./chevron-right-BLww6Yyb.js";
function TaskCard({
  task,
  matchScore,
  showActions,
  onAccept,
  onReject,
  onViewDetails,
  className,
  index
}) {
  const deadline = new Date(Number(task.deadline / 1000000n));
  const isUrgent = task.priority === TaskPriority.urgent;
  const isExpired = deadline < /* @__PURE__ */ new Date();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: cn(
        "task-card overflow-hidden",
        isUrgent && "border-accent/40",
        className
      ),
      "data-ocid": index !== void 0 ? `task.card.${index}` : "task.card",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
        isUrgent && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-accent w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-tight truncate", children: task.title }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PriorityBadge, { priority: task.priority }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: task.status })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground", children: [
            task.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 11 }),
              task.location.displayName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: cn(
                  "flex items-center gap-1",
                  isExpired && "text-destructive"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 11 }),
                  format(deadline, "MMM d, yyyy")
                ]
              }
            )
          ] }),
          task.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: task.description }),
          task.requiredSkills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
            task.requiredSkills.slice(0, 4).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillTag, { skill: s }, s)),
            task.requiredSkills.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "+",
              task.requiredSkills.length - 4
            ] })
          ] }),
          matchScore !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(MatchScoreBadge, { score: matchScore, size: "sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "flex-1 text-xs h-8",
                onClick: () => onViewDetails == null ? void 0 : onViewDetails(task.id),
                asChild: !onViewDetails,
                "data-ocid": index !== void 0 ? `task.view_button.${index}` : "task.view_button",
                children: onViewDetails ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "View Details" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/volunteer/tasks", children: [
                  "View Details ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12 })
                ] })
              }
            ),
            showActions && task.status === TaskStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  className: "flex-1 text-xs h-8",
                  onClick: () => onAccept == null ? void 0 : onAccept(task.id),
                  "data-ocid": index !== void 0 ? `task.accept_button.${index}` : "task.accept_button",
                  children: "Accept"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-xs h-8 text-muted-foreground",
                  onClick: () => onReject == null ? void 0 : onReject(task.id),
                  "data-ocid": index !== void 0 ? `task.reject_button.${index}` : "task.reject_button",
                  children: "Reject"
                }
              )
            ] })
          ] })
        ] })
      ] })
    }
  );
}
export {
  TaskCard as T
};
