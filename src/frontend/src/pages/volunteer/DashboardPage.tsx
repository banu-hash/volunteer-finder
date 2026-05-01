import {
  useAcceptTask,
  useMyVolunteerTasks,
  useRecommendedTasks,
  useRejectTask,
} from "@/api/tasks";
import { useMyVolunteerProfile } from "@/api/volunteers";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { TaskCard } from "@/components/shared/TaskCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/volunteer/StatsCard";
import { TaskDetailModal } from "@/components/volunteer/TaskDetailModal";
import { useNotifications } from "@/hooks/useNotifications";
import { useAuthStore } from "@/stores/authStore";
import { TaskStatus } from "@/types";
import type { TaskPublic, TaskWithScore } from "@/types";
import { format } from "date-fns";
import {
  BarChart3,
  CheckCircle2,
  ClipboardList,
  History,
  ListChecks,
  Sparkles,
  Star,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function calcStats(tasks: TaskPublic[], recommended: TaskWithScore[]) {
  const assigned = tasks.filter(
    (t) => t.status === TaskStatus.accepted || t.status === TaskStatus.pending,
  ).length;
  const completed = tasks.filter(
    (t) =>
      t.status === TaskStatus.completed || t.status === TaskStatus.verified,
  ).length;
  const total = tasks.length;
  const acceptanceRate =
    total > 0
      ? Math.round(
          (tasks.filter((t) => t.status !== TaskStatus.rejected).length /
            total) *
            100,
        )
      : 0;
  const avgMatch =
    recommended.length > 0
      ? Math.round(
          (recommended.reduce((acc, t) => acc + t.matchScore, 0) /
            recommended.length) *
            100,
        )
      : 0;
  return { assigned, completed, acceptanceRate, avgMatch };
}

export default function VolunteerDashboardPage() {
  const { name } = useAuthStore();
  const { data: profile } = useMyVolunteerProfile();
  const { data: tasks = [], isLoading: tasksLoading } = useMyVolunteerTasks();
  const { data: recommended = [], isLoading: recLoading } =
    useRecommendedTasks(6n);
  const acceptTask = useAcceptTask();
  const rejectTask = useRejectTask();
  useNotifications();

  const [taskFilter, setTaskFilter] = useState<"all" | "pending" | "accepted">(
    "all",
  );
  const [selectedTask, setSelectedTask] = useState<TaskWithScore | null>(null);

  const displayName = profile?.name || name || "Volunteer";
  const isLoading = tasksLoading || recLoading;
  const stats = calcStats(tasks, recommended);

  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === "pending") return t.status === TaskStatus.pending;
    if (taskFilter === "accepted") return t.status === TaskStatus.accepted;
    return t.status === TaskStatus.pending || t.status === TaskStatus.accepted;
  });

  const history = tasks
    .filter(
      (t) =>
        t.status === TaskStatus.completed || t.status === TaskStatus.verified,
    )
    .slice(0, 10);

  async function handleAccept(taskId: bigint) {
    try {
      await acceptTask.mutateAsync(taskId);
      toast.success("Task accepted!");
    } catch {
      toast.error("Failed to accept task");
    }
  }

  async function handleReject(taskId: bigint) {
    try {
      await rejectTask.mutateAsync(taskId);
      toast.success("Task rejected");
    } catch {
      toast.error("Failed to reject task");
    }
  }

  return (
    <div
      className="space-y-8 p-4 md:p-6 max-w-7xl mx-auto"
      data-ocid="volunteer.dashboard.page"
    >
      {/* Welcome Banner */}
      <section className="rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/20 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">
              Welcome back, {displayName.split(" ")[0]}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Find your next impactful role in your community.
            </p>
          </div>
          {profile && (
            <div className="flex-shrink-0 bg-card border border-border rounded-xl px-4 py-3 hidden sm:block">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star size={14} className="text-accent fill-accent" />
                <span className="font-semibold text-foreground">
                  {profile.rating.toFixed(1)}
                </span>
                <span>rating</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <ListChecks size={14} className="text-primary" />
                <span className="font-semibold text-foreground">
                  {profile.totalTasksCompleted.toString()}
                </span>
                <span>completed</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats Row */}
      {isLoading ? (
        <div
          className="flex justify-center py-6"
          data-ocid="volunteer.stats.loading_state"
        >
          <LoadingSpinner size="lg" label="Loading stats..." />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Assigned Tasks"
            value={stats.assigned}
            icon={ClipboardList}
            accentColor="primary"
            trend="neutral"
            trendLabel="Active tasks"
            data-ocid="volunteer.stats.assigned"
          />
          <StatsCard
            title="Completed"
            value={stats.completed}
            icon={CheckCircle2}
            accentColor="success"
            trend="up"
            trendLabel="All time"
            data-ocid="volunteer.stats.completed"
          />
          <StatsCard
            title="Acceptance Rate"
            value={`${stats.acceptanceRate}%`}
            icon={ThumbsUp}
            accentColor="accent"
            trend={stats.acceptanceRate >= 70 ? "up" : "neutral"}
            trendLabel="Of all tasks"
            data-ocid="volunteer.stats.acceptance"
          />
          <StatsCard
            title="Avg Match Score"
            value={`${stats.avgMatch}%`}
            icon={Star}
            accentColor={stats.avgMatch >= 70 ? "success" : "accent"}
            trend={stats.avgMatch >= 70 ? "up" : "neutral"}
            trendLabel="AI recommendations"
            data-ocid="volunteer.stats.avg_match"
          />
        </div>
      )}

      {/* Recommended Tasks */}
      <section
        className="dashboard-section"
        data-ocid="volunteer.recommended.section"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={18} className="text-accent" />
          <h2 className="font-display font-semibold text-lg text-foreground">
            AI-Recommended for You
          </h2>
          {recommended.length > 0 && (
            <span className="bg-accent/15 text-accent text-xs font-semibold px-2 py-0.5 rounded-full">
              {recommended.length} matches
            </span>
          )}
        </div>

        {recLoading ? (
          <LoadingSpinner size="md" label="Finding best matches..." />
        ) : recommended.length === 0 ? (
          <EmptyState
            icon={<Sparkles size={28} />}
            title="No recommendations yet"
            description="Complete your profile and add skills to get AI-powered task matches."
            data-ocid="volunteer.recommended.empty_state"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {recommended.slice(0, 6).map((tw, i) => (
              <TaskCard
                key={tw.task.id.toString()}
                task={tw.task}
                matchScore={tw.matchScore}
                showActions
                onAccept={handleAccept}
                onReject={handleReject}
                onViewDetails={() => setSelectedTask(tw)}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </section>

      {/* Assigned Tasks */}
      <section
        className="dashboard-section"
        data-ocid="volunteer.assigned.section"
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <ClipboardList size={18} className="text-primary" />
            <h2 className="font-display font-semibold text-lg text-foreground">
              My Tasks
            </h2>
          </div>
          <Tabs
            value={taskFilter}
            onValueChange={(v) =>
              setTaskFilter(v as "all" | "pending" | "accepted")
            }
            data-ocid="volunteer.assigned.filter.tab"
          >
            <TabsList className="h-8">
              <TabsTrigger
                value="all"
                className="text-xs px-3 h-7"
                data-ocid="volunteer.filter.all"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="text-xs px-3 h-7"
                data-ocid="volunteer.filter.pending"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="accepted"
                className="text-xs px-3 h-7"
                data-ocid="volunteer.filter.accepted"
              >
                Accepted
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {tasksLoading ? (
          <LoadingSpinner size="md" label="Loading tasks..." />
        ) : filteredTasks.length === 0 ? (
          <EmptyState
            icon={<ClipboardList size={28} />}
            title="No tasks found"
            description="No tasks match the current filter."
            data-ocid="volunteer.assigned.empty_state"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredTasks.map((task, i) => (
              <TaskCard
                key={task.id.toString()}
                task={task}
                showActions
                onAccept={handleAccept}
                onReject={handleReject}
                onViewDetails={() => setSelectedTask({ task, matchScore: 0 })}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </section>

      {/* Task History */}
      <section
        className="dashboard-section"
        data-ocid="volunteer.history.section"
      >
        <div className="flex items-center gap-2 mb-4">
          <History size={18} className="text-muted-foreground" />
          <h2 className="font-display font-semibold text-lg text-foreground">
            Task History
          </h2>
        </div>

        {history.length === 0 ? (
          <EmptyState
            icon={<BarChart3 size={28} />}
            title="No completed tasks yet"
            description="Complete tasks to see your history here."
            data-ocid="volunteer.history.empty_state"
          />
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="hidden md:grid grid-cols-[1fr_140px_120px_100px] gap-4 px-4 py-2.5 bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              <span>Task</span>
              <span>Deadline</span>
              <span>Status</span>
              <span className="text-right">Action</span>
            </div>
            {history.map((task, i) => {
              const deadline = new Date(Number(task.deadline / 1_000_000n));
              return (
                <div
                  key={task.id.toString()}
                  className="grid grid-cols-1 md:grid-cols-[1fr_140px_120px_100px] gap-2 md:gap-4 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-smooth"
                  data-ocid={`volunteer.history.item.${i + 1}`}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {task.location?.displayName ?? "Remote"}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground self-center">
                    {format(deadline, "MMM d, yyyy")}
                  </p>
                  <div className="self-center">
                    <span className="text-xs font-medium text-success bg-success/10 border border-success/20 px-2 py-1 rounded-md">
                      {task.status === TaskStatus.verified
                        ? "Verified"
                        : "Completed"}
                    </span>
                  </div>
                  <div className="self-center md:text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-7 text-primary"
                      onClick={() => setSelectedTask({ task, matchScore: 0 })}
                      data-ocid={`volunteer.history.view_button.${i + 1}`}
                    >
                      Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Task Detail Modal */}
      <TaskDetailModal
        taskWithScore={selectedTask}
        open={!!selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  );
}
