import { j as jsxRuntimeExports, l as TaskPriority, a as cn, T as TaskStatus } from "./index-D4bjddjr.js";
const statusConfig = {
  [TaskStatus.pending]: {
    label: "Pending",
    className: "bg-muted text-muted-foreground border-border"
  },
  [TaskStatus.accepted]: {
    label: "Accepted",
    className: "bg-primary/10 text-primary border-primary/30"
  },
  [TaskStatus.completed]: {
    label: "Completed",
    className: "bg-success/10 text-success border-success/30"
  },
  [TaskStatus.verified]: {
    label: "Verified",
    className: "bg-success/20 text-success border-success/40"
  },
  [TaskStatus.rejected]: {
    label: "Rejected",
    className: "bg-destructive/10 text-destructive border-destructive/30"
  }
};
function StatusBadge({ status, className }) {
  const config = statusConfig[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border",
        config.className,
        className
      ),
      children: config.label
    }
  );
}
function PriorityBadge({ priority, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border",
        priority === TaskPriority.urgent ? "bg-accent/10 text-accent border-accent/30" : "bg-secondary text-secondary-foreground border-border",
        className
      ),
      children: priority === TaskPriority.urgent ? "🔴 Urgent" : "Normal"
    }
  );
}
export {
  PriorityBadge as P,
  StatusBadge as S
};
