import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-line bg-panel px-3.5 text-ui text-ink transition-colors outline-none",
        "placeholder:text-muted",
        "focus-visible:border-accent",
        "disabled:pointer-events-none disabled:opacity-50",
        // The clear affordance Safari and Chrome add to `type=search` lands as a grey X
        // that ignores the theme. The site has its own Escape-to-clear.
        "[&::-webkit-search-cancel-button]:appearance-none",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
