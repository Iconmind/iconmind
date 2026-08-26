import { defineComponent, h } from "vue";
import type { IconProps, Variant, Weight } from "./types";

export type IconNode = [tag: string, attrs: Record<string, string>][];
export type CellKey = `${"outline" | "duotone"}-${Weight}`;
export type IconCells = Partial<Record<CellKey, IconNode>>;

const STROKE: Record<Weight, number> = { thin: 1.5, regular: 2, bold: 2.5 };

/**
 * One factory for every icon — the same contract as @iconmind/react, mounted the Vue
 * way. Every cell an icon has travels with it and the variant is chosen at render;
 * measured on the React build, carrying all six drawings costs ~39 bytes gzipped per
 * icon, and six import paths to memorise would cost far more.
 */
export const createIcon = <V extends Variant = Variant>(name: string, cells: IconCells) =>
  defineComponent<IconProps<V>>(
    (props, { attrs, slots }) => () => {
      const weight = props.weight ?? "regular";
      const v = (props.variant ?? "outline") as string;
      const nodes =
        cells[`${v}-${weight}` as CellKey] ?? cells[`outline-${weight}`] ?? cells["outline-regular"] ?? [];

      const size = props.size ?? 24;
      const stroke = props.strokeWidth ?? STROKE[weight];
      const labelled = (attrs as Record<string, unknown>)["aria-label"] != null
        || (attrs as Record<string, unknown>)["aria-labelledby"] != null;

      return h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: size,
          height: size,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: props.color ?? "currentColor",
          "stroke-width": props.absoluteStrokeWidth ? (Number(stroke) * 24) / Number(size) : stroke,
          // Kept in step with svgRootAttrs() in @iconmind/shared.
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          focusable: "false",
          ...(labelled ? { role: "img" } : { "aria-hidden": "true" }),
          ...attrs,
        },
        [...nodes.map(([tag, a]) => h(tag, a)), slots.default?.()],
      );
    },
    { name, props: ["size", "color", "variant", "weight", "strokeWidth", "absoluteStrokeWidth"], inheritAttrs: false },
  );
