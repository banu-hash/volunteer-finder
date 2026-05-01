import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
  className?: string;
  accentColor?: "primary" | "accent" | "success" | "destructive";
  "data-ocid"?: string;
}

const accentMap = {
  primary: {
    icon: "bg-primary/10 text-primary",
    value: "text-primary",
  },
  accent: {
    icon: "bg-accent/10 text-accent",
    value: "text-accent",
  },
  success: {
    icon: "bg-success/10 text-success",
    value: "text-success",
  },
  destructive: {
    icon: "bg-destructive/10 text-destructive",
    value: "text-destructive",
  },
};

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  className,
  accentColor = "primary",
  "data-ocid": dataOcid,
}: StatsCardProps) {
  const accent = accentMap[accentColor];
  const trendColor =
    trend === "up"
      ? "text-success"
      : trend === "down"
        ? "text-destructive"
        : "text-muted-foreground";
  const trendArrow = trend === "up" ? "↑" : trend === "down" ? "↓" : "—";

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-elevated transition-smooth",
        className,
      )}
      data-ocid={dataOcid}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            {title}
          </p>
          <p className={cn("text-3xl font-display font-bold", accent.value)}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trendLabel && (
            <p className={cn("text-xs font-medium mt-2", trendColor)}>
              <span className="mr-1">{trendArrow}</span>
              {trendLabel}
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-xl flex-shrink-0", accent.icon)}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}
