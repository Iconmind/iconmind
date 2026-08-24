import { createElement, forwardRef } from "react";
import type { IconProps } from "./types";

export type IconNode = [tag: string, attrs: Record<string, string>][];

/**
 * One factory for every icon. 1000 components must not mean 1000 copies of the props
 * logic — behaviour has to be fixed in one place or it will drift in a hundred.
 */
export const createIcon = (name: string, nodes: IconNode) => {
  const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
    { size = 24, color = "currentColor", strokeWidth = 2, absoluteStrokeWidth = false, children, ...rest },
    ref,
  ) {
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
        strokeWidth: absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
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
