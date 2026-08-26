import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A panel on the page ground, with the site's own radius and hairline.
 *
 * shadcn's Card ships a `py-6` and a `gap-6` baked in. This one does not: the pages here
 * run at several densities — a marketing card at 26px of padding, a spec table at 12 —
 * so padding is the caller's, and what the component guarantees is the surface, the
 * border, the radius and the slot names.
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn("rounded-xl border border-line bg-panel text-ink", className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-[14.5px] font-semibold tracking-[-0.015em]", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-meta leading-[1.5] text-muted", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-action" className={cn("shrink-0", className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn(className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-footer" className={cn("flex items-center gap-2", className)} {...props} />
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter };
