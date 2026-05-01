import { useMyNGOTasks } from "@/api/tasks";
import {
  PriorityPieChart,
  TaskCompletionsLineChart,
  TasksByStatusChart,
} from "@/components/ngo/AnalyticsCharts";
import { TaskCard } from "@/components/shared/TaskCard";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskStatus } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ClipboardList,
  PlusCircle,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent?: boolean;
  ocid: string;
}

function StatCard({ label, value, icon, accent, ocid }: StatCardProps) {
  return (
    <div
      className={`p-4 rounded-xl border transition-smooth ${
        accent ? "bg-primary/10 border-primary/30" : "bg-card border-border"
      }`}
      data-ocid={ocid}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
        <span className={accent ? "text-primary" : "text-muted-foreground"}>
          {icon}
        </span>
      </div>
      <p className="font-display font-bold text-2xl text-foreground">{value}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { data: tasks = [], isLoading } = useMyNGOTasks();

  const stats = useMemo(() => {
    const total = tasks.length;
    const pending = tasks.filter((t) => t.status === TaskStatus.pending).length;
    const completed = tasks.filter(
      (t) =>
        t.status === TaskStatus.completed || t.status === TaskStatus.verified,
    ).length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    const assignedVolunteers = new Set(
      tasks
        .filter((t) => t.assignedVolunteer)
        .map((t) => t.assignedVolunteer?.toString()),
    ).size;
    return { total, pending, completed, rate, assignedVolunteers };
  }, [tasks]);

  const recentTasks = useMemo(
    () =>
      [...tasks].sort((a, b) => Number(b.createdAt - a.createdAt)).slice(0, 5),
    [tasks],
  );

  return (
    <div className="space-y-8 p-4 md:p-6" data-ocid="ngo-dashboard.page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            NGO Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Monitor your tasks and volunteer engagement
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link
            to="/ngo/tasks"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-smooth"
            data-ocid="ngo-dashboard.create_task_button"
          >
            <PlusCircle size={15} />
            Create Task
          </Link>
          <Link
            to="/ngo/volunteers"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-card border border-border text-foreground rounded-lg text-sm font-medium hover:border-primary/50 transition-smooth"
            data-ocid="ngo-dashboard.view_volunteers_button"
          >
            <Users size={15} />
            View Volunteers
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {["s1", "s2", "s3", "s4"].map((k) => (
            <Skeleton key={k} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : (
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          data-ocid="ngo-dashboard.stats_section"
        >
          <StatCard
            label="Active Volunteers"
            value={stats.assignedVolunteers}
            icon={<Users size={16} />}
            ocid="ngo-dashboard.stat_volunteers"
          />
          <StatCard
            label="Pending Tasks"
            value={stats.pending}
            icon={<ClipboardList size={16} />}
            ocid="ngo-dashboard.stat_pending"
          />
          <StatCard
            label="Completed Tasks"
            value={stats.completed}
            icon={<CheckCircle2 size={16} />}
            accent
            ocid="ngo-dashboard.stat_completed"
          />
          <StatCard
            label="Completion Rate"
            value={`${stats.rate}%`}
            icon={<TrendingUp size={16} />}
            ocid="ngo-dashboard.stat_rate"
          />
        </div>
      )}

      {/* Analytics Charts */}
      <section
        className="space-y-4"
        data-ocid="ngo-dashboard.analytics_section"
      >
        <h2 className="font-display font-semibold text-lg text-foreground">
          Analytics
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["c1", "c2", "c3"].map((k) => (
              <Skeleton key={k} className="h-56 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Tasks by Status
              </h3>
              <TasksByStatusChart tasks={tasks} />
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Completions (30 days)
              </h3>
              <TaskCompletionsLineChart tasks={tasks} />
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Priority Distribution
              </h3>
              <PriorityPieChart tasks={tasks} />
            </div>
          </div>
        )}
      </section>

      {/* Recent Tasks */}
      <section
        className="space-y-4"
        data-ocid="ngo-dashboard.recent_tasks_section"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold text-lg text-foreground">
            Recent Tasks
          </h2>
          <Link
            to="/ngo/tasks"
            className="text-sm text-primary hover:underline"
            data-ocid="ngo-dashboard.view_all_tasks_link"
          >
            View All →
          </Link>
        </div>
        {isLoading ? (
          <div className="space-y-3">
            {["t1", "t2", "t3"].map((k) => (
              <Skeleton key={k} className="h-28 rounded-lg" />
            ))}
          </div>
        ) : recentTasks.length === 0 ? (
          <div
            className="text-center py-10 border border-dashed border-border rounded-xl text-muted-foreground"
            data-ocid="ngo-dashboard.empty_state"
          >
            <ClipboardList size={32} className="mx-auto mb-2 opacity-40" />
            <p className="font-medium">No tasks yet</p>
            <p className="text-sm mt-1">
              Create your first task to get started
            </p>
            <Link
              to="/ngo/tasks"
              className="inline-flex items-center gap-1 mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
              data-ocid="ngo-dashboard.create_first_task_button"
            >
              <PlusCircle size={14} /> Create Task
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentTasks.map((task, i) => (
              <TaskCard key={task.id.toString()} task={task} index={i + 1} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
