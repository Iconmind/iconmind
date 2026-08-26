import { cn } from "@/lib/utils";

/** A key cap. Mono, small, and the same height as the text it sits in. */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[5px] border border-line bg-sunk px-1.5 font-mono text-[10px] leading-none text-muted",
        className,
      )}
      {...props}
    />
  );
}

export { Kbd };
