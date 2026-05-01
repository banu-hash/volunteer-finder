import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface AdminStatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  variant?: "default" | "primary" | "success" | "warning" | "destructive";
  className?: string;
  ocid?: string;
}

const variantStyles = {
  default: "bg-card border-border",
  primary: "bg-primary/10 border-primary/30",
  success: "bg-success/10 border-success/30",
  warning: "bg-accent/10 border-accent/30",
  destructive: "bg-destructive/10 border-destructive/30",
};

const iconStyles = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/20 text-primary",
  success: "bg-success/20 text-success",
  warning: "bg-accent/20 text-accent",
  destructive: "bg-destructive/20 text-destructive",
};

export function AdminStatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  className,
  ocid,
}: AdminStatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-xl border p-5 flex flex-col gap-3 shadow-card transition-smooth hover:shadow-elevated",
        variantStyles[variant],
        className,
      )}
      data-ocid={ocid}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            iconStyles[variant],
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              trend.value >= 0
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive",
            )}
          >
            {trend.value >= 0 ? "+" : ""}
            {trend.value}% {trend.label}
          </span>
        )}
      </div>
      <div>
        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-1">
          {title}
        </p>
        <p className="font-display text-3xl font-bold text-foreground leading-none">
          {value}
        </p>
        {subtitle && (
          <p className="text-muted-foreground text-xs mt-1">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}
