import { createActor } from "@/backend";
import type { TaskInput } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAllTasks() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["tasks", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllTasks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyNGOTasks() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["tasks", "ngo"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyNGOTasks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyVolunteerTasks() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["tasks", "volunteer"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyVolunteerTasks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTask(taskId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["task", taskId?.toString()],
    queryFn: async () => {
      if (!actor || taskId === null) return null;
      return actor.getTask(taskId);
    },
    enabled: !!actor && !isFetching && taskId !== null,
  });
}

export function useRecommendedTasks(limit = 6n) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["tasks", "recommended"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyRecommendedTasks(limit);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateTask() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: TaskInput) => {
      if (!actor) throw new Error("No actor");
      return actor.createTask(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useUpdateTask() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      taskId,
      input,
    }: { taskId: bigint; input: TaskInput }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateTask(taskId, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteTask() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskId: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteTask(taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useAcceptTask() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskId: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.acceptTask(taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useRejectTask() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskId: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.rejectTask(taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useVerifyTask() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      taskId,
      approved,
    }: { taskId: bigint; approved: boolean }) => {
      if (!actor) throw new Error("No actor");
      return actor.verifyTask(taskId, approved);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useAssignVolunteer() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      taskId,
      volunteerId,
    }: {
      taskId: bigint;
      volunteerId: import("@icp-sdk/core/principal").Principal;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.assignVolunteer(taskId, volunteerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
