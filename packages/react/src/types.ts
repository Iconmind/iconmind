import type { RefAttributes, SVGProps } from "react";

export type Variant = "outline" | "duotone";
export type Weight = "thin" | "regular" | "bold";

export interface IconProps<V extends Variant = Variant>
  extends Omit<SVGProps<SVGSVGElement>, "ref">, RefAttributes<SVGSVGElement> {
  /** Width and height, in px or any CSS length. Default 24. */
  size?: number | string;
  /** Stroke color, and the colour the duotone tint is taken from. Default "currentColor". */
  color?: string;
  /**
   * Which drawing to use. Default "outline".
   *
   * The type is narrowed per icon to the variants that exist, so asking an icon for a
   * drawing it does not have is a compile error rather than a silent fallback.
   */
  variant?: V;
  /** Which weight to use. Default "regular". Each weight is its own drawing, not a stroke-width. */
  weight?: Weight;
  /**
   * Stroke thickness. Defaults to the chosen weight's stroke — 1.5, 2 or 2.5.
   *
   * This is for fine adjustment, not for picking a weight: a heavier stroke on the
   * regular drawing closes interiors that the bold drawing opens up.
   */
  strokeWidth?: number | string;
  /**
   * Keep the stroke visually the same thickness as `size` changes.
   *
   * At size 48 a 2px stroke scales up to look like 4px. With this on, the stroke is
   * divided by the scale factor so it reads the same at every size.
   */
  absoluteStrokeWidth?: boolean;
}
