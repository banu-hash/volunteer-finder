import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useQuery } from "@tanstack/react-query";

export function useMatchScore(
  volunteerId: Principal | null,
  taskId: bigint | null,
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["matchScore", volunteerId?.toString(), taskId?.toString()],
    queryFn: async () => {
      if (!actor || !volunteerId || taskId === null) return 0;
      return actor.getMatchScore(volunteerId, taskId);
    },
    enabled: !!actor && !isFetching && !!volunteerId && taskId !== null,
  });
}

export function useRecommendedTasks(volunteerId: Principal | null, limit = 6n) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["recommendedTasks", volunteerId?.toString()],
    queryFn: async () => {
      if (!actor || !volunteerId) return [];
      return actor.getRecommendedTasks(volunteerId, limit);
    },
    enabled: !!actor && !isFetching && !!volunteerId,
  });
}
