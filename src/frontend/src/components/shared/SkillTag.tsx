import { cn } from "@/lib/utils";

interface SkillTagProps {
  skill: string;
  className?: string;
  variant?: "default" | "outline";
}

export function SkillTag({
  skill,
  className,
  variant = "default",
}: SkillTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md",
        variant === "outline"
          ? "border border-primary/30 text-primary bg-primary/5"
          : "bg-secondary text-secondary-foreground",
        className,
      )}
    >
      {skill}
    </span>
  );
}
