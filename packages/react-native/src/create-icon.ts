import { createElement, forwardRef } from "react";
import Svg, { Path, Circle, Rect, Line, Polyline, Polygon, Ellipse } from "react-native-svg";
import type { IconProps, Variant, Weight } from "./types";

export type IconNode = [tag: string, attrs: Record<string, string>][];
export type CellKey = `${"outline" | "duotone"}-${Weight}`;
export type IconCells = Partial<Record<CellKey, IconNode>>;

const STROKE: Record<Weight, number> = { thin: 1.5, regular: 2, bold: 2.5 };

/** react-native-svg wants components and camelCase props where the DOM wants tags and kebab. */
const TAGS: Record<string, unknown> = {
  path: Path, circle: Circle, rect: Rect, line: Line,
  polyline: Polyline, polygon: Polygon, ellipse: Ellipse,
};
const camel = (k: string) => k.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

/** The same contract as @iconmind/react, mounted on react-native-svg. */
export const createIcon = <V extends Variant = Variant>(name: string, cells: IconCells) => {
  const Icon = forwardRef<unknown, IconProps<V>>(function Icon(
    { size = 24, color = "currentColor", variant, weight = "regular",
      strokeWidth, absoluteStrokeWidth = false, children, ...rest }, ref) {
    const want = `${variant ?? "outline"}-${weight}` as CellKey;
    const nodes = cells[want] ?? cells[`outline-${weight}` as CellKey] ?? cells["outline-regular"] ?? [];
    const stroke = strokeWidth ?? STROKE[weight];

    return createElement(
      Svg as never,
      {
        ref,
        width: size, height: size, viewBox: "0 0 24 24",
        fill: "none", stroke: color,
        strokeWidth: absoluteStrokeWidth ? (Number(stroke) * 24) / Number(size) : stroke,
        strokeLinecap: "round", strokeLinejoin: "round",
        ...rest,
      } as never,
      ...nodes.map(([tag, attrs], i) =>
        createElement(TAGS[tag] as never, {
          key: i,
          ...Object.fromEntries(Object.entries(attrs).map(([k, v]) => [camel(k), v])),
        } as never)),
      ...(Array.isArray(children) ? children : children ? [children] : []),
    );
  });
  Icon.displayName = name;
  return Icon;
};
