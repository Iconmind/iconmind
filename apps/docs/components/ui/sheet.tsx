"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

/*
 * shadcn/ui's Sheet, kept in the repo rather than pulled from a package.
 *
 * The behaviour that matters is not the animation: it is focus. Radix traps the tab ring
 * inside the panel, restores it to the grid cell that opened it, marks the rest of the
 * page `aria-hidden`, and closes on Escape. Hand-rolling a panel gets the transition right
 * and every one of those wrong, which is how a browsable grid becomes unusable by keyboard.
 */
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    data-im-overlay=""
    className={cn("fixed inset-0 z-50 bg-[rgba(20,14,8,.28)]", className)}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

type Side = "top" | "bottom" | "left" | "right";

const SIDE: Record<Side, string> = {
  top: "inset-x-0 top-0 border-b",
  bottom: "inset-x-0 bottom-0 border-t",
  left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-md",
  right: "inset-y-0 right-0 h-full w-full border-l sm:max-w-[34rem]",
};

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & { side?: Side }
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      data-im-panel=""
      className={cn(
        "fixed z-50 flex flex-col gap-0 overflow-y-auto border-line bg-panel",
        SIDE[side],
        className,
      )}
      {...props}
    >
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={cn("font-sans text-h1 font-semibold", className)} {...props} />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn("text-meta text-ink-2", className)} {...props} />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

/** A sticky bar at the top of the panel — it stays put while the body scrolls. */
function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line-2 bg-panel px-[22px] py-4",
        className,
      )}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex items-center gap-2 border-t border-line-2 px-[22px] py-4", className)}
      {...props}
    />
  );
}

/** The X, with its own hit area and label. Every panel needs the same one. */
function SheetCloseButton({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return (
    <SheetPrimitive.Close
      aria-label="Close"
      className={cn(
        "grid size-7 shrink-0 place-items-center rounded-md text-muted transition-colors hover:bg-sunk hover:text-ink",
        className,
      )}
      {...props}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" aria-hidden="true">
        <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />
      </svg>
    </SheetPrimitive.Close>
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetCloseButton,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetOverlay,
  SheetPortal,
};
