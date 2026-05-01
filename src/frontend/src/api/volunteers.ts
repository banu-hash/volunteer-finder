import { createActor } from "@/backend";
import type { VolunteerProfileInput } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useVolunteers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["volunteers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listVolunteers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVolunteerProfile(userId: Principal | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["volunteer", userId?.toString()],
    queryFn: async () => {
      if (!actor || !userId) return null;
      return actor.getVolunteerProfile(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useMyVolunteerProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myVolunteerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyVolunteerProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveVolunteerProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: VolunteerProfileInput) => {
      if (!actor) throw new Error("No actor");
      return actor.saveMyVolunteerProfile(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myVolunteerProfile"] });
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
    },
  });
}

export function useFilterVolunteersBySkills(skills: string[]) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["volunteers", "filtered", skills.join(",")],
    queryFn: async () => {
      if (!actor) return [];
      return actor.filterVolunteersBySkills(skills);
    },
    enabled: !!actor && !isFetching && skills.length > 0,
  });
}

export function useTopVolunteers(taskId: bigint | null, limit = 5n) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["volunteers", "top", taskId?.toString()],
    queryFn: async () => {
      if (!actor || taskId === null) return [];
      return actor.getTopVolunteers(taskId, limit);
    },
    enabled: !!actor && !isFetching && taskId !== null,
  });
}

export function useDeactivateVolunteer() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: Principal) => {
      if (!actor) throw new Error("No actor");
      return actor.deactivateVolunteer(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
    },
  });
}
