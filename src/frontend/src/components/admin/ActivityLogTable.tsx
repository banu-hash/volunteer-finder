import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import type { ActivityLog } from "@/types";

interface ActivityLogTableProps {
  logs: ActivityLog[];
  isLoading: boolean;
}

function timeAgo(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const diff = Date.now() - ms;
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const actionColors: Record<string, string> = {
  approved: "text-success",
  rejected: "text-destructive",
  deactivated: "text-destructive",
  created: "text-primary",
  assigned: "text-primary",
  completed: "text-success",
  registered: "text-accent",
};

function getActionColor(action: string): string {
  for (const [key, cls] of Object.entries(actionColors)) {
    if (action.toLowerCase().includes(key)) return cls;
  }
  return "text-foreground";
}

export function ActivityLogTable({ logs, isLoading }: ActivityLogTableProps) {
  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center py-12"
        data-ocid="activity_log.loading_state"
      >
        <LoadingSpinner size="md" label="Loading activity..." />
      </div>
    );
  }

  if (!logs.length) {
    return (
      <div
        className="text-center py-12 text-muted-foreground text-sm"
        data-ocid="activity_log.empty_state"
      >
        No activity recorded yet
      </div>
    );
  }

  return (
    <div className="overflow-x-auto" data-ocid="activity_log.table">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left text-muted-foreground font-medium text-xs uppercase tracking-wide pb-3 pr-4">
              Time
            </th>
            <th className="text-left text-muted-foreground font-medium text-xs uppercase tracking-wide pb-3 pr-4">
              Action
            </th>
            <th className="text-left text-muted-foreground font-medium text-xs uppercase tracking-wide pb-3">
              Details
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {logs.slice(0, 20).map((log, i) => (
            <tr
              key={log.id.toString()}
              className="hover:bg-muted/30 transition-colors"
              data-ocid={`activity_log.item.${i + 1}`}
            >
              <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap font-mono text-xs">
                {timeAgo(log.timestamp)}
              </td>
              <td className="py-3 pr-4 whitespace-nowrap">
                <span className={`font-medium ${getActionColor(log.action)}`}>
                  {log.action}
                </span>
              </td>
              <td className="py-3 text-muted-foreground truncate max-w-xs">
                {log.details}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
