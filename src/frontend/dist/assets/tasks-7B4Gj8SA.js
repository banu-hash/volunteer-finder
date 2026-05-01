import { i as useActor, a4 as useQuery, a5 as useQueryClient, a6 as useMutation, k as createActor } from "./index-D4bjddjr.js";
function useAllTasks() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["tasks", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllTasks();
    },
    enabled: !!actor && !isFetching
  });
}
function useMyNGOTasks() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["tasks", "ngo"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyNGOTasks();
    },
    enabled: !!actor && !isFetching
  });
}
function useMyVolunteerTasks() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["tasks", "volunteer"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyVolunteerTasks();
    },
    enabled: !!actor && !isFetching
  });
}
function useRecommendedTasks(limit = 6n) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["tasks", "recommended"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyRecommendedTasks(limit);
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateTask() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("No actor");
      return actor.createTask(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
}
function useUpdateTask() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      taskId,
      input
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateTask(taskId, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
}
function useDeleteTask() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskId) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteTask(taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
}
function useAcceptTask() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskId) => {
      if (!actor) throw new Error("No actor");
      return actor.acceptTask(taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
}
function useRejectTask() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskId) => {
      if (!actor) throw new Error("No actor");
      return actor.rejectTask(taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
}
function useVerifyTask() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      taskId,
      approved
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.verifyTask(taskId, approved);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
}
function useAssignVolunteer() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      taskId,
      volunteerId
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.assignVolunteer(taskId, volunteerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
}
export {
  useRecommendedTasks as a,
  useAcceptTask as b,
  useRejectTask as c,
  useAllTasks as d,
  useMyNGOTasks as e,
  useAssignVolunteer as f,
  useVerifyTask as g,
  useCreateTask as h,
  useUpdateTask as i,
  useDeleteTask as j,
  useMyVolunteerTasks as u
};
