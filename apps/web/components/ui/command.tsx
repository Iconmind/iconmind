"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/*
 * cmdk, in this palette.
 *
 * The reason to use it rather than the site's own list-and-filter: cmdk owns the
 * keyboard. Up and down move the selection without moving focus out of the input, Enter
 * runs the highlighted item, and the list is a real `role="listbox"` with
 * `aria-activedescendant` — so a screen reader announces the highlighted icon while the
 * caret is still in the search field. That is a lot of the palette, and none of it is
 * visible in a screenshot.
 */
function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn("flex size-full flex-col overflow-hidden rounded-2xl bg-panel text-ink", className)}
      {...props}
    />
  );
}

function CommandDialog({
  title = "Search icons",
  description = "Search every icon by name, tag or alias.",
  children,
  className,
  shouldFilter,
  loop = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
  className?: string;
  /** Off when the caller ranks its own results — see the palette. */
  shouldFilter?: boolean;
  loop?: boolean;
}) {
  return (
    <Dialog {...props}>
      <DialogContent className={cn("p-0", className)}>
        {/* The dialog needs a name and a description for the accessibility tree; on screen
            the input's placeholder already says both, so they are read, not seen. */}
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        <Command
          shouldFilter={shouldFilter}
          loop={loop}
          className="[&_[cmdk-group-heading]]:label [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]]:h-14"
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="flex items-center gap-3 border-b border-line px-4">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-muted">
        <circle cx="11" cy="11" r="7" />
        <path d="M20.5 20.5 16.9 16.9" />
      </svg>
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "flex h-14 w-full bg-transparent py-3 text-[15px] outline-none placeholder:text-muted disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn("max-h-[min(56vh,380px)] scroll-py-1 overflow-x-hidden overflow-y-auto p-2", className)}
      {...props}
    />
  );
}

function CommandEmpty({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="px-4 py-10 text-center text-ui text-muted"
      {...props}
    />
  );
}

function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn("overflow-hidden text-ink [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2", className)}
      {...props}
    />
  );
}

function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator data-slot="command-separator" className={cn("-mx-2 my-1 h-px bg-line-2", className)} {...props} />
  );
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-ui text-ink-2 outline-none select-none",
        "data-[selected=true]:bg-sunk data-[selected=true]:text-ink",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn("ml-auto font-mono text-[10.5px] tracking-[0.04em] text-muted", className)}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
