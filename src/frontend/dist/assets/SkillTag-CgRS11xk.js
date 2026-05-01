import { j as jsxRuntimeExports, a as cn } from "./index-D4bjddjr.js";
function SkillTag({
  skill,
  className,
  variant = "default"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md",
        variant === "outline" ? "border border-primary/30 text-primary bg-primary/5" : "bg-secondary text-secondary-foreground",
        className
      ),
      children: skill
    }
  );
}
export {
  SkillTag as S
};
