import h from "solid-js/h";
import { splitProps, type Component } from "solid-js";
import type { IconProps, Variant, Weight } from "./types";

export type IconNode = [tag: string, attrs: Record<string, string>][];
export type CellKey = `${"outline" | "duotone"}-${Weight}`;
export type IconCells = Partial<Record<CellKey, IconNode>>;

const STROKE: Record<Weight, number> = { thin: 1.5, regular: 2, bold: 2.5 };

/**
 * The same contract as @iconmind/react, mounted the Solid way — via hyperscript, so the
 * package needs no Solid compiler at build time. Props are passed as getters, which is
 * what keeps them reactive without JSX.
 */
export const createIcon = <V extends Variant = Variant>(name: string, cells: IconCells): Component<IconProps<V>> => {
  // h() returns an expandable thunk rather than a JSX.Element; at runtime Solid expands
  // it fine, and the cast keeps that runtime truth out of the public type.
  const Icon = ((props: IconProps<V>) => {
    const [local, rest] = splitProps(props as IconProps, [
      "size", "color", "variant", "weight", "strokeWidth", "absoluteStrokeWidth", "children",
    ]);
    const weight = () => local.weight ?? "regular";
    const nodes = () => {
      const want = `${local.variant ?? "outline"}-${weight()}` as CellKey;
      return cells[want] ?? cells[`outline-${weight()}` as CellKey] ?? cells["outline-regular"] ?? [];
    };
    const size = () => local.size ?? 24;
    const stroke = () => {
      const s = local.strokeWidth ?? STROKE[weight()];
      return local.absoluteStrokeWidth ? (Number(s) * 24) / Number(size()) : s;
    };
    const labelled = () =>
      (rest as Record<string, unknown>)["aria-label"] != null ||
      (rest as Record<string, unknown>)["aria-labelledby"] != null;

    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: size, height: size, viewBox: "0 0 24 24",
        fill: "none",
        stroke: () => local.color ?? "currentColor",
        "stroke-width": stroke,
        "stroke-linecap": "round", "stroke-linejoin": "round",
        focusable: "false",
        role: () => (labelled() ? "img" : undefined),
        "aria-hidden": () => (labelled() ? undefined : "true"),
        ...rest,
      },
      nodes().map(([tag, attrs]) => h(tag, attrs)),
      () => local.children,
    );
  }) as unknown as Component<IconProps<V>>;
  (Icon as { displayName?: string }).displayName = name;
  return Icon;
};
