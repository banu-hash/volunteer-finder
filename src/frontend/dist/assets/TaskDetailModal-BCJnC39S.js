import { c as createLucideIcon, r as reactExports, i as useActor, j as jsxRuntimeExports, X, B as Button, h as ue, E as ExternalBlob, k as createActor, l as TaskPriority, T as TaskStatus, M as MapPin } from "./index-D4bjddjr.js";
import { b as useAcceptTask, c as useRejectTask } from "./tasks-7B4Gj8SA.js";
import { M as MatchScoreBadge } from "./MatchScoreBadge-I1ajIjKO.js";
import { S as SkillTag } from "./SkillTag-CgRS11xk.js";
import { P as PriorityBadge, S as StatusBadge } from "./StatusBadge-DX9GDhWP.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DqdYP-o_.js";
import { S as Separator } from "./separator-D6m2xMYb.js";
import { C as CircleCheckBig } from "./tabs-DxzquryM.js";
import { C as Calendar } from "./calendar-CdS3BWq4.js";
import { f as format } from "./format-d5MMsb9-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function ProofUploadForm({
  taskId,
  onSuccess,
  onCancel
}) {
  const [files, setFiles] = reactExports.useState([]);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const { actor } = useActor(createActor);
  function handleFileSelect(e) {
    const selected = Array.from(e.target.files ?? []);
    const newItems = selected.map((f) => ({
      file: f,
      name: f.name,
      progress: 0,
      done: false
    }));
    setFiles((prev) => [...prev, ...newItems]);
    e.target.value = "";
  }
  function removeFile(idx) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }
  async function uploadAll() {
    const blobs = [];
    for (let i = 0; i < files.length; i++) {
      const item = files[i];
      const bytes = new Uint8Array(await item.file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setFiles(
          (prev) => prev.map((f, idx) => idx === i ? { ...f, progress: pct } : f)
        );
      });
      blobs.push(blob);
      setFiles(
        (prev) => prev.map((f, idx) => idx === i ? { ...f, done: true, blob } : f)
      );
    }
    return blobs;
  }
  async function handleSubmit() {
    if (!actor) return ue.error("Not connected to backend");
    if (files.length === 0)
      return ue.error("Please add at least one proof file");
    setSubmitting(true);
    try {
      const blobs = await uploadAll();
      const ok = await actor.markTaskCompleted(taskId, blobs);
      if (ok) {
        ue.success("Task marked as completed with proof!");
        onSuccess();
      } else {
        ue.error("Failed to submit completion");
      }
    } catch {
      ue.error("Error submitting proof");
    } finally {
      setSubmitting(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "space-y-3 border border-border rounded-xl p-4 bg-muted/30",
      "data-ocid": "proof.upload_form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Upload Proof" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Upload images or videos as proof of task completion." }),
        files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: files.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2",
            "data-ocid": `proof.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium truncate text-foreground", children: f.name }),
                !f.done && f.progress > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-1 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "bg-primary h-1 rounded-full transition-all",
                    style: { width: `${f.progress}%` }
                  }
                ) }),
                f.done && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-success flex items-center gap-1 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 10 }),
                  " Uploaded"
                ] })
              ] }),
              !submitting && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeFile(i),
                  className: "text-muted-foreground hover:text-destructive transition-colors p-0.5",
                  "aria-label": "Remove file",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
                }
              )
            ]
          },
          `${f.name}-${i}`
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: inputRef,
            type: "file",
            multiple: true,
            accept: "image/*,video/*",
            className: "hidden",
            onChange: handleFileSelect
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "w-full border-dashed",
            onClick: () => {
              var _a;
              return (_a = inputRef.current) == null ? void 0 : _a.click();
            },
            disabled: submitting,
            "data-ocid": "proof.upload_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 14, className: "mr-1.5" }),
              "Add Files"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "flex-1",
              onClick: handleSubmit,
              disabled: submitting || files.length === 0,
              "data-ocid": "proof.submit_button",
              children: submitting ? "Submitting..." : "Submit Proof"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              onClick: onCancel,
              disabled: submitting,
              "data-ocid": "proof.cancel_button",
              children: "Cancel"
            }
          )
        ] })
      ]
    }
  );
}
function TaskDetailModal({
  taskWithScore,
  task: taskProp,
  open,
  onClose,
  onProofSubmitted
}) {
  const task = (taskWithScore == null ? void 0 : taskWithScore.task) ?? taskProp;
  const matchScore = taskWithScore == null ? void 0 : taskWithScore.matchScore;
  const [showProofForm, setShowProofForm] = reactExports.useState(false);
  const acceptTask = useAcceptTask();
  const rejectTask = useRejectTask();
  if (!task) return null;
  const deadline = new Date(Number(task.deadline / 1000000n));
  const isUrgent = task.priority === TaskPriority.urgent;
  const isAccepted = task.status === TaskStatus.accepted;
  const isPending = task.status === TaskStatus.pending;
  async function handleAccept() {
    if (!task) return;
    try {
      await acceptTask.mutateAsync(task.id);
      ue.success("Task accepted successfully!");
      onClose();
    } catch {
      ue.error("Failed to accept task");
    }
  }
  async function handleReject() {
    if (!task) return;
    try {
      await rejectTask.mutateAsync(task.id);
      ue.success("Task rejected");
      onClose();
    } catch {
      ue.error("Failed to reject task");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-lg max-h-[90vh] overflow-y-auto",
      "data-ocid": "task.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-3 pr-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            isUrgent && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 bg-accent rounded-full mb-3 -mt-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-lg leading-snug", children: task.title })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PriorityBadge, { priority: task.priority }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: task.status }),
            matchScore !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(MatchScoreBadge, { score: matchScore, size: "sm" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 text-sm text-muted-foreground", children: [
            task.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, className: "text-primary" }),
              task.location.displayName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14, className: "text-primary" }),
              "Deadline: ",
              format(deadline, "MMM d, yyyy")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: task.description || "No description provided." })
          ] }),
          task.requiredSkills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Required Skills" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: task.requiredSkills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillTag, { skill: s, variant: "outline" }, s)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 pt-1", children: [
          isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "flex-1",
                onClick: handleAccept,
                disabled: acceptTask.isPending,
                "data-ocid": "task.confirm_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 15, className: "mr-1.5" }),
                  acceptTask.isPending ? "Accepting..." : "Accept Task"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: handleReject,
                disabled: rejectTask.isPending,
                "data-ocid": "task.cancel_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 15, className: "mr-1.5" }),
                  rejectTask.isPending ? "Rejecting..." : "Reject"
                ]
              }
            )
          ] }),
          isAccepted && !showProofForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "w-full",
              onClick: () => setShowProofForm(true),
              "data-ocid": "task.mark_complete_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 15, className: "mr-1.5" }),
                "Mark as Completed"
              ]
            }
          ),
          isAccepted && showProofForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProofUploadForm,
            {
              taskId: task.id,
              onSuccess: () => {
                setShowProofForm(false);
                onProofSubmitted == null ? void 0 : onProofSubmitted();
                onClose();
              },
              onCancel: () => setShowProofForm(false)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              onClick: onClose,
              className: "text-muted-foreground",
              "data-ocid": "task.close_button",
              children: "Close"
            }
          )
        ] })
      ]
    }
  ) });
}
export {
  TaskDetailModal as T
};
