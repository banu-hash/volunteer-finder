import { useCreateTask, useUpdateTask } from "@/api/tasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { TaskPriority } from "@/types";
import type { TaskPublic } from "@/types";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SKILL_OPTIONS = [
  "Teaching",
  "Coding",
  "Design",
  "Medical",
  "Construction",
  "Cooking",
  "Driving",
  "Language",
  "Legal",
  "Counseling",
  "Photography",
  "Marketing",
  "Fundraising",
  "Childcare",
  "Elder Care",
];

interface Props {
  open: boolean;
  onClose: () => void;
  editTask?: TaskPublic | null;
}

export function TaskCreateForm({ open, onClose, editTask }: Props) {
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const [title, setTitle] = useState(editTask?.title ?? "");
  const [description, setDescription] = useState(editTask?.description ?? "");
  const [skills, setSkills] = useState<string[]>(
    editTask?.requiredSkills ?? [],
  );
  const [customSkill, setCustomSkill] = useState("");
  const [lat, setLat] = useState(editTask?.location?.lat.toString() ?? "");
  const [lng, setLng] = useState(editTask?.location?.lng.toString() ?? "");
  const [locationName, setLocationName] = useState(
    editTask?.location?.displayName ?? "",
  );
  const [deadline, setDeadline] = useState(() => {
    if (editTask) {
      return new Date(Number(editTask.deadline / 1_000_000n))
        .toISOString()
        .slice(0, 16);
    }
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().slice(0, 16);
  });
  const [priority, setPriority] = useState<TaskPriority>(
    editTask?.priority ?? TaskPriority.normal,
  );

  function toggleSkill(skill: string) {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  }

  function addCustomSkill() {
    const trimmed = customSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
      setCustomSkill("");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title is required");
    if (!deadline) return toast.error("Deadline is required");

    const input = {
      title: title.trim(),
      description: description.trim(),
      requiredSkills: skills,
      deadline: BigInt(new Date(deadline).getTime()) * 1_000_000n,
      priority,
      location:
        lat && lng && locationName
          ? {
              lat: Number.parseFloat(lat),
              lng: Number.parseFloat(lng),
              displayName: locationName,
            }
          : undefined,
    };

    try {
      if (editTask) {
        await updateTask.mutateAsync({ taskId: editTask.id, input });
        toast.success("Task updated successfully");
      } else {
        await createTask.mutateAsync(input);
        toast.success("Task created successfully");
      }
      onClose();
    } catch {
      toast.error("Failed to save task. Please try again.");
    }
  }

  const isPending = createTask.isPending || updateTask.isPending;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg overflow-y-auto"
        data-ocid="task-create.sheet"
      >
        <SheetHeader className="pb-4">
          <SheetTitle className="font-display text-lg">
            {editTask ? "Edit Task" : "Create New Task"}
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="task-title">Title *</Label>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Community Cleanup Drive"
              data-ocid="task-create.title_input"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="task-desc">Description</Label>
            <Textarea
              id="task-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the task in detail..."
              rows={3}
              data-ocid="task-create.description_textarea"
            />
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>Required Skills</Label>
            <div className="flex flex-wrap gap-1.5">
              {SKILL_OPTIONS.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`px-2.5 py-1 text-xs rounded-full border transition-smooth ${
                    skills.includes(skill)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border hover:border-primary/50"
                  }`}
                  data-ocid={`task-create.skill.${skill.toLowerCase()}`}
                >
                  {skill}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                placeholder="Add custom skill..."
                className="text-sm h-8"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCustomSkill();
                  }
                }}
                data-ocid="task-create.custom_skill_input"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addCustomSkill}
                data-ocid="task-create.add_skill_button"
              >
                Add
              </Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="flex items-center gap-1 px-2 py-0.5 text-xs bg-primary/10 text-primary border border-primary/30 rounded-full"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => toggleSkill(s)}
                      className="hover:text-destructive"
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="Display name (e.g. Central Park, NYC)"
              data-ocid="task-create.location_name_input"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="Latitude (e.g. 40.785)"
                type="number"
                step="any"
                data-ocid="task-create.lat_input"
              />
              <Input
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="Longitude (e.g. -73.968)"
                type="number"
                step="any"
                data-ocid="task-create.lng_input"
              />
            </div>
          </div>

          {/* Deadline */}
          <div className="space-y-1.5">
            <Label htmlFor="task-deadline">Deadline *</Label>
            <Input
              id="task-deadline"
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              data-ocid="task-create.deadline_input"
              required
            />
          </div>

          {/* Priority */}
          <div className="space-y-1.5">
            <Label>Priority</Label>
            <Select
              value={priority}
              onValueChange={(v) => setPriority(v as TaskPriority)}
            >
              <SelectTrigger data-ocid="task-create.priority_select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TaskPriority.normal}>Normal</SelectItem>
                <SelectItem value={TaskPriority.urgent}>🔴 Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="task-create.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isPending}
              data-ocid="task-create.submit_button"
            >
              {isPending
                ? "Saving..."
                : editTask
                  ? "Update Task"
                  : "Create Task"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
