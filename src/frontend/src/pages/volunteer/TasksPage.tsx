import { useAcceptTask, useMyVolunteerTasks, useRejectTask } from "@/api/tasks";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { TaskCard } from "@/components/shared/TaskCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskDetailModal } from "@/components/volunteer/TaskDetailModal";
import { TaskStatus } from "@/types";
import type { TaskPublic, TaskWithScore } from "@/types";
import { ClipboardList, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type StatusFilter = "all" | "pending" | "accepted" | "completed";

function matchesSearch(task: TaskPublic, q: string): boolean {
  if (!q) return true;
  const lower = q.toLowerCase();
  return (
    task.title.toLowerCase().includes(lower) ||
    task.description.toLowerCase().includes(lower) ||
    task.requiredSkills.some((s) => s.toLowerCase().includes(lower))
  );
}

export default function VolunteerTasksPage() {
  const { data: tasks = [], isLoading, refetch } = useMyVolunteerTasks();
  const acceptTask = useAcceptTask();
  const rejectTask = useRejectTask();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedTask, setSelectedTask] = useState<TaskWithScore | null>(null);

  const filtered = tasks.filter((t) => {
    if (!matchesSearch(t, search)) return false;
    if (statusFilter === "pending") return t.status === TaskStatus.pending;
    if (statusFilter === "accepted") return t.status === TaskStatus.accepted;
    if (statusFilter === "completed")
      return (
        t.status === TaskStatus.completed || t.status === TaskStatus.verified
      );
    return true;
  });

  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === TaskStatus.pending).length,
    accepted: tasks.filter((t) => t.status === TaskStatus.accepted).length,
    completed: tasks.filter(
      (t) =>
        t.status === TaskStatus.completed || t.status === TaskStatus.verified,
    ).length,
  };

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
      className="p-4 md:p-6 max-w-7xl mx-auto space-y-6"
      data-ocid="volunteer.tasks.page"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <ClipboardList size={24} className="text-primary" />
            My Tasks
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            View, manage, and complete your assigned tasks
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks by title or skill..."
            className="pl-9"
            data-ocid="volunteer.tasks.search_input"
          />
        </div>
        <Tabs
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as StatusFilter)}
        >
          <TabsList>
            <TabsTrigger
              value="all"
              className="text-xs px-3"
              data-ocid="volunteer.tasks.tab.all"
            >
              All ({counts.all})
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="text-xs px-3"
              data-ocid="volunteer.tasks.tab.pending"
            >
              Pending ({counts.pending})
            </TabsTrigger>
            <TabsTrigger
              value="accepted"
              className="text-xs px-3"
              data-ocid="volunteer.tasks.tab.accepted"
            >
              Accepted ({counts.accepted})
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="text-xs px-3"
              data-ocid="volunteer.tasks.tab.completed"
            >
              Done ({counts.completed})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Task List */}
      {isLoading ? (
        <div
          className="flex justify-center py-16"
          data-ocid="volunteer.tasks.loading_state"
        >
          <LoadingSpinner size="lg" label="Loading tasks..." />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<ClipboardList size={32} />}
          title={search ? "No tasks match your search" : "No tasks found"}
          description={
            search
              ? "Try different keywords or clear the search."
              : "You don't have any tasks in this category yet."
          }
          action={
            search
              ? { label: "Clear search", onClick: () => setSearch("") }
              : undefined
          }
          data-ocid="volunteer.tasks.empty_state"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((task, i) => (
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

      {/* Task Detail Modal */}
      <TaskDetailModal
        taskWithScore={selectedTask}
        open={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onProofSubmitted={() => refetch()}
      />
    </div>
  );
}
