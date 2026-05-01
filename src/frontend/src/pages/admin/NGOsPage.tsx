import { useApproveNGO, usePendingNGOs } from "@/api/admin";
import { useDeactivateNGO, useNGOs } from "@/api/ngo";
import { NGOApprovalCard } from "@/components/admin/NGOApprovalCard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NGOStatus } from "@/types";
import type { NGOProfilePublic } from "@/types";
import { Building2, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminNGOsPage() {
  const { data: pendingNGOs = [], isLoading: pendingLoading } =
    usePendingNGOs();
  const { data: allNGOs = [], isLoading: allLoading } = useNGOs();
  const approveNGO = useApproveNGO();
  const deactivateNGO = useDeactivateNGO();
  const [search, setSearch] = useState("");

  const approvedNGOs = allNGOs.filter((n) => n.status === NGOStatus.approved);
  const rejectedNGOs = allNGOs.filter((n) => n.status === NGOStatus.rejected);
  const isLoading = pendingLoading || allLoading;

  function filterBySearch(list: NGOProfilePublic[]) {
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (n) =>
        n.name.toLowerCase().includes(q) ||
        n.contactEmail.toLowerCase().includes(q),
    );
  }

  const filteredPending = filterBySearch(pendingNGOs);
  const filteredApproved = filterBySearch(approvedNGOs);
  const filteredRejected = filterBySearch(rejectedNGOs);

  function handleApprove(ngo: NGOProfilePublic) {
    approveNGO.mutate(
      { userId: ngo.id, approve: true },
      {
        onSuccess: () => toast.success(`${ngo.name} has been approved`),
        onError: () => toast.error("Failed to approve NGO"),
      },
    );
  }

  function handleReject(ngo: NGOProfilePublic, _reason: string) {
    approveNGO.mutate(
      { userId: ngo.id, approve: false },
      {
        onSuccess: () => toast.success(`${ngo.name} has been rejected`),
        onError: () => toast.error("Failed to reject NGO"),
      },
    );
  }

  function handleDeactivate(ngo: NGOProfilePublic) {
    deactivateNGO.mutate(ngo.id, {
      onSuccess: () => toast.success(`${ngo.name} has been suspended`),
      onError: () => toast.error("Failed to suspend NGO"),
    });
  }

  function NGOGrid({
    list,
    variant,
  }: { list: NGOProfilePublic[]; variant: "pending" | "approved" | "other" }) {
    if (isLoading) {
      return (
        <div
          className="flex justify-center py-16"
          data-ocid="ngos.loading_state"
        >
          <LoadingSpinner size="md" label="Loading NGOs..." />
        </div>
      );
    }
    if (!list.length) {
      return (
        <div
          className="flex flex-col items-center py-16 text-center"
          data-ocid="ngos.empty_state"
        >
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3">
            <Building2 className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-sm text-foreground">No NGOs found</p>
          <p className="text-muted-foreground text-xs mt-1">
            {search ? "Try adjusting your search" : "Nothing here yet"}
          </p>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {list.map((ngo, i) => (
          <NGOApprovalCard
            key={ngo.id.toString()}
            ngo={ngo}
            index={i + 1}
            isPending={variant === "pending"}
            onApprove={
              variant === "pending" ? () => handleApprove(ngo) : undefined
            }
            onReject={
              variant === "pending"
                ? (reason) => handleReject(ngo, reason)
                : undefined
            }
            onDeactivate={
              variant === "approved" ? () => handleDeactivate(ngo) : undefined
            }
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className="p-6 max-w-7xl mx-auto space-y-6"
      data-ocid="admin_ngos.page"
    >
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          NGO Management
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Review applications, approve or reject NGO registrations
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search NGOs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          data-ocid="admin_ngos.search_input"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending">
        <TabsList className="mb-6">
          <TabsTrigger value="pending" data-ocid="admin_ngos.pending.tab">
            Pending
            {filteredPending.length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-destructive text-destructive-foreground">
                {filteredPending.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved" data-ocid="admin_ngos.approved.tab">
            Approved
            <span className="ml-2 text-muted-foreground text-xs">
              ({filteredApproved.length})
            </span>
          </TabsTrigger>
          <TabsTrigger value="rejected" data-ocid="admin_ngos.rejected.tab">
            Rejected
            <span className="ml-2 text-muted-foreground text-xs">
              ({filteredRejected.length})
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <NGOGrid list={filteredPending} variant="pending" />
        </TabsContent>
        <TabsContent value="approved">
          <NGOGrid list={filteredApproved} variant="approved" />
        </TabsContent>
        <TabsContent value="rejected">
          <NGOGrid list={filteredRejected} variant="other" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
