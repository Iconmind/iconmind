import type { RefAttributes, SVGProps } from "react";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "ref">, RefAttributes<SVGSVGElement> {
  /** Width and height, in px or any CSS length. Default 24. */
  size?: number | string;
  /** Stroke color. Default "currentColor". */
  color?: string;
  /** Stroke thickness. Default 2. */
  strokeWidth?: number | string;
  /**
   * Keep the stroke visually the same thickness as `size` changes.
   *
   * At size 48 a 2px stroke scales up to look like 4px. With this on, the stroke is
   * divided by the scale factor so it reads the same at every size.
   */
  absoluteStrokeWidth?: boolean;
}
