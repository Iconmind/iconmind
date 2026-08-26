import { h } from "preact";
import { forwardRef } from "preact/compat";
import type { IconProps, Variant, Weight } from "./types";

export type IconNode = [tag: string, attrs: Record<string, string>][];
export type CellKey = `${"outline" | "duotone"}-${Weight}`;
export type IconCells = Partial<Record<CellKey, IconNode>>;

const STROKE: Record<Weight, number> = { thin: 1.5, regular: 2, bold: 2.5 };

/** The same contract as @iconmind/react, mounted the Preact way. */
export const createIcon = <V extends Variant = Variant>(name: string, cells: IconCells) => {
  const Icon = forwardRef<SVGSVGElement, IconProps<V>>(function Icon(
    { size = 24, color = "currentColor", variant, weight = "regular",
      strokeWidth, absoluteStrokeWidth = false, children, ...rest }, ref) {
    const want = `${variant ?? "outline"}-${weight}` as CellKey;
    const nodes = cells[want] ?? cells[`outline-${weight}` as CellKey] ?? cells["outline-regular"] ?? [];
    const stroke = strokeWidth ?? STROKE[weight];
    const r = rest as Record<string, unknown>;
    const labelled = r["aria-label"] != null || r["aria-labelledby"] != null;

    return h(
      "svg",
      {
        ref,
        xmlns: "http://www.w3.org/2000/svg",
        width: size, height: size, viewBox: "0 0 24 24",
        fill: "none", stroke: color,
        "stroke-width": absoluteStrokeWidth ? (Number(stroke) * 24) / Number(size) : stroke,
        "stroke-linecap": "round", "stroke-linejoin": "round",
        focusable: "false",
        ...(labelled ? { role: "img" } : { "aria-hidden": "true" }),
        ...rest,
      } as never,
      [...nodes.map(([tag, attrs]) => h(tag as never, attrs as never)), children],
    );
  });
  Icon.displayName = name;
  return Icon;
};
