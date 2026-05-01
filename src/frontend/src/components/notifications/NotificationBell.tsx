import { NotificationItem } from "@/components/shared/NotificationItem";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
} from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";
import { useNotificationStore } from "@/stores/notificationStore";
import { Bell, CheckCheck } from "lucide-react";
import { useState } from "react";

interface NotificationBellProps {
  unreadCount: number;
}

export function NotificationBell({ unreadCount }: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const { isLoading } = useNotifications();
  const notifications = useNotificationStore((s) => s.notifications);
  const { mutate: markRead } = useMarkNotificationRead();
  const { mutate: markAllRead, isPending: markingAll } =
    useMarkAllNotificationsRead();

  const displayedNotifications = notifications.slice(0, 20);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="relative p-2 rounded-md hover:bg-muted text-muted-foreground transition-smooth"
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
          data-ocid="header.notification_bell"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 p-0 shadow-elevated"
        data-ocid="notification.popover"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="font-display font-semibold text-sm text-foreground">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7 text-primary hover:text-primary"
              onClick={() => markAllRead()}
              disabled={markingAll}
              data-ocid="notification.mark_all_read_button"
            >
              <CheckCheck size={12} className="mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-80">
          {isLoading ? (
            <div className="flex items-center justify-center h-20 text-muted-foreground text-sm">
              Loading...
            </div>
          ) : displayedNotifications.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center h-24 text-muted-foreground text-sm"
              data-ocid="notification.empty_state"
            >
              <Bell size={20} className="mb-2 opacity-40" />
              No notifications yet
            </div>
          ) : (
            <div className="divide-y divide-border">
              {displayedNotifications.map((n, i) => (
                <NotificationItem
                  key={n.id.toString()}
                  notification={n}
                  onMarkRead={markRead}
                  data-ocid={`notification.item.${i + 1}`}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
