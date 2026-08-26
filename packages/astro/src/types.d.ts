export type Variant = "outline" | "duotone";
export type Weight = "thin" | "regular" | "bold";

export interface IconProps<V extends Variant = Variant> {
  size?: number | string;
  color?: string;
  variant?: V;
  weight?: Weight;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
  [attr: string]: unknown;
}

export type IconComponent<V extends Variant = Variant> = (props: IconProps<V>) => unknown;
