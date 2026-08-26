"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

/*
 * The native range input could not be styled to match the panel without four vendor
 * pseudo-elements, and it still would not show which stops exist. Radix's slider is a
 * div with `role="slider"` — so the track, the filled part and the thumb are all
 * ordinary elements the token layer can paint.
 */
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min]),
    [value, defaultValue, min],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn("relative flex w-full touch-none items-center select-none", className)}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative h-1 w-full grow overflow-hidden rounded-pill bg-line"
      >
        <SliderPrimitive.Range data-slot="slider-range" className="absolute h-full bg-accent" />
      </SliderPrimitive.Track>
      {values.map((_, i) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={i}
          className="block size-3.5 shrink-0 rounded-pill border-2 border-accent bg-panel shadow-sm transition-[transform,box-shadow] hover:scale-110 focus-visible:outline-none active:scale-95"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
