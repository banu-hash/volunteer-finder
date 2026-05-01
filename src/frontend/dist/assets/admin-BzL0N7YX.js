import { i as useActor, a4 as useQuery, a5 as useQueryClient, a6 as useMutation, k as createActor } from "./index-D4bjddjr.js";
function usePlatformStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["platformStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPlatformStats();
    },
    enabled: !!actor && !isFetching
  });
}
function useActivityLog() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["activityLog"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActivityLog();
    },
    enabled: !!actor && !isFetching
  });
}
function usePendingNGOs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["pendingNGOs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPendingNGOs();
    },
    enabled: !!actor && !isFetching
  });
}
function useApproveNGO() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      approve
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.approveNGO(userId, approve);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingNGOs"] });
      queryClient.invalidateQueries({ queryKey: ["ngos"] });
    }
  });
}
function useAssignUserRole() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      role
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.assignUserRole(userId, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
      queryClient.invalidateQueries({ queryKey: ["ngos"] });
    }
  });
}
export {
  useActivityLog as a,
  usePendingNGOs as b,
  useApproveNGO as c,
  useAssignUserRole as d,
  usePlatformStats as u
};
