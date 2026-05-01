import type { NotificationPublic } from "@/types";
import { create } from "zustand";

interface NotificationState {
  notifications: NotificationPublic[];
  setNotifications: (notifications: NotificationPublic[]) => void;
  markRead: (id: bigint) => void;
  markAllRead: () => void;
  unreadCount: number;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
    }),
  markRead: (id) => {
    const notifications = get().notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n,
    );
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
    });
  },
  markAllRead: () => {
    const notifications = get().notifications.map((n) => ({
      ...n,
      read: true,
    }));
    set({ notifications, unreadCount: 0 });
  },
}));
