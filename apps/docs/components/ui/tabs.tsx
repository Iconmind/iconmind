"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

/*
 * Radix Tabs, for the three or four places this site was rendering a row of buttons and
 * a ternary.
 *
 * What the primitive buys over that: arrow keys move between tabs, the panel is wired to
 * its trigger by `aria-controls`, and only the active trigger is in the tab order — so
 * a keyboard reaches the *content* in two presses rather than four.
 */
function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-2", className)} {...props} />
  );
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn("inline-flex w-fit items-center gap-0.5 rounded-md bg-sunk p-0.5", className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex h-7 items-center justify-center gap-1.5 rounded-sm px-3 text-ui font-medium whitespace-nowrap text-muted transition-colors",
        "hover:text-ink",
        "data-[state=active]:bg-panel data-[state=active]:text-ink data-[state=active]:shadow-sm",
        "disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-3.5",
        className,
      )}
      {...props}
    />
  );
}

/** The plain variant: no track, just an underline. For code panes and page headers. */
function TabsTriggerBare({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex h-7 items-center rounded-sm px-2.5 font-mono text-mono text-muted transition-colors",
        "hover:text-ink data-[state=active]:bg-sunk data-[state=active]:text-ink",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsTriggerBare, TabsContent };
