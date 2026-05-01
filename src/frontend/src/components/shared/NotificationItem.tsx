import { cn } from "@/lib/utils";
import { NotificationType } from "@/types";
import type { NotificationPublic } from "@/types";
import { formatDistanceToNow } from "date-fns";
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  Clock,
  ThumbsUp,
  X,
} from "lucide-react";

interface NotificationItemProps {
  notification: NotificationPublic;
  onMarkRead?: (id: bigint) => void;
  className?: string;
}

const typeConfig = {
  [NotificationType.assignment]: {
    icon: <Bell size={14} />,
    color: "text-primary bg-primary/10",
  },
  [NotificationType.acceptance]: {
    icon: <ThumbsUp size={14} />,
    color: "text-success bg-success/10",
  },
  [NotificationType.completion]: {
    icon: <CheckCircle2 size={14} />,
    color: "text-success bg-success/10",
  },
  [NotificationType.rejection]: {
    icon: <X size={14} />,
    color: "text-destructive bg-destructive/10",
  },
  [NotificationType.reminder]: {
    icon: <Clock size={14} />,
    color: "text-accent bg-accent/10",
  },
};

export function NotificationItem({
  notification,
  onMarkRead,
  className,
}: NotificationItemProps) {
  const config = typeConfig[notification.notificationType] ?? {
    icon: <AlertCircle size={14} />,
    color: "text-muted-foreground bg-muted",
  };

  const timeAgo = formatDistanceToNow(
    new Date(Number(notification.createdAt / 1_000_000n)),
    { addSuffix: true },
  );

  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-smooth",
        !notification.read && "bg-primary/5",
        className,
      )}
    >
      <div
        className={cn(
          "flex-none w-7 h-7 rounded-full flex items-center justify-center mt-0.5",
          config.color,
        )}
      >
        {config.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm leading-snug break-words",
            notification.read
              ? "text-muted-foreground"
              : "text-foreground font-medium",
          )}
        >
          {notification.message}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{timeAgo}</p>
      </div>
      {!notification.read && onMarkRead && (
        <button
          type="button"
          onClick={() => onMarkRead(notification.id)}
          className="flex-none p-1 rounded hover:bg-muted text-muted-foreground transition-smooth"
          aria-label="Mark as read"
          data-ocid="notification.mark_read_button"
        >
          <CheckCircle2 size={14} />
        </button>
      )}
    </div>
  );
}
