import { createElement, forwardRef } from "react";
import type { IconProps, Variant, Weight } from "./types";

export type IconNode = [tag: string, attrs: Record<string, string>][];
/** `outline-bold`, `duotone-thin`. Every cell is stroked, so every cell has a weight. */
export type CellKey = `${"outline" | "duotone"}-${Weight}`;
export type IconCells = Partial<Record<CellKey, IconNode>>;

const STROKE: Record<Weight, number> = { thin: 1.5, regular: 2, bold: 2.5 };

/**
 * One factory for every icon. 1000 components must not mean 1000 copies of the props
 * logic — behaviour has to be fixed in one place or it will drift in a hundred.
 *
 * Every cell an icon has travels with it, and the variant is chosen at render. The
 * alternative was one import path per cell, and the argument for it was tree shaking:
 * carrying six drawings must surely cost six times as much. Measured, it costs about
 * 39 bytes gzipped per icon — the per-icon budget is dominated by this factory, not by
 * path data, and duotone compresses to almost nothing because it repeats the outline it
 * sits behind. Six import paths to memorise, and no way to switch style at runtime, is
 * a steep price for 39 bytes.
 */
export const createIcon = <V extends Variant = Variant>(name: string, cells: IconCells) => {
  const Icon = forwardRef<SVGSVGElement, IconProps<V>>(function Icon(
    { size = 24, color = "currentColor", variant, weight = "regular",
      strokeWidth, absoluteStrokeWidth = false, children, ...rest },
    ref,
  ) {
    const v = variant ?? "outline";
    const want = `${v}-${weight}` as CellKey;
    // Falling back keeps a JavaScript caller from rendering nothing. TypeScript callers
    // cannot get here: `variant` is narrowed per icon to the cells that exist.
    const nodes = cells[want] ?? cells[`outline-${weight}` as CellKey] ?? cells["outline-regular"] ?? [];

    const stroke = strokeWidth ?? STROKE[weight];

    // Decorative unless the author gives it a name — see doc 03 §3.8.
    const labelled = rest["aria-label"] != null || rest["aria-labelledby"] != null;

    return createElement(
      "svg",
      {
        ref,
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? (Number(stroke) * 24) / Number(size) : stroke,
        // Kept in step with svgRootAttrs() in @iconmind/shared; if these ever disagree
        // the package renders something the repo does not contain.
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        focusable: "false",
        ...(labelled ? { role: "img" } : { "aria-hidden": "true" }),
        // Spread last: the consumer may override anything, including viewBox.
        ...rest,
      },
      ...nodes.map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs })),
      ...(Array.isArray(children) ? children : children ? [children] : []),
    );
  });
  Icon.displayName = name;
  return Icon;
};
