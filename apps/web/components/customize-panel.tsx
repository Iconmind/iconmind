"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const VARIANTS = ["outline", "duotone"] as const;

/** The three weights that were drawn, with the stroke each one is. Not a continuum: every
 *  value here is a cell somebody checked, and `min-stroke-gap` is weight-aware, so a
 *  slider running between them would be rendering geometry nobody validated. */
export const WEIGHTS = [
  { id: "thin", label: "Thin", stroke: 1.5 },
  { id: "regular", label: "Regular", stroke: 2 },
  { id: "bold", label: "Bold", stroke: 2.5 },
] as const;

export const COLOURS = [
  ["ink", "var(--color-ink)", "Ink"],
  ["accent", "var(--color-accent)", "Accent"],
  ["muted", "var(--color-muted)", "Muted"],
  ["teal", "#0F766E", "Teal"],
  ["violet", "#7C3AED", "Violet"],
] as const;

/** The sizes people actually ship at, as one tap each. The slider is still there for the
 *  values between them. */
export const SIZE_STOPS = [16, 20, 24, 32, 40] as const;

export interface Look {
  variant: (typeof VARIANTS)[number];
  stroke: number;
  size: number;
  colour: string;
}

export const DEFAULT_LOOK: Look = { variant: "outline", stroke: 2, size: 24, colour: "ink" };

export const inkOf = (colour: string) =>
  COLOURS.find(([id]) => id === colour)?.[1] ?? "var(--color-ink)";

export const weightOf = (stroke: number) =>
  WEIGHTS.find((w) => w.stroke === stroke)?.id ?? "regular";

/**
 * The controls, in one place.
 *
 * The rail, the drawer and an icon's own page show the same four, so they are the same
 * component: a customiser that disagrees with itself between three screens is worse than
 * one that is only on one of them.
 *
 * Two things changed when this moved onto Radix. Weight is a segmented control rather
 * than a range — there are exactly three drawn weights, and a slider that snaps to three
 * stops is a segmented control wearing the wrong clothes. And every control is now one
 * tab stop with arrow keys inside it, instead of a row of buttons each taking its own.
 */
export function CustomizePanel({
  look, onChange, compact = false, extra, className,
}: {
  look: Look;
  onChange: (next: Look) => void;
  /** Drops the gaps a step. For the 250px rail and the drawer, not the detail page. */
  compact?: boolean;
  extra?: React.ReactNode;
  className?: string;
}) {
  const set = <K extends keyof Look>(k: K, v: Look[K]) => onChange({ ...look, [k]: v });
  const weight = weightOf(look.stroke);

  return (
    <div className={cn("grid", compact ? "gap-3" : "gap-[18px]", className)}>
      <Field label="Variant">
        <ToggleGroup
          type="single"
          value={look.variant}
          onValueChange={(v) => v && set("variant", v as Look["variant"])}
        >
          {VARIANTS.map((v) => (
            <ToggleGroupItem key={v} value={v} className="capitalize">
              {v}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </Field>

      <Field label="Weight" value={`${look.stroke.toFixed(2)}px`}>
        <ToggleGroup
          type="single"
          value={weight}
          onValueChange={(v) => {
            const found = WEIGHTS.find((w) => w.id === v);
            if (found) set("stroke", found.stroke);
          }}
        >
          {WEIGHTS.map((w) => (
            <ToggleGroupItem key={w.id} value={w.id}>
              {w.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </Field>

      <Field label="Size" value={`${look.size}px`}>
        <Slider
          min={16}
          max={44}
          step={1}
          value={[look.size]}
          onValueChange={([v]) => typeof v === "number" && set("size", v)}
          aria-label="Size"
          className="mt-1.5 mb-2"
        />
        <div className="flex gap-1">
          {SIZE_STOPS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => set("size", s)}
              className={cn(
                "h-6 flex-1 rounded-sm font-mono text-[10.5px] tabular-nums transition-colors",
                look.size === s ? "bg-accent-soft text-accent" : "text-muted hover:bg-sunk hover:text-ink",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Colour">
        <div className="flex gap-[7px]">
          {COLOURS.map(([id, sw, title]) => (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => set("colour", id)}
                  aria-label={`Colour ${title}`}
                  aria-pressed={look.colour === id}
                  className="size-7 rounded-md transition-transform hover:scale-110"
                  style={{
                    background: sw,
                    boxShadow:
                      look.colour === id
                        ? "0 0 0 2px var(--color-panel),0 0 0 3.5px var(--color-accent)"
                        : "inset 0 0 0 1px rgba(128,128,128,.28)",
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>{title}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </Field>

      {extra}

      <button
        type="button"
        onClick={() => onChange(DEFAULT_LOOK)}
        className="flex items-center gap-1.5 text-left text-meta text-muted transition-colors hover:text-ink"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
          <path d="M3.2 4v4.4h4.4" />
        </svg>
        Reset to defaults
      </button>
    </div>
  );
}

function Field({
  label, value, children,
}: {
  label: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-meta text-ink-2">{label}</span>
        {value && <span className="font-mono text-[11px] tabular-nums text-ink">{value}</span>}
      </div>
      {children}
    </div>
  );
}
