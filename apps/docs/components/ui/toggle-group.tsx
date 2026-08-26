"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

/*
 * A segmented control: one track, N items, exactly one lit.
 *
 * This replaces the pair of `<button>`s the customiser was drawing for variant, and the
 * three for weight. Radix gives it roving focus — one tab stop for the whole control,
 * arrow keys inside — which is what a segmented control is supposed to do and what a row
 * of buttons never does.
 */
function ToggleGroup({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn("flex w-full items-center gap-0.5 rounded-md bg-sunk p-0.5", className)}
      {...props}
    />
  );
}

function ToggleGroupItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        "inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-sm px-2.5 py-1.5 text-meta font-medium whitespace-nowrap text-muted transition-colors outline-none",
        "hover:text-ink",
        "data-[state=on]:bg-panel data-[state=on]:text-ink data-[state=on]:shadow-sm",
        "disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-3.5",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
