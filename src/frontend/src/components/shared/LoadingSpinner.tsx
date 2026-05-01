import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export function LoadingSpinner({
  size = "md",
  className,
  label,
}: LoadingSpinnerProps) {
  const sizeClass =
    size === "sm"
      ? "h-4 w-4 border-2"
      : size === "lg"
        ? "h-10 w-10 border-[3px]"
        : "h-6 w-6 border-2";

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      aria-label={label || "Loading"}
      aria-live="polite"
    >
      <div
        className={cn(
          "rounded-full border-primary/30 border-t-primary animate-spin",
          sizeClass,
        )}
        aria-hidden="true"
      />
      {label && (
        <span className="ml-2 text-sm text-muted-foreground">{label}</span>
      )}
    </div>
  );
}

export function PageLoader() {
  return (
    <div
      className="flex-1 flex items-center justify-center min-h-[200px]"
      data-ocid="page.loading_state"
    >
      <LoadingSpinner size="lg" label="Loading..." />
    </div>
  );
}
