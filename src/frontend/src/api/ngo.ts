import { createActor } from "@/backend";
import type { NGOProfileInput } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useMyNGOProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myNGOProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyNGOProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useNGOProfile(userId: Principal | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["ngo", userId?.toString()],
    queryFn: async () => {
      if (!actor || !userId) return null;
      return actor.getNGOProfile(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useNGOs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["ngos"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listNGOs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterNGO() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: NGOProfileInput) => {
      if (!actor) throw new Error("No actor");
      return actor.registerNGO(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myNGOProfile"] });
    },
  });
}

export function useUpdateNGOProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: NGOProfileInput) => {
      if (!actor) throw new Error("No actor");
      return actor.updateMyNGOProfile(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myNGOProfile"] });
      queryClient.invalidateQueries({ queryKey: ["ngos"] });
    },
  });
}

export function useDeactivateNGO() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: Principal) => {
      if (!actor) throw new Error("No actor");
      return actor.deactivateNGO(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ngos"] });
    },
  });
}
