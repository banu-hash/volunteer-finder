import { c as createLucideIcon, j as jsxRuntimeExports, a as cn } from "./index-D4bjddjr.js";
import { T as TrendingUp } from "./trending-up-B8guMjXx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function MatchScoreBadge({
  score,
  className,
  size = "md"
}) {
  const pct = Math.round(score * 100);
  const color = pct >= 70 ? "text-success border-success/30 bg-success/10" : pct >= 40 ? "text-accent border-accent/30 bg-accent/10" : "text-destructive border-destructive/30 bg-destructive/10";
  const Icon = pct >= 70 ? TrendingUp : pct >= 40 ? Zap : Minus;
  const sizeClass = size === "sm" ? "text-xs px-2 py-1 gap-1" : size === "lg" ? "text-base px-4 py-2 gap-2" : "text-sm px-2.5 py-1.5 gap-1.5";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center font-semibold rounded-lg border",
        color,
        sizeClass,
        className
      ),
      title: `AI Match Score: ${pct}%`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: size === "sm" ? 12 : size === "lg" ? 18 : 14 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "AI Match" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
          pct,
          "%"
        ] })
      ]
    }
  );
}
export {
  MatchScoreBadge as M,
  Zap as Z
};
