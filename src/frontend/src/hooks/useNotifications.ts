import { createActor } from "@/backend";
import { useNotificationStore } from "@/stores/notificationStore";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useNotifications() {
  const { actor, isFetching } = useActor(createActor);
  const setNotifications = useNotificationStore((s) => s.setNotifications);

  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getMyNotifications();
      setNotifications(result);
      return result;
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });
}

export function useMarkNotificationRead() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const markRead = useNotificationStore((s) => s.markRead);

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      await actor.markNotificationRead(id);
      return id;
    },
    onSuccess: (id) => {
      markRead(id);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const markAllRead = useNotificationStore((s) => s.markAllRead);

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      await actor.markAllNotificationsRead();
    },
    onSuccess: () => {
      markAllRead();
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
