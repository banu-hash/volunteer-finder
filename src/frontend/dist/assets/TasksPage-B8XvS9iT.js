import { c as createLucideIcon, j as jsxRuntimeExports, K as Avatar, N as AvatarFallback, M as MapPin, B as Button, h as ue, r as reactExports, F as Label, X, a as cn, l as TaskPriority, I as Input, o as useComposedRefs, n as composeEventHandlers, O as createSlottable, v as createContextScope, Q as buttonVariants, T as TaskStatus, C as ClipboardList, S as DropdownMenu, V as DropdownMenuTrigger, W as DropdownMenuContent, Y as DropdownMenuItem } from "./index-D4bjddjr.js";
import { f as useAssignVolunteer, g as useVerifyTask, h as useCreateTask, i as useUpdateTask, e as useMyNGOTasks, j as useDeleteTask } from "./tasks-7B4Gj8SA.js";
import { b as useTopVolunteers } from "./volunteers-DGSeelEA.js";
import { M as MatchScoreBadge } from "./MatchScoreBadge-I1ajIjKO.js";
import { S as SkillTag } from "./SkillTag-CgRS11xk.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, R as Root, C as Content, d as Close, T as Title, P as Portal, O as Overlay, W as WarningProvider, e as Description, f as createDialogScope, g as Trigger } from "./dialog-DqdYP-o_.js";
import { S as Skeleton } from "./skeleton-BvS_Zcv3.js";
import { S as Star } from "./star-Cm4lNMeQ.js";
import { T as Textarea } from "./textarea-BzQxctt9.js";
import { C as CircleX } from "./circle-x-Bq10fIdH.js";
import { C as CircleCheckBig, T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-DxzquryM.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-NY3S6kgM.js";
import { P as PriorityBadge, S as StatusBadge } from "./StatusBadge-DX9GDhWP.js";
import { P as Plus } from "./plus-CGiSCtCP.js";
import { S as Search } from "./search-CyXTpNOG.js";
import { C as Calendar } from "./calendar-CdS3BWq4.js";
import { f as format } from "./format-d5MMsb9-.js";
import "./trending-up-B8guMjXx.js";
import "./index-DSMb5Lro.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
];
const Bot = createLucideIcon("bot", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
];
const EllipsisVertical = createLucideIcon("ellipsis-vertical", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5", key: "1uzm8b" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const SquareCheckBig = createLucideIcon("square-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function AISuggestionModal({ task, open, onClose }) {
  const { data: topVolunteers = [], isLoading } = useTopVolunteers(
    open && task ? task.id : null,
    5n
  );
  const assignVolunteer = useAssignVolunteer();
  async function handleAssign(volunteerId) {
    if (!task) return;
    try {
      await assignVolunteer.mutateAsync({ taskId: task.id, volunteerId });
      ue.success("Volunteer assigned successfully!");
      onClose();
    } catch {
      ue.error("Failed to assign volunteer. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-lg max-h-[80vh] overflow-y-auto",
      "data-ocid": "ai-suggestion.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 18, className: "text-primary" }),
            "AI Volunteer Suggestions"
          ] }),
          task && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Top matches for:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: task.title })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mt-2", "data-ocid": "ai-suggestion.list", children: isLoading ? ["s1", "s2", "s3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-lg" }, k)) : topVolunteers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center py-8 text-muted-foreground text-sm",
            "data-ocid": "ai-suggestion.empty_state",
            children: "No matching volunteers found for this task."
          }
        ) : topVolunteers.map(({ profile, matchScore }, i) => {
          const initials = profile.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border hover:border-primary/30 transition-smooth",
              "data-ocid": `ai-suggestion.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-muted-foreground w-4 flex-shrink-0", children: [
                  "#",
                  i + 1
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-9 w-9 flex-shrink-0", children: profile.profilePhoto ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: profile.profilePhoto.getDirectURL(),
                    alt: profile.name,
                    className: "h-full w-full object-cover rounded-full"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/10 text-primary text-xs font-bold", children: initials }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: profile.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mt-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 10, className: "text-accent fill-accent" }),
                      profile.rating.toFixed(1)
                    ] }),
                    profile.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 10 }),
                      profile.location.displayName
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: profile.skills.slice(0, 3).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillTag, { skill: s }, s)) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MatchScoreBadge, { score: matchScore, size: "sm" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      className: "h-7 text-xs px-3",
                      onClick: () => handleAssign(profile.id),
                      disabled: assignVolunteer.isPending,
                      "data-ocid": `ai-suggestion.assign_button.${i + 1}`,
                      children: "Assign"
                    }
                  )
                ] })
              ]
            },
            profile.id.toString()
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: onClose,
            "data-ocid": "ai-suggestion.close_button",
            children: "Close"
          }
        ) })
      ]
    }
  ) });
}
function ProofReviewPanel({ task, open, onClose }) {
  const verifyTask = useVerifyTask();
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const [showRejectForm, setShowRejectForm] = reactExports.useState(false);
  const [selectedImage, setSelectedImage] = reactExports.useState(null);
  async function handleVerify(approved) {
    if (!task) return;
    try {
      await verifyTask.mutateAsync({ taskId: task.id, approved });
      ue.success(
        approved ? "Task verified and approved!" : "Task completion rejected."
      );
      onClose();
    } catch {
      ue.error("Failed to update task. Please try again.");
    }
  }
  if (!task) return null;
  const proofs = task.proofUrls;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-2xl max-h-[85vh] overflow-y-auto",
      "data-ocid": "proof-review.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Review Completion Proof" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Task:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: task.title })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: proofs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-10 border border-dashed border-border rounded-lg text-muted-foreground gap-2",
            "data-ocid": "proof-review.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 32, className: "opacity-40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No proof uploads yet" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
            proofs.length,
            " proof file",
            proofs.length !== 1 ? "s" : "",
            " ",
            "uploaded"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: proofs.map((proof, i) => {
            const url = proof.getDirectURL();
            const ocid = `proof-review.item.${i + 1}`;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "relative group rounded-lg overflow-hidden bg-muted aspect-video border border-border hover:border-primary/50 transition-smooth w-full",
                onClick: () => setSelectedImage(url),
                "aria-label": `View proof ${i + 1}`,
                "data-ocid": ocid,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: url,
                      alt: `Proof ${i + 1}`,
                      className: "w-full h-full object-cover",
                      onError: (e) => {
                        e.target.style.display = "none";
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute bottom-1 right-1 text-xs bg-background/80 px-1.5 py-0.5 rounded", children: [
                    "#",
                    i + 1
                  ] })
                ]
              },
              url
            );
          }) })
        ] }) }),
        selectedImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "fixed inset-0 z-50 bg-background/90 flex items-center justify-center p-4 w-full",
            onClick: () => setSelectedImage(null),
            "aria-label": "Close image preview",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: selectedImage,
                alt: "Proof full view",
                className: "max-w-full max-h-full object-contain rounded-lg shadow-elevated"
              }
            )
          }
        ),
        showRejectForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-3 bg-destructive/5 border border-destructive/20 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-destructive text-sm font-medium", children: "Rejection reason (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: rejectReason,
              onChange: (e) => setRejectReason(e.target.value),
              placeholder: "Explain why the proof is insufficient...",
              rows: 3,
              "data-ocid": "proof-review.reject_reason_textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "flex-1",
              onClick: onClose,
              "data-ocid": "proof-review.cancel_button",
              children: "Cancel"
            }
          ),
          !showRejectForm ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "flex-1 text-destructive border-destructive/40 hover:bg-destructive/10",
                onClick: () => setShowRejectForm(true),
                "data-ocid": "proof-review.reject_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 14, className: "mr-1.5" }),
                  "Reject"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "flex-1 bg-success text-success-foreground hover:bg-success/90",
                onClick: () => handleVerify(true),
                disabled: verifyTask.isPending,
                "data-ocid": "proof-review.approve_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 14, className: "mr-1.5" }),
                  verifyTask.isPending ? "Approving..." : "Approve"
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90",
              onClick: () => handleVerify(false),
              disabled: verifyTask.isPending,
              "data-ocid": "proof-review.confirm_button",
              children: verifyTask.isPending ? "Rejecting..." : "Confirm Rejection"
            }
          )
        ] })
      ]
    }
  ) });
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "sheet", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
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
  "Elder Care"
];
function TaskCreateForm({ open, onClose, editTask }) {
  var _a, _b, _c;
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const [title, setTitle] = reactExports.useState((editTask == null ? void 0 : editTask.title) ?? "");
  const [description, setDescription] = reactExports.useState((editTask == null ? void 0 : editTask.description) ?? "");
  const [skills, setSkills] = reactExports.useState(
    (editTask == null ? void 0 : editTask.requiredSkills) ?? []
  );
  const [customSkill, setCustomSkill] = reactExports.useState("");
  const [lat, setLat] = reactExports.useState(((_a = editTask == null ? void 0 : editTask.location) == null ? void 0 : _a.lat.toString()) ?? "");
  const [lng, setLng] = reactExports.useState(((_b = editTask == null ? void 0 : editTask.location) == null ? void 0 : _b.lng.toString()) ?? "");
  const [locationName, setLocationName] = reactExports.useState(
    ((_c = editTask == null ? void 0 : editTask.location) == null ? void 0 : _c.displayName) ?? ""
  );
  const [deadline, setDeadline] = reactExports.useState(() => {
    if (editTask) {
      return new Date(Number(editTask.deadline / 1000000n)).toISOString().slice(0, 16);
    }
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().slice(0, 16);
  });
  const [priority, setPriority] = reactExports.useState(
    (editTask == null ? void 0 : editTask.priority) ?? TaskPriority.normal
  );
  function toggleSkill(skill) {
    setSkills(
      (prev) => prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  }
  function addCustomSkill() {
    const trimmed = customSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
      setCustomSkill("");
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return ue.error("Title is required");
    if (!deadline) return ue.error("Deadline is required");
    const input = {
      title: title.trim(),
      description: description.trim(),
      requiredSkills: skills,
      deadline: BigInt(new Date(deadline).getTime()) * 1000000n,
      priority,
      location: lat && lng && locationName ? {
        lat: Number.parseFloat(lat),
        lng: Number.parseFloat(lng),
        displayName: locationName
      } : void 0
    };
    try {
      if (editTask) {
        await updateTask.mutateAsync({ taskId: editTask.id, input });
        ue.success("Task updated successfully");
      } else {
        await createTask.mutateAsync(input);
        ue.success("Task created successfully");
      }
      onClose();
    } catch {
      ue.error("Failed to save task. Please try again.");
    }
  }
  const isPending = createTask.isPending || updateTask.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SheetContent,
    {
      side: "right",
      className: "w-full sm:max-w-lg overflow-y-auto",
      "data-ocid": "task-create.sheet",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display text-lg", children: editTask ? "Edit Task" : "Create New Task" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "task-title", children: "Title *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "task-title",
                value: title,
                onChange: (e) => setTitle(e.target.value),
                placeholder: "Community Cleanup Drive",
                "data-ocid": "task-create.title_input",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "task-desc", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "task-desc",
                value: description,
                onChange: (e) => setDescription(e.target.value),
                placeholder: "Describe the task in detail...",
                rows: 3,
                "data-ocid": "task-create.description_textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Required Skills" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: SKILL_OPTIONS.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => toggleSkill(skill),
                className: `px-2.5 py-1 text-xs rounded-full border transition-smooth ${skills.includes(skill) ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border hover:border-primary/50"}`,
                "data-ocid": `task-create.skill.${skill.toLowerCase()}`,
                children: skill
              },
              skill
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: customSkill,
                  onChange: (e) => setCustomSkill(e.target.value),
                  placeholder: "Add custom skill...",
                  className: "text-sm h-8",
                  onKeyDown: (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomSkill();
                    }
                  },
                  "data-ocid": "task-create.custom_skill_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: addCustomSkill,
                  "data-ocid": "task-create.add_skill_button",
                  children: "Add"
                }
              )
            ] }),
            skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: skills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "flex items-center gap-1 px-2 py-0.5 text-xs bg-primary/10 text-primary border border-primary/30 rounded-full",
                children: [
                  s,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => toggleSkill(s),
                      className: "hover:text-destructive",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 10 })
                    }
                  )
                ]
              },
              s
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: locationName,
                onChange: (e) => setLocationName(e.target.value),
                placeholder: "Display name (e.g. Central Park, NYC)",
                "data-ocid": "task-create.location_name_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: lat,
                  onChange: (e) => setLat(e.target.value),
                  placeholder: "Latitude (e.g. 40.785)",
                  type: "number",
                  step: "any",
                  "data-ocid": "task-create.lat_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: lng,
                  onChange: (e) => setLng(e.target.value),
                  placeholder: "Longitude (e.g. -73.968)",
                  type: "number",
                  step: "any",
                  "data-ocid": "task-create.lng_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "task-deadline", children: "Deadline *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "task-deadline",
                type: "datetime-local",
                value: deadline,
                onChange: (e) => setDeadline(e.target.value),
                "data-ocid": "task-create.deadline_input",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Priority" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: priority,
                onValueChange: (v) => setPriority(v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "task-create.priority_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: TaskPriority.normal, children: "Normal" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: TaskPriority.urgent, children: "🔴 Urgent" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "flex-1",
                onClick: onClose,
                "data-ocid": "task-create.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "flex-1",
                disabled: isPending,
                "data-ocid": "task-create.submit_button",
                children: isPending ? "Saving..." : editTask ? "Update Task" : "Create Task"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: TaskStatus.pending, label: "Pending" },
  { value: TaskStatus.accepted, label: "Accepted" },
  { value: TaskStatus.completed, label: "Completed" },
  { value: TaskStatus.verified, label: "Verified" }
];
function TaskRow({
  task,
  index,
  onEdit,
  onAI,
  onProof,
  onDelete
}) {
  const deadline = new Date(Number(task.deadline / 1000000n));
  const isExpired = deadline < /* @__PURE__ */ new Date();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-smooth",
      "data-ocid": `ngo-tasks.item.${index}`,
      children: [
        task.priority === TaskPriority.urgent && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block w-1 h-12 bg-accent rounded-full flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-tight", children: task.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PriorityBadge, { priority: task.priority }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: task.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `flex items-center gap-1 ${isExpired ? "text-destructive" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 11 }),
                  format(deadline, "MMM d, yyyy")
                ]
              }
            ),
            task.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 11 }),
              task.location.displayName
            ] })
          ] }),
          task.requiredSkills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
            task.requiredSkills.slice(0, 4).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillTag, { skill: s }, s)),
            task.requiredSkills.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "+",
              task.requiredSkills.length - 4
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
          task.status === TaskStatus.pending && !task.assignedVolunteer && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "text-xs h-8 gap-1 text-primary border-primary/40 hover:bg-primary/10",
              onClick: () => onAI(task),
              "data-ocid": `ngo-tasks.ai_suggest_button.${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 12 }),
                "AI Assign"
              ]
            }
          ),
          task.status === TaskStatus.completed && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "text-xs h-8 gap-1 text-success border-success/40 hover:bg-success/10",
              onClick: () => onProof(task),
              "data-ocid": `ngo-tasks.review_button.${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { size: 12 }),
                "Review"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-8 w-8 p-0",
                "data-ocid": `ngo-tasks.menu_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { size: 14 })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  onClick: () => onEdit(task),
                  "data-ocid": `ngo-tasks.edit_button.${index}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 13, className: "mr-2" }),
                    "Edit"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  className: "text-destructive focus:text-destructive",
                  onClick: () => onDelete(task),
                  "data-ocid": `ngo-tasks.delete_button.${index}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13, className: "mr-2" }),
                    "Delete"
                  ]
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
function TasksPage() {
  const { data: tasks = [], isLoading } = useMyNGOTasks();
  const deleteTask = useDeleteTask();
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const [editTask, setEditTask] = reactExports.useState(null);
  const [aiTask, setAiTask] = reactExports.useState(null);
  const [proofTask, setProofTask] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const filtered = reactExports.useMemo(() => {
    return tasks.filter((t) => statusFilter === "all" || t.status === statusFilter).filter(
      (t) => !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => Number(b.createdAt - a.createdAt));
  }, [tasks, statusFilter, search]);
  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteTask.mutateAsync(deleteTarget.id);
      ue.success("Task deleted.");
      setDeleteTarget(null);
    } catch {
      ue.error("Failed to delete task.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-4 md:p-6", "data-ocid": "ngo-tasks.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Task Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
          tasks.length,
          " total task",
          tasks.length !== 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setCreateOpen(true),
          className: "gap-2",
          "data-ocid": "ngo-tasks.create_task_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15 }),
            "Create Task"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Search,
        {
          size: 14,
          className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Search tasks...",
          className: "pl-9",
          "data-ocid": "ngo-tasks.search_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tabs,
      {
        value: statusFilter,
        onValueChange: (v) => setStatusFilter(v),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsList,
          {
            className: "w-full sm:w-auto overflow-x-auto",
            "data-ocid": "ngo-tasks.status_tabs",
            children: STATUS_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: tab.value,
                className: "text-xs",
                "data-ocid": `ngo-tasks.tab.${tab.value}`,
                children: [
                  tab.label,
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-muted-foreground", children: [
                    "(",
                    tab.value === "all" ? tasks.length : tasks.filter((t) => t.status === tab.value).length,
                    ")"
                  ] })
                ]
              },
              tab.value
            ))
          }
        )
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["t1", "t2", "t3", "t4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-14 border border-dashed border-border rounded-xl text-muted-foreground",
        "data-ocid": "ngo-tasks.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 32, className: "mx-auto mb-2 opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No tasks found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: search ? "Try adjusting your search" : "Create your first task to get started" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((task, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TaskRow,
      {
        task,
        index: i + 1,
        onEdit: (t) => setEditTask(t),
        onAI: (t) => setAiTask(t),
        onProof: (t) => setProofTask(t),
        onDelete: (t) => setDeleteTarget(t)
      },
      task.id.toString()
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TaskCreateForm,
      {
        open: createOpen || !!editTask,
        onClose: () => {
          setCreateOpen(false);
          setEditTask(null);
        },
        editTask
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AISuggestionModal,
      {
        task: aiTask,
        open: !!aiTask,
        onClose: () => setAiTask(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProofReviewPanel,
      {
        task: proofTask,
        open: !!proofTask,
        onClose: () => setProofTask(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteTarget,
        onOpenChange: (v) => !v && setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "ngo-tasks.delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Task" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              'Are you sure you want to delete "',
              deleteTarget == null ? void 0 : deleteTarget.title,
              '"? This action cannot be undone.'
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "ngo-tasks.delete_cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: confirmDelete,
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                "data-ocid": "ngo-tasks.delete_confirm_button",
                children: "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  TasksPage as default
};
