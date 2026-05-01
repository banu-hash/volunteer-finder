import { useDeleteTask, useMyNGOTasks } from "@/api/tasks";
import { AISuggestionModal } from "@/components/ngo/AISuggestionModal";
import { ProofReviewPanel } from "@/components/ngo/ProofReviewPanel";
import { TaskCreateForm } from "@/components/ngo/TaskCreateForm";
import { SkillTag } from "@/components/shared/SkillTag";
import { PriorityBadge, StatusBadge } from "@/components/shared/StatusBadge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskPriority, TaskStatus } from "@/types";
import type { TaskPublic } from "@/types";
import { format } from "date-fns";
import {
  Bot,
  Calendar,
  CheckSquare,
  ClipboardList,
  Edit2,
  MapPin,
  MoreVertical,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type StatusFilter = "all" | TaskStatus;

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: TaskStatus.pending, label: "Pending" },
  { value: TaskStatus.accepted, label: "Accepted" },
  { value: TaskStatus.completed, label: "Completed" },
  { value: TaskStatus.verified, label: "Verified" },
];

function TaskRow({
  task,
  index,
  onEdit,
  onAI,
  onProof,
  onDelete,
}: {
  task: TaskPublic;
  index: number;
  onEdit: (task: TaskPublic) => void;
  onAI: (task: TaskPublic) => void;
  onProof: (task: TaskPublic) => void;
  onDelete: (task: TaskPublic) => void;
}) {
  const deadline = new Date(Number(task.deadline / 1_000_000n));
  const isExpired = deadline < new Date();

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-smooth"
      data-ocid={`ngo-tasks.item.${index}`}
    >
      {task.priority === TaskPriority.urgent && (
        <div className="hidden sm:block w-1 h-12 bg-accent rounded-full flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-start gap-2 flex-wrap">
          <h3 className="font-display font-semibold text-foreground text-sm leading-tight">
            {task.title}
          </h3>
          <PriorityBadge priority={task.priority} />
          <StatusBadge status={task.status} />
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span
            className={`flex items-center gap-1 ${isExpired ? "text-destructive" : ""}`}
          >
            <Calendar size={11} />
            {format(deadline, "MMM d, yyyy")}
          </span>
          {task.location && (
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {task.location.displayName}
            </span>
          )}
        </div>
        {task.requiredSkills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.requiredSkills.slice(0, 4).map((s) => (
              <SkillTag key={s} skill={s} />
            ))}
            {task.requiredSkills.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{task.requiredSkills.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {task.status === TaskStatus.pending && !task.assignedVolunteer && (
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8 gap-1 text-primary border-primary/40 hover:bg-primary/10"
            onClick={() => onAI(task)}
            data-ocid={`ngo-tasks.ai_suggest_button.${index}`}
          >
            <Bot size={12} />
            AI Assign
          </Button>
        )}
        {task.status === TaskStatus.completed && (
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8 gap-1 text-success border-success/40 hover:bg-success/10"
            onClick={() => onProof(task)}
            data-ocid={`ngo-tasks.review_button.${index}`}
          >
            <CheckSquare size={12} />
            Review
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              data-ocid={`ngo-tasks.menu_button.${index}`}
            >
              <MoreVertical size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onEdit(task)}
              data-ocid={`ngo-tasks.edit_button.${index}`}
            >
              <Edit2 size={13} className="mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => onDelete(task)}
              data-ocid={`ngo-tasks.delete_button.${index}`}
            >
              <Trash2 size={13} className="mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default function TasksPage() {
  const { data: tasks = [], isLoading } = useMyNGOTasks();
  const deleteTask = useDeleteTask();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [editTask, setEditTask] = useState<TaskPublic | null>(null);
  const [aiTask, setAiTask] = useState<TaskPublic | null>(null);
  const [proofTask, setProofTask] = useState<TaskPublic | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TaskPublic | null>(null);

  const filtered = useMemo(() => {
    return tasks
      .filter((t) => statusFilter === "all" || t.status === statusFilter)
      .filter(
        (t) =>
          !search ||
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((a, b) => Number(b.createdAt - a.createdAt));
  }, [tasks, statusFilter, search]);

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteTask.mutateAsync(deleteTarget.id);
      toast.success("Task deleted.");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete task.");
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-6" data-ocid="ngo-tasks.page">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Task Management
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {tasks.length} total task{tasks.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="gap-2"
          data-ocid="ngo-tasks.create_task_button"
        >
          <Plus size={15} />
          Create Task
        </Button>
      </div>

      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="pl-9"
          data-ocid="ngo-tasks.search_input"
        />
      </div>

      <Tabs
        value={statusFilter}
        onValueChange={(v) => setStatusFilter(v as StatusFilter)}
      >
        <TabsList
          className="w-full sm:w-auto overflow-x-auto"
          data-ocid="ngo-tasks.status_tabs"
        >
          {STATUS_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="text-xs"
              data-ocid={`ngo-tasks.tab.${tab.value}`}
            >
              {tab.label}
              <span className="ml-1.5 text-muted-foreground">
                (
                {tab.value === "all"
                  ? tasks.length
                  : tasks.filter((t) => t.status === tab.value).length}
                )
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="space-y-3">
          {["t1", "t2", "t3", "t4"].map((k) => (
            <Skeleton key={k} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="text-center py-14 border border-dashed border-border rounded-xl text-muted-foreground"
          data-ocid="ngo-tasks.empty_state"
        >
          <ClipboardList size={32} className="mx-auto mb-2 opacity-40" />
          <p className="font-medium">No tasks found</p>
          <p className="text-sm mt-1">
            {search
              ? "Try adjusting your search"
              : "Create your first task to get started"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((task, i) => (
            <TaskRow
              key={task.id.toString()}
              task={task}
              index={i + 1}
              onEdit={(t) => setEditTask(t)}
              onAI={(t) => setAiTask(t)}
              onProof={(t) => setProofTask(t)}
              onDelete={(t) => setDeleteTarget(t)}
            />
          ))}
        </div>
      )}

      <TaskCreateForm
        open={createOpen || !!editTask}
        onClose={() => {
          setCreateOpen(false);
          setEditTask(null);
        }}
        editTask={editTask}
      />
      <AISuggestionModal
        task={aiTask}
        open={!!aiTask}
        onClose={() => setAiTask(null)}
      />
      <ProofReviewPanel
        task={proofTask}
        open={!!proofTask}
        onClose={() => setProofTask(null)}
      />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="ngo-tasks.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteTarget?.title}"? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="ngo-tasks.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="ngo-tasks.delete_confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
