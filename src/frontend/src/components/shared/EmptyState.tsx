import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className,
      )}
      data-ocid="empty_state"
    >
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground mb-4">
          {icon}
        </div>
      )}
      <h3 className="font-display font-semibold text-foreground text-lg mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-muted-foreground text-sm max-w-xs mb-5">
          {description}
        </p>
      )}
      {action && (
        <Button
          onClick={action.onClick}
          size="sm"
          data-ocid="empty_state.primary_button"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
