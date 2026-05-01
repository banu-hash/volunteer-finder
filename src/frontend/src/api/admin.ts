import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePlatformStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["platformStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPlatformStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useActivityLog() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["activityLog"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActivityLog();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePendingNGOs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["pendingNGOs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPendingNGOs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useApproveNGO() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      approve,
    }: { userId: Principal; approve: boolean }) => {
      if (!actor) throw new Error("No actor");
      return actor.approveNGO(userId, approve);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingNGOs"] });
      queryClient.invalidateQueries({ queryKey: ["ngos"] });
    },
  });
}

export function useAssignUserRole() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      role,
    }: {
      userId: Principal;
      role: import("@/backend").UserRole__1;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.assignUserRole(userId, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
      queryClient.invalidateQueries({ queryKey: ["ngos"] });
    },
  });
}
