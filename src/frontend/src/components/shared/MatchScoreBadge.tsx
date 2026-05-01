import { cn } from "@/lib/utils";
import { Minus, TrendingUp, Zap } from "lucide-react";

interface MatchScoreBadgeProps {
  score: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function MatchScoreBadge({
  score,
  className,
  size = "md",
}: MatchScoreBadgeProps) {
  const pct = Math.round(score * 100);

  const color =
    pct >= 70
      ? "text-success border-success/30 bg-success/10"
      : pct >= 40
        ? "text-accent border-accent/30 bg-accent/10"
        : "text-destructive border-destructive/30 bg-destructive/10";

  const Icon = pct >= 70 ? TrendingUp : pct >= 40 ? Zap : Minus;

  const sizeClass =
    size === "sm"
      ? "text-xs px-2 py-1 gap-1"
      : size === "lg"
        ? "text-base px-4 py-2 gap-2"
        : "text-sm px-2.5 py-1.5 gap-1.5";

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded-lg border",
        color,
        sizeClass,
        className,
      )}
      title={`AI Match Score: ${pct}%`}
    >
      <Icon size={size === "sm" ? 12 : size === "lg" ? 18 : 14} />
      <span>AI Match</span>
      <span className="font-bold">{pct}%</span>
    </span>
  );
}
