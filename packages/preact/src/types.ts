import type { JSX } from "preact";

export type Variant = "outline" | "duotone";
export type Weight = "thin" | "regular" | "bold";

export interface IconProps<V extends Variant = Variant> extends JSX.SVGAttributes<SVGSVGElement> {
  /** Width and height, in px or any CSS length. Default 24. */
  size?: number | string;
  /** Stroke color, and the colour the duotone tint is taken from. Default "currentColor". */
  color?: string;
  /** Which drawing to use. Default "outline". Narrowed per icon to the variants that exist. */
  variant?: V;
  /** Which weight to use. Default "regular". Each weight is its own drawing, not a stroke-width. */
  weight?: Weight;
  /** Stroke thickness. Defaults to the chosen weight's stroke — 1.5, 2 or 2.5. */
  strokeWidth?: number | string;
  /** Keep the stroke visually the same thickness as `size` changes. */
  absoluteStrokeWidth?: boolean;
}
