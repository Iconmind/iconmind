import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/*
 * tailwind-merge has to be told about this project's scales.
 *
 * It decides whether two classes conflict by parsing the value: `text-sm` is a font size
 * because "sm" is a t-shirt size, and anything else after `text-` is assumed to be a
 * colour. This site's type scale is named — `text-ui`, `text-meta`, `text-mono` — so all
 * nine sizes were being filed as colours, and `cn("text-page", "text-ui")` resolved to
 * `text-ui` alone.
 *
 * That is not theoretical. The header's GitHub button is `bg-ink text-page` from the
 * variant and `text-ui` from the size; the merge dropped `text-page`, and the button
 * rendered ink-on-ink — a black rectangle with an invisible label. Every `cn()` call that
 * combined a size with a colour had the same hole in it.
 *
 * Registering the scales here fixes all of them at once, and keeps the merge doing the
 * job it is there for: a caller's `className` still wins over a component's default.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      // Every named size in `@theme`. These are font sizes, not colours.
      text: ["hero", "h1", "h2", "lead", "ui", "body", "meta", "mono", "label"],
      radius: ["pill"],
      color: [
        "page", "panel", "sunk", "ink", "ink-2", "muted", "line", "line-2",
        "accent", "accent-soft", "ok", "warn",
        // The shadcn aliases, which resolve to the tokens above.
        "background", "foreground", "card", "card-foreground", "popover",
        "popover-foreground", "primary", "primary-foreground", "secondary",
        "secondary-foreground", "muted-foreground", "accent-foreground",
        "destructive", "destructive-foreground", "border", "input", "ring",
      ],
    },
    classGroups: {
      // `shadow-panel` is the site's one elevation; without this it collides with nothing
      // and would survive beside a `shadow-sm` the caller meant to replace it.
      shadow: [{ shadow: ["panel"] }],
    },
  },
});

/**
 * Merge class lists, letting the last Tailwind utility of a kind win.
 *
 * `clsx` alone would keep both `px-4` and `px-6` and leave the winner to source order in
 * the stylesheet, which is not something a component's caller can see or control.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
