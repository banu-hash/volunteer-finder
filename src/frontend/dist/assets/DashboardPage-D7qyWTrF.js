import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, u as useAuthStore, b as useNotifications, r as reactExports, T as TaskStatus, L as ListChecks, d as LoadingSpinner, C as ClipboardList, e as CircleCheck, f as ThumbsUp, g as ChartColumn, B as Button, h as ue } from "./index-D4bjddjr.js";
import { u as useMyVolunteerTasks, a as useRecommendedTasks, b as useAcceptTask, c as useRejectTask } from "./tasks-7B4Gj8SA.js";
import { u as useMyVolunteerProfile } from "./volunteers-DGSeelEA.js";
import { E as EmptyState } from "./separator-D6m2xMYb.js";
import { T as TaskCard } from "./TaskCard-9JPRBWz-.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-DxzquryM.js";
import { T as TaskDetailModal } from "./TaskDetailModal-BCJnC39S.js";
import { S as Star } from "./star-Cm4lNMeQ.js";
import { f as format } from "./format-d5MMsb9-.js";
import "./MatchScoreBadge-I1ajIjKO.js";
import "./trending-up-B8guMjXx.js";
import "./SkillTag-CgRS11xk.js";
import "./StatusBadge-DX9GDhWP.js";
import "./calendar-CdS3BWq4.js";
import "./chevron-right-BLww6Yyb.js";
import "./dialog-DqdYP-o_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
];
const History = createLucideIcon("history", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const accentMap = {
  primary: {
    icon: "bg-primary/10 text-primary",
    value: "text-primary"
  },
  accent: {
    icon: "bg-accent/10 text-accent",
    value: "text-accent"
  },
  success: {
    icon: "bg-success/10 text-success",
    value: "text-success"
  },
  destructive: {
    icon: "bg-destructive/10 text-destructive",
    value: "text-destructive"
  }
};
function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  className,
  accentColor = "primary",
  "data-ocid": dataOcid
}) {
  const accent = accentMap[accentColor];
  const trendColor = trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground";
  const trendArrow = trend === "up" ? "↑" : trend === "down" ? "↓" : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-elevated transition-smooth",
        className
      ),
      "data-ocid": dataOcid,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-3xl font-display font-bold", accent.value), children: value }),
          subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: subtitle }),
          trendLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: cn("text-xs font-medium mt-2", trendColor), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1", children: trendArrow }),
            trendLabel
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-3 rounded-xl flex-shrink-0", accent.icon), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 22 }) })
      ] })
    }
  );
}
function calcStats(tasks, recommended) {
  const assigned = tasks.filter(
    (t) => t.status === TaskStatus.accepted || t.status === TaskStatus.pending
  ).length;
  const completed = tasks.filter(
    (t) => t.status === TaskStatus.completed || t.status === TaskStatus.verified
  ).length;
  const total = tasks.length;
  const acceptanceRate = total > 0 ? Math.round(
    tasks.filter((t) => t.status !== TaskStatus.rejected).length / total * 100
  ) : 0;
  const avgMatch = recommended.length > 0 ? Math.round(
    recommended.reduce((acc, t) => acc + t.matchScore, 0) / recommended.length * 100
  ) : 0;
  return { assigned, completed, acceptanceRate, avgMatch };
}
function VolunteerDashboardPage() {
  const { name } = useAuthStore();
  const { data: profile } = useMyVolunteerProfile();
  const { data: tasks = [], isLoading: tasksLoading } = useMyVolunteerTasks();
  const { data: recommended = [], isLoading: recLoading } = useRecommendedTasks(6n);
  const acceptTask = useAcceptTask();
  const rejectTask = useRejectTask();
  useNotifications();
  const [taskFilter, setTaskFilter] = reactExports.useState(
    "all"
  );
  const [selectedTask, setSelectedTask] = reactExports.useState(null);
  const displayName = (profile == null ? void 0 : profile.name) || name || "Volunteer";
  const isLoading = tasksLoading || recLoading;
  const stats = calcStats(tasks, recommended);
  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === "pending") return t.status === TaskStatus.pending;
    if (taskFilter === "accepted") return t.status === TaskStatus.accepted;
    return t.status === TaskStatus.pending || t.status === TaskStatus.accepted;
  });
  const history = tasks.filter(
    (t) => t.status === TaskStatus.completed || t.status === TaskStatus.verified
  ).slice(0, 10);
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
      className: "space-y-8 p-4 md:p-6 max-w-7xl mx-auto",
      "data-ocid": "volunteer.dashboard.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/20 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl md:text-3xl text-foreground", children: [
              "Welcome back, ",
              displayName.split(" ")[0],
              "! 👋"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Find your next impactful role in your community." })
          ] }),
          profile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 bg-card border border-border rounded-xl px-4 py-3 hidden sm:block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14, className: "text-accent fill-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: profile.rating.toFixed(1) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "rating" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { size: 14, className: "text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: profile.totalTasksCompleted.toString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "completed" })
            ] })
          ] })
        ] }) }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex justify-center py-6",
            "data-ocid": "volunteer.stats.loading_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading stats..." })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatsCard,
            {
              title: "Assigned Tasks",
              value: stats.assigned,
              icon: ClipboardList,
              accentColor: "primary",
              trend: "neutral",
              trendLabel: "Active tasks",
              "data-ocid": "volunteer.stats.assigned"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatsCard,
            {
              title: "Completed",
              value: stats.completed,
              icon: CircleCheck,
              accentColor: "success",
              trend: "up",
              trendLabel: "All time",
              "data-ocid": "volunteer.stats.completed"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatsCard,
            {
              title: "Acceptance Rate",
              value: `${stats.acceptanceRate}%`,
              icon: ThumbsUp,
              accentColor: "accent",
              trend: stats.acceptanceRate >= 70 ? "up" : "neutral",
              trendLabel: "Of all tasks",
              "data-ocid": "volunteer.stats.acceptance"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatsCard,
            {
              title: "Avg Match Score",
              value: `${stats.avgMatch}%`,
              icon: Star,
              accentColor: stats.avgMatch >= 70 ? "success" : "accent",
              trend: stats.avgMatch >= 70 ? "up" : "neutral",
              trendLabel: "AI recommendations",
              "data-ocid": "volunteer.stats.avg_match"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "dashboard-section",
            "data-ocid": "volunteer.recommended.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 18, className: "text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "AI-Recommended for You" }),
                recommended.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-accent/15 text-accent text-xs font-semibold px-2 py-0.5 rounded-full", children: [
                  recommended.length,
                  " matches"
                ] })
              ] }),
              recLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md", label: "Finding best matches..." }) : recommended.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                EmptyState,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 28 }),
                  title: "No recommendations yet",
                  description: "Complete your profile and add skills to get AI-powered task matches.",
                  "data-ocid": "volunteer.recommended.empty_state"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: recommended.slice(0, 6).map((tw, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                TaskCard,
                {
                  task: tw.task,
                  matchScore: tw.matchScore,
                  showActions: true,
                  onAccept: handleAccept,
                  onReject: handleReject,
                  onViewDetails: () => setSelectedTask(tw),
                  index: i + 1
                },
                tw.task.id.toString()
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "dashboard-section",
            "data-ocid": "volunteer.assigned.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 flex-wrap gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 18, className: "text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "My Tasks" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tabs,
                  {
                    value: taskFilter,
                    onValueChange: (v) => setTaskFilter(v),
                    "data-ocid": "volunteer.assigned.filter.tab",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "h-8", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TabsTrigger,
                        {
                          value: "all",
                          className: "text-xs px-3 h-7",
                          "data-ocid": "volunteer.filter.all",
                          children: "All"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TabsTrigger,
                        {
                          value: "pending",
                          className: "text-xs px-3 h-7",
                          "data-ocid": "volunteer.filter.pending",
                          children: "Pending"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TabsTrigger,
                        {
                          value: "accepted",
                          className: "text-xs px-3 h-7",
                          "data-ocid": "volunteer.filter.accepted",
                          children: "Accepted"
                        }
                      )
                    ] })
                  }
                )
              ] }),
              tasksLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md", label: "Loading tasks..." }) : filteredTasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                EmptyState,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 28 }),
                  title: "No tasks found",
                  description: "No tasks match the current filter.",
                  "data-ocid": "volunteer.assigned.empty_state"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: filteredTasks.map((task, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
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
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "dashboard-section",
            "data-ocid": "volunteer.history.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(History, { size: 18, className: "text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Task History" })
              ] }),
              history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                EmptyState,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 28 }),
                  title: "No completed tasks yet",
                  description: "Complete tasks to see your history here.",
                  "data-ocid": "volunteer.history.empty_state"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:grid grid-cols-[1fr_140px_120px_100px] gap-4 px-4 py-2.5 bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Task" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Deadline" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Action" })
                ] }),
                history.map((task, i) => {
                  var _a;
                  const deadline = new Date(Number(task.deadline / 1000000n));
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "grid grid-cols-1 md:grid-cols-[1fr_140px_120px_100px] gap-2 md:gap-4 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-smooth",
                      "data-ocid": `volunteer.history.item.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: task.title }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: ((_a = task.location) == null ? void 0 : _a.displayName) ?? "Remote" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground self-center", children: format(deadline, "MMM d, yyyy") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-success bg-success/10 border border-success/20 px-2 py-1 rounded-md", children: task.status === TaskStatus.verified ? "Verified" : "Completed" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-center md:text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            variant: "ghost",
                            size: "sm",
                            className: "text-xs h-7 text-primary",
                            onClick: () => setSelectedTask({ task, matchScore: 0 }),
                            "data-ocid": `volunteer.history.view_button.${i + 1}`,
                            children: "Details"
                          }
                        ) })
                      ]
                    },
                    task.id.toString()
                  );
                })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TaskDetailModal,
          {
            taskWithScore: selectedTask,
            open: !!selectedTask,
            onClose: () => setSelectedTask(null)
          }
        )
      ]
    }
  );
}
export {
  VolunteerDashboardPage as default
};
