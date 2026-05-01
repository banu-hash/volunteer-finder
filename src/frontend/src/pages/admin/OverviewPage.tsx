import { useActivityLog, usePendingNGOs, usePlatformStats } from "@/api/admin";
import { ActivityLogTable } from "@/components/admin/ActivityLogTable";
import { AdminStatsCard } from "@/components/admin/AdminStatsCard";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock,
  RefreshCw,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Synthetic chart data based on realistic growth patterns
const signupData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  volunteers: Math.floor(10 + Math.sin(i * 0.4) * 5 + i * 0.8),
  ngos: Math.floor(2 + Math.sin(i * 0.3) * 1.5 + i * 0.1),
}));

const taskStatusData = [
  { status: "Pending", count: 18 },
  { status: "Accepted", count: 34 },
  { status: "Completed", count: 56 },
  { status: "Verified", count: 42 },
  { status: "Rejected", count: 7 },
];

const quickActions = [
  {
    title: "Approve NGOs",
    description: "Review pending NGO applications",
    icon: Building2,
    href: "/admin/ngos",
  },
  {
    title: "Manage Users",
    description: "View and manage all volunteers",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "View Analytics",
    description: "Monitor platform activity",
    icon: TrendingUp,
    href: "/admin",
  },
];

export default function AdminOverviewPage() {
  const {
    data: stats,
    isLoading: statsLoading,
    refetch: refetchStats,
  } = usePlatformStats();
  const {
    data: logs = [],
    isLoading: logsLoading,
    refetch: refetchLogs,
  } = useActivityLog();
  const { data: pendingNGOs = [] } = usePendingNGOs();
  const pendingCount = pendingNGOs.length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div
        className="flex items-center justify-between"
        data-ocid="admin_overview.page"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Platform Overview
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Monitor and manage the Volunteer Finder System
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            refetchStats();
            refetchLogs();
          }}
          className="gap-2"
          data-ocid="admin_overview.refresh_button"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Stats grid */}
      {statsLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {["vol", "ngo", "pending", "tasks", "completed", "rate"].map((id) => (
            <div
              key={id}
              className="h-28 rounded-xl bg-muted animate-pulse"
              data-ocid="stats.loading_state"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <AdminStatsCard
            title="Total Volunteers"
            value={stats ? stats.totalVolunteers.toString() : "—"}
            icon={Users}
            variant="primary"
            ocid="stats.volunteers_card"
          />
          <AdminStatsCard
            title="Total NGOs"
            value={stats ? stats.totalNGOs.toString() : "—"}
            icon={Building2}
            ocid="stats.ngos_card"
          />
          <AdminStatsCard
            title="Pending Approvals"
            value={stats ? stats.pendingNGOs.toString() : "—"}
            icon={AlertCircle}
            variant={stats && stats.pendingNGOs > 0n ? "warning" : "default"}
            ocid="stats.pending_card"
          />
          <AdminStatsCard
            title="Total Tasks"
            value={stats ? stats.totalTasks.toString() : "—"}
            icon={ClipboardList}
            ocid="stats.tasks_card"
          />
          <AdminStatsCard
            title="Completed Tasks"
            value={stats ? stats.completedTasks.toString() : "—"}
            icon={CheckCircle2}
            variant="success"
            ocid="stats.completed_card"
          />
          <AdminStatsCard
            title="Completion Rate"
            value={stats ? `${(stats.completionRate * 100).toFixed(1)}%` : "—"}
            icon={TrendingUp}
            variant="success"
            ocid="stats.rate_card"
          />
        </div>
      )}

      {/* Quick Actions */}
      <section data-ocid="admin_overview.quick_actions.section">
        <h2 className="font-display font-semibold text-foreground text-lg mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            const badge =
              action.title === "Approve NGOs" && pendingCount > 0
                ? pendingCount
                : null;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                data-ocid={`admin_overview.quick_action.${i + 1}`}
              >
                <Link
                  to={action.href}
                  className="group bg-card border border-border rounded-xl p-5 flex items-start justify-between hover:border-primary/40 hover:shadow-elevated transition-smooth cursor-pointer no-underline"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-smooth">
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm text-foreground">
                          {action.title}
                        </p>
                        {badge && (
                          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-destructive text-destructive-foreground">
                            {badge}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth shrink-0 mt-3" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Charts */}
      <section>
        <h2 className="font-display font-semibold text-foreground text-lg mb-4">
          Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            className="bg-card border border-border rounded-xl p-5"
            data-ocid="admin_overview.signups_chart"
          >
            <h3 className="font-medium text-sm text-foreground mb-4">
              Signups — Last 30 Days
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={signupData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(var(--border))"
                />
                <XAxis
                  dataKey="day"
                  tick={{
                    fontSize: 11,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{
                    fontSize: 11,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "oklch(var(--card))",
                    border: "1px solid oklch(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="volunteers"
                  stroke="oklch(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  name="Volunteers"
                />
                <Line
                  type="monotone"
                  dataKey="ngos"
                  stroke="oklch(var(--success))"
                  strokeWidth={2}
                  dot={false}
                  name="NGOs"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div
            className="bg-card border border-border rounded-xl p-5"
            data-ocid="admin_overview.tasks_chart"
          >
            <h3 className="font-medium text-sm text-foreground mb-4">
              Tasks by Status
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={taskStatusData} barSize={28}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="status"
                  tick={{
                    fontSize: 11,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{
                    fontSize: 11,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "oklch(var(--card))",
                    border: "1px solid oklch(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="oklch(var(--primary))"
                  radius={[4, 4, 0, 0]}
                  name="Tasks"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Activity log */}
      <section data-ocid="admin_overview.activity.section">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-foreground text-lg">
            Recent Activity
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            Live feed
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <ActivityLogTable logs={logs} isLoading={logsLoading} />
        </div>
      </section>
    </div>
  );
}
