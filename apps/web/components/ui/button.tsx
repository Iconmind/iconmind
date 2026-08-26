"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/*
 * shadcn/ui's Button, wearing this site's palette.
 *
 * The variants are the ones the pages were already hand-rolling: an ink fill for the one
 * primary action, a hairline panel for everything beside it, a bare hover for toolbars,
 * and the orange for the rare case where the action *is* the brand. Sizes are on the
 * 8px rhythm the header and rails already use, so a button drops into a row without
 * anybody nudging a height.
 *
 * `asChild` is the part worth having: `<Button asChild><Link/></Button>` keeps the anchor
 * semantics — a real href, middle-clickable, crawlable — and only borrows the paint.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-semibold outline-none transition-[color,background-color,border-color,opacity,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-ink text-page hover:opacity-90",
        accent: "bg-accent text-white hover:opacity-90",
        outline: "border border-line bg-panel text-ink hover:border-accent hover:bg-sunk",
        secondary: "bg-sunk text-ink hover:bg-line-2",
        ghost: "text-ink-2 hover:bg-sunk hover:text-ink",
        link: "text-accent underline-offset-[3px] hover:underline",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-ui [&_svg]:size-3.5",
        default: "h-9 rounded-md px-4 text-ui [&_svg]:size-4",
        lg: "h-11 rounded-lg px-5 text-[14.5px] [&_svg]:size-[17px]",
        icon: "size-8 rounded-md [&_svg]:size-4",
        "icon-lg": "size-9 rounded-md [&_svg]:size-[18px]",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
