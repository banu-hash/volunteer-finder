import { r as reactExports, T as TaskStatus, j as jsxRuntimeExports, C as ClipboardList, I as Input, d as LoadingSpinner, h as ue } from "./index-D4bjddjr.js";
import { u as useMyVolunteerTasks, b as useAcceptTask, c as useRejectTask } from "./tasks-7B4Gj8SA.js";
import { E as EmptyState } from "./separator-D6m2xMYb.js";
import { T as TaskCard } from "./TaskCard-9JPRBWz-.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-DxzquryM.js";
import { T as TaskDetailModal } from "./TaskDetailModal-BCJnC39S.js";
import { S as Search } from "./search-CyXTpNOG.js";
import "./MatchScoreBadge-I1ajIjKO.js";
import "./trending-up-B8guMjXx.js";
import "./SkillTag-CgRS11xk.js";
import "./StatusBadge-DX9GDhWP.js";
import "./calendar-CdS3BWq4.js";
import "./format-d5MMsb9-.js";
import "./chevron-right-BLww6Yyb.js";
import "./dialog-DqdYP-o_.js";
function matchesSearch(task, q) {
  if (!q) return true;
  const lower = q.toLowerCase();
  return task.title.toLowerCase().includes(lower) || task.description.toLowerCase().includes(lower) || task.requiredSkills.some((s) => s.toLowerCase().includes(lower));
}
function VolunteerTasksPage() {
  const { data: tasks = [], isLoading, refetch } = useMyVolunteerTasks();
  const acceptTask = useAcceptTask();
  const rejectTask = useRejectTask();
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [selectedTask, setSelectedTask] = reactExports.useState(null);
  const filtered = tasks.filter((t) => {
    if (!matchesSearch(t, search)) return false;
    if (statusFilter === "pending") return t.status === TaskStatus.pending;
    if (statusFilter === "accepted") return t.status === TaskStatus.accepted;
    if (statusFilter === "completed")
      return t.status === TaskStatus.completed || t.status === TaskStatus.verified;
    return true;
  });
  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === TaskStatus.pending).length,
    accepted: tasks.filter((t) => t.status === TaskStatus.accepted).length,
    completed: tasks.filter(
      (t) => t.status === TaskStatus.completed || t.status === TaskStatus.verified
    ).length
  };
  async function handleAccept(taskId) {
    try {
      await acceptTask.mutateAsync(taskId);
      ue.success("Task accepted!");
    } catch {
      ue.error("Failed to accept task");
    }
  }
  async function handleReject(taskId) {
    try {
      await rejectTask.mutateAsync(taskId);
      ue.success("Task rejected");
    } catch {
      ue.error("Failed to reject task");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 md:p-6 max-w-7xl mx-auto space-y-6",
      "data-ocid": "volunteer.tasks.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 24, className: "text-primary" }),
            "My Tasks"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "View, manage, and complete your assigned tasks" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Search,
              {
                size: 16,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: search,
                onChange: (e) => setSearch(e.target.value),
                placeholder: "Search tasks by title or skill...",
                className: "pl-9",
                "data-ocid": "volunteer.tasks.search_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tabs,
            {
              value: statusFilter,
              onValueChange: (v) => setStatusFilter(v),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "all",
                    className: "text-xs px-3",
                    "data-ocid": "volunteer.tasks.tab.all",
                    children: [
                      "All (",
                      counts.all,
                      ")"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "pending",
                    className: "text-xs px-3",
                    "data-ocid": "volunteer.tasks.tab.pending",
                    children: [
                      "Pending (",
                      counts.pending,
                      ")"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "accepted",
                    className: "text-xs px-3",
                    "data-ocid": "volunteer.tasks.tab.accepted",
                    children: [
                      "Accepted (",
                      counts.accepted,
                      ")"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "completed",
                    className: "text-xs px-3",
                    "data-ocid": "volunteer.tasks.tab.completed",
                    children: [
                      "Done (",
                      counts.completed,
                      ")"
                    ]
                  }
                )
              ] })
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex justify-center py-16",
            "data-ocid": "volunteer.tasks.loading_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading tasks..." })
          }
        ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 32 }),
            title: search ? "No tasks match your search" : "No tasks found",
            description: search ? "Try different keywords or clear the search." : "You don't have any tasks in this category yet.",
            action: search ? { label: "Clear search", onClick: () => setSearch("") } : void 0,
            "data-ocid": "volunteer.tasks.empty_state"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: filtered.map((task, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          TaskCard,
          {
            task,
            showActions: true,
            onAccept: handleAccept,
            onReject: handleReject,
            onViewDetails: () => setSelectedTask({ task, matchScore: 0 }),
            index: i + 1
          },
          task.id.toString()
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TaskDetailModal,
          {
            taskWithScore: selectedTask,
            open: !!selectedTask,
            onClose: () => setSelectedTask(null),
            onProofSubmitted: () => refetch()
          }
        )
      ]
    }
  );
}
export {
  VolunteerTasksPage as default
};
