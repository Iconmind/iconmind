import { cn } from "@/lib/utils";

/** A placeholder that shimmers rather than pulses — a pulse reads as an error state. */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="skeleton" className={cn("shimmer rounded-md bg-sunk", className)} {...props} />
  );
}

export { Skeleton };
