import { c as createLucideIcon, i as useActor, a4 as useQuery, a5 as useQueryClient, a6 as useMutation, k as createActor, r as reactExports, j as jsxRuntimeExports, a7 as Building2, B as Button, ab as NGOStatus, I as Input, d as LoadingSpinner, h as ue } from "./index-D4bjddjr.js";
import { b as usePendingNGOs, c as useApproveNGO } from "./admin-BzL0N7YX.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, h as DialogDescription, i as DialogFooter } from "./dialog-DqdYP-o_.js";
import { T as Textarea } from "./textarea-BzQxctt9.js";
import { C as Calendar } from "./calendar-CdS3BWq4.js";
import { C as CircleCheckBig, T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DxzquryM.js";
import { C as CircleX } from "./circle-x-Bq10fIdH.js";
import { S as Search } from "./search-CyXTpNOG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode);
function useNGOs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["ngos"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listNGOs();
    },
    enabled: !!actor && !isFetching
  });
}
function useDeactivateNGO() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      if (!actor) throw new Error("No actor");
      return actor.deactivateNGO(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ngos"] });
    }
  });
}
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
const statusConfig = {
  [NGOStatus.pending]: {
    label: "Pending",
    className: "bg-accent/10 text-accent border-accent/30"
  },
  [NGOStatus.approved]: {
    label: "Approved",
    className: "bg-success/10 text-success border-success/30"
  },
  [NGOStatus.rejected]: {
    label: "Rejected",
    className: "bg-destructive/10 text-destructive border-destructive/30"
  }
};
function NGOApprovalCard({
  ngo,
  onApprove,
  onReject,
  onDeactivate,
  isPending = false,
  index
}) {
  const [rejectDialogOpen, setRejectDialogOpen] = reactExports.useState(false);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = reactExports.useState(false);
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const statusStyle = statusConfig[ngo.status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-elevated transition-smooth",
        "data-ocid": `ngo_card.item.${index}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm truncate", children: ngo.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: ngo.contactEmail })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `shrink-0 inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-md border ${statusStyle.className}`,
                children: statusStyle.label
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs line-clamp-2 mb-3", children: ngo.description || "No description provided." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Registered ",
              formatDate(ngo.createdAt)
            ] })
          ] }),
          isPending && onApprove && onReject && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "flex-1 bg-success/10 text-success hover:bg-success/20 border border-success/30",
                variant: "ghost",
                onClick: onApprove,
                "data-ocid": `ngo_card.approve_button.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 mr-1.5" }),
                  "Approve"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "flex-1 bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/30",
                variant: "ghost",
                onClick: () => setRejectDialogOpen(true),
                "data-ocid": `ngo_card.reject_button.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 mr-1.5" }),
                  "Reject"
                ]
              }
            )
          ] }),
          !isPending && ngo.isActive && onDeactivate && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "ghost",
              className: "w-full bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/30",
              onClick: () => setDeactivateDialogOpen(true),
              "data-ocid": `ngo_card.delete_button.${index}`,
              children: "Suspend NGO"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: rejectDialogOpen, onOpenChange: setRejectDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "ngo_reject.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Reject NGO Application" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          "Provide a reason for rejecting ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: ngo.name }),
          ". This will be recorded."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          placeholder: "Enter rejection reason...",
          value: rejectReason,
          onChange: (e) => setRejectReason(e.target.value),
          className: "min-h-[100px]",
          "data-ocid": "ngo_reject.textarea"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            onClick: () => setRejectDialogOpen(false),
            "data-ocid": "ngo_reject.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "destructive",
            onClick: () => {
              onReject == null ? void 0 : onReject(rejectReason);
              setRejectDialogOpen(false);
              setRejectReason("");
            },
            disabled: !rejectReason.trim(),
            "data-ocid": "ngo_reject.confirm_button",
            children: "Confirm Reject"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: deactivateDialogOpen,
        onOpenChange: setDeactivateDialogOpen,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "ngo_deactivate.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Suspend NGO" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
              "Are you sure you want to suspend ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: ngo.name }),
              "? This will deactivate their account."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                onClick: () => setDeactivateDialogOpen(false),
                "data-ocid": "ngo_deactivate.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "destructive",
                onClick: () => {
                  onDeactivate == null ? void 0 : onDeactivate();
                  setDeactivateDialogOpen(false);
                },
                "data-ocid": "ngo_deactivate.confirm_button",
                children: "Confirm Suspend"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function AdminNGOsPage() {
  const { data: pendingNGOs = [], isLoading: pendingLoading } = usePendingNGOs();
  const { data: allNGOs = [], isLoading: allLoading } = useNGOs();
  const approveNGO = useApproveNGO();
  const deactivateNGO = useDeactivateNGO();
  const [search, setSearch] = reactExports.useState("");
  const approvedNGOs = allNGOs.filter((n) => n.status === NGOStatus.approved);
  const rejectedNGOs = allNGOs.filter((n) => n.status === NGOStatus.rejected);
  const isLoading = pendingLoading || allLoading;
  function filterBySearch(list) {
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (n) => n.name.toLowerCase().includes(q) || n.contactEmail.toLowerCase().includes(q)
    );
  }
  const filteredPending = filterBySearch(pendingNGOs);
  const filteredApproved = filterBySearch(approvedNGOs);
  const filteredRejected = filterBySearch(rejectedNGOs);
  function handleApprove(ngo) {
    approveNGO.mutate(
      { userId: ngo.id, approve: true },
      {
        onSuccess: () => ue.success(`${ngo.name} has been approved`),
        onError: () => ue.error("Failed to approve NGO")
      }
    );
  }
  function handleReject(ngo, _reason) {
    approveNGO.mutate(
      { userId: ngo.id, approve: false },
      {
        onSuccess: () => ue.success(`${ngo.name} has been rejected`),
        onError: () => ue.error("Failed to reject NGO")
      }
    );
  }
  function handleDeactivate(ngo) {
    deactivateNGO.mutate(ngo.id, {
      onSuccess: () => ue.success(`${ngo.name} has been suspended`),
      onError: () => ue.error("Failed to suspend NGO")
    });
  }
  function NGOGrid({
    list,
    variant
  }) {
    if (isLoading) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex justify-center py-16",
          "data-ocid": "ngos.loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md", label: "Loading NGOs..." })
        }
      );
    }
    if (!list.length) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center py-16 text-center",
          "data-ocid": "ngos.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-6 h-6 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground", children: "No NGOs found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1", children: search ? "Try adjusting your search" : "Nothing here yet" })
          ]
        }
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4", children: list.map((ngo, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      NGOApprovalCard,
      {
        ngo,
        index: i + 1,
        isPending: variant === "pending",
        onApprove: variant === "pending" ? () => handleApprove(ngo) : void 0,
        onReject: variant === "pending" ? (reason) => handleReject(ngo) : void 0,
        onDeactivate: variant === "approved" ? () => handleDeactivate(ngo) : void 0
      },
      ngo.id.toString()
    )) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-6 max-w-7xl mx-auto space-y-6",
      "data-ocid": "admin_ngos.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "NGO Management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Review applications, approve or reject NGO registrations" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search NGOs...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9",
              "data-ocid": "admin_ngos.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "pending", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "pending", "data-ocid": "admin_ngos.pending.tab", children: [
              "Pending",
              filteredPending.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-destructive text-destructive-foreground", children: filteredPending.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "approved", "data-ocid": "admin_ngos.approved.tab", children: [
              "Approved",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-muted-foreground text-xs", children: [
                "(",
                filteredApproved.length,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "rejected", "data-ocid": "admin_ngos.rejected.tab", children: [
              "Rejected",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-muted-foreground text-xs", children: [
                "(",
                filteredRejected.length,
                ")"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pending", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NGOGrid, { list: filteredPending, variant: "pending" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "approved", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NGOGrid, { list: filteredApproved, variant: "approved" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "rejected", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NGOGrid, { list: filteredRejected, variant: "other" }) })
        ] })
      ]
    }
  );
}
export {
  AdminNGOsPage as default
};
