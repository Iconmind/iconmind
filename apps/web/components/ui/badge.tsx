import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** Small, static, and never a button. Counts, versions, licences, tags. */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-pill px-2.5 py-0.5 [&_svg]:pointer-events-none [&_svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-ink text-page text-[11px] font-semibold",
        accent: "bg-accent-soft text-accent text-[11px] font-bold tracking-[0.02em]",
        outline: "border border-line text-ink-2 font-mono text-mono",
        muted: "bg-sunk text-muted font-mono text-mono",
      },
    },
    defaultVariants: { variant: "outline" },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
