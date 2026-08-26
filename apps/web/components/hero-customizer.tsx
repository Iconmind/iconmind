"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";

const WEIGHTS = [
  { id: "thin", label: "Thin", stroke: 1.5 },
  { id: "regular", label: "Regular", stroke: 2 },
  { id: "bold", label: "Bold", stroke: 2.5 },
] as const;

/**
 * The hero panel: eighteen icons and the controls that change all of them at once.
 *
 * The point it has to make in three seconds is that the set is one system, not a bag of
 * drawings — so the controls act on every icon in the grid simultaneously. Weight is a
 * segmented control rather than a slider because there are exactly three drawn weights,
 * and picking one swaps the *cell*: eighteen different drawings, not one drawing with a
 * different `stroke-width`. That distinction is the whole pitch, so the panel says it in
 * the caption rather than leaving it to be inferred.
 */
export function HeroCustomizer({ cells }: { cells: Record<string, Record<string, string>> }) {
  const [weight, setWeight] = useState<(typeof WEIGHTS)[number]["id"]>("regular");
  const [size, setSize] = useState(26);

  const stroke = WEIGHTS.find((w) => w.id === weight)?.stroke ?? 2;
  const bodies = cells[weight] ?? {};
  const slugs = Object.keys(bodies);

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-panel shadow-panel">
      <div className="flex items-center justify-between border-b border-line-2 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="grid size-5 place-items-center rounded-[5px] bg-accent-soft">
            <span className="block size-2 rounded-[2px] bg-accent" />
          </span>
          <span className="label">Live customizer</span>
        </div>
        <Badge variant="accent">
          {size}px · {stroke.toFixed(2)}
        </Badge>
      </div>

      <div className="grid grid-cols-6 gap-px border-b border-line-2 bg-line-2">
        {slugs.map((slug) => (
          <div key={slug} className="grid aspect-square place-items-center bg-panel text-ink">
            <svg
              xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"
              strokeLinejoin="round" style={{ display: "block", overflow: "visible" }}
              aria-hidden="true" dangerouslySetInnerHTML={{ __html: bodies[slug]! }}
            />
          </div>
        ))}
      </div>

      <div className="grid gap-4 px-4 py-4">
        <div className="grid grid-cols-[54px_minmax(0,1fr)] items-center gap-3">
          <span className="text-meta text-muted">Weight</span>
          <ToggleGroup
            type="single"
            value={weight}
            onValueChange={(v) => v && setWeight(v as typeof weight)}
            aria-label="Stroke weight"
          >
            {WEIGHTS.map((w) => (
              <ToggleGroupItem key={w.id} value={w.id}>
                {w.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="grid grid-cols-[54px_minmax(0,1fr)_44px] items-center gap-3">
          <span className="text-meta text-muted">Size</span>
          <Slider
            min={16}
            max={44}
            step={1}
            value={[size]}
            onValueChange={([v]) => typeof v === "number" && setSize(v)}
            aria-label="Size"
          />
          <span className="text-right font-mono text-[12px] tabular-nums">{size}px</span>
        </div>

        <p className="border-t border-line-2 pt-3 text-meta leading-[1.5] text-muted">
          Each weight is a separate drawing, compiled from the same declaration — not one
          file with the stroke turned up.
        </p>
      </div>
    </div>
  );
}
