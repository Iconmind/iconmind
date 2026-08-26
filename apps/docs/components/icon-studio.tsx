"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CustomizePanel, inkOf, weightOf } from "@/components/customize-panel";
import { IconInAction, type Neighbour } from "@/components/icon-in-action";
import { useLook } from "@/components/icons-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTriggerBare } from "@/components/ui/tabs";
import { FrameworkMenu } from "@/components/framework-menu";
import { frameworkOf, rememberedFramework, rememberFramework, type Look as SnippetLook } from "@/lib/snippets";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface StudioCell { variant: string; weight: string; body: string }
export interface StudioSpec { category: string; elements: number; bytes: number; added: string }

const TABS = [["code", "Code"], ["svg", "SVG"], ["sprite", "Sprite"]] as const;
const SIZES = [16, 20, 24, 32, 48] as const;
const STROKE_OF: Record<string, number> = { thin: 1.5, regular: 2, bold: 2.5 };

const pascal = (slug: string) =>
  slug.split("-").map((w) => w[0]!.toUpperCase() + w.slice(1)).join("");

/**
 * One icon, its controls, and what it looks like in use.
 *
 * The look comes from the section's shared state, so what you were browsing in is what
 * this opens in — but the panel is rendered here rather than in the rail, because on this
 * route the rail is only the category list. One customiser on screen, next to the thing it
 * changes.
 *
 * The cells come in as props rather than over the network: a single icon's six bodies are
 * about three kilobytes and the page already has them at build time.
 */
export function IconStudio({
  name, slug, category, cells, neighbours, spec,
}: {
  name: string; slug: string; category: string;
  cells: StudioCell[]; neighbours: Neighbour[]; spec: StudioSpec;
}) {
  const { look, setLook, setHere } = useLook();
  const [tab, setTab] = useState<(typeof TABS)[number][0]>("code");
  const [framework, setFramework] = useState("react");
  useEffect(() => setFramework(rememberedFramework()), []);
  const pickFramework = (id: string) => { setFramework(id); rememberFramework(id); };

  // Tell the rail which category we are in, and clear it on the way out.
  useEffect(() => {
    setHere(category);
    return () => setHere(null);
  }, [category, setHere]);

  const weight = weightOf(look.stroke);

  const cell =
    cells.find((c) => c.variant === look.variant && c.weight === weight) ??
    cells.find((c) => c.variant === look.variant) ??
    cells[0];
  if (!cell) return null;

  const body = cell.body;
  const ink = inkOf(look.colour);
  const attrs = {
    fill: "none", stroke: "currentColor", strokeWidth: look.stroke,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  };

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${look.size}" height="${look.size}" viewBox="0 0 24 24"\n  ` +
    `fill="none" stroke="currentColor" stroke-width="${look.stroke}"\n  stroke-linecap="round" stroke-linejoin="round">` +
    `\n  ${body.replace(/></g, ">\n  <")}\n</svg>`;

  const component = pascal(slug);
  const hex = look.colour === "ink" ? null : inkOf(look.colour);
  const snippetLook: SnippetLook = {
    variant: look.variant, weightName: weight, size: look.size,
    hex: hex && !hex.startsWith("var(") ? hex : null,
  };
  const fw = frameworkOf(framework);
  const code =
    tab === "code"
      ? fw.code(component, slug, snippetLook)
      : tab === "sprite"
        ? `<svg width="${look.size}" height="${look.size}">\n  <use href="/sprite.svg#im-${slug}" />\n</svg>`
        : svg;
  const copyLabel = tab === "code" ? fw.label : TABS.find(([id]) => id === tab)![1];

  // Confirmation as a toast rather than a label swap: the button stays where it was, and
  // two copies in a row are two toasts rather than one indistinguishable flicker.
  const copy = (text: string, what: string) => async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${what} copied`, { description: slug });
    } catch {
      toast.error("Clipboard blocked", { description: "The code is on screen — select and copy." });
    }
  };

  const draw = (size: number) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" ` +
    `fill="none" stroke="currentColor" stroke-width="${look.stroke}" stroke-linecap="round" stroke-linejoin="round"` +
    ` style="display:block;overflow:visible">${body}</svg>`;

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_272px]">
        <div className="min-w-0">
          {/*
            * The stage, and the ladder under it.
            *
            * This used to be a 220px-tall band with the drawing at 76px in the middle of
            * it and the size ladder standing in a column down the right. Two things were
            * wrong with that. The drawing — the thing the page is *about* — occupied
            * about a twentieth of its own panel and read as a thumbnail that had failed
            * to load at full size. And the ladder, stacked vertically, compared five
            * icons along the axis nobody judges an icon on: they were left-aligned at
            * different sizes, so 16 and 48 did not share a baseline or a centre.
            *
            * The drawing now gets a stage of its own at 160px, and the ladder runs
            * horizontally beneath it on one baseline, which is how a type specimen shows
            * a size run and for the same reason.
            */}
          <Card className="overflow-hidden">
            {/*
              * 192, not 200 — because 192 ÷ 24 is 8 and 200 ÷ 24 is 8.333.
              *
              * The ground is the drawing's own grid, so its pitch has to be one unit of
              * the icon. At a whole 8px every rule lands on a pixel boundary and every
              * anchor in the icon lands on an intersection; at 8.333 most rules fall on a
              * fraction and the grid renders blurry, which is the thing it is here to
              * argue against.
              *
              * Full bleed rather than a plate. A 240px square floating in an 800px panel
              * read as a component that had failed to fill its container, and it made the
              * panel look empty at the same time as making the drawing look small. The
              * grid runs to the edges now and the icon sits on it, which is also the
              * honest picture: the grid does not stop where the icon does.
              */}
            <div
              className="artboard relative grid min-h-[300px] place-items-center px-6 py-10"
              style={{ color: ink, "--unit": "8px" } as CSSProperties}
            >
              <span dangerouslySetInnerHTML={{ __html: draw(192) }} />
              <span className="absolute top-3.5 left-4 font-mono text-[10.5px] text-muted">
                {look.variant} · {weight} · {look.stroke.toFixed(2)}
              </span>
              {/* The chip is the icon at the size the controls are set to — which is the
                  size the copied SVG will be. A chip reading "160px" would have been the
                  stage's magnification sitting next to a Size control saying 24, and two
                  numbers for one thing is one number too many. */}
              <span className="absolute right-3.5 bottom-3.5 flex items-center gap-2 rounded-md border border-line-2 bg-panel px-2.5 py-1.5">
                <span dangerouslySetInnerHTML={{ __html: draw(look.size) }} />
                <span className="font-mono text-[10.5px] tabular-nums text-muted">{look.size}px</span>
              </span>
            </div>

            {/* "Does it hold at 16" is a question asked while looking at the big one, so
                the answer stays in the same card. */}
            <div
              className="flex items-end justify-center gap-8 border-t border-line-2 px-6 py-5 sm:gap-12"
              style={{ color: ink }}
            >
              {SIZES.map((s) => (
                <Tooltip key={s}>
                  <TooltipTrigger asChild>
                    <div className="flex cursor-default flex-col items-center gap-2.5">
                      <span dangerouslySetInnerHTML={{ __html: draw(s) }} />
                      <span className="font-mono text-[10px] tabular-nums text-muted">{s}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Rendered at {s}px</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </Card>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button onClick={copy(code, copyLabel)}>
              <CopyIcon />
              Copy {copyLabel}
            </Button>
            <Button variant="outline" onClick={copy(slug, "Name")}>
              Copy name
            </Button>
            <Button asChild variant="outline">
              <a href={`/icons/${slug}.svg`} download>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3.5v11.6M7.4 10.6l4.6 4.6 4.6-4.6" />
                  <path d="M4 17.5v2.4a.6.6 0 0 0 .6.6h14.8a.6.6 0 0 0 .6-.6v-2.4" />
                </svg>
                Download
              </a>
            </Button>

            <div className="ml-auto flex items-center gap-1.5">
              {tab === "code" && <FrameworkMenu value={framework} onChange={pickFramework} />}
              <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
                <TabsList className="bg-transparent p-0">
                  {TABS.map(([id, label]) => (
                    <TabsTriggerBare key={id} value={id}>
                      {label}
                    </TabsTriggerBare>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Scrolled sideways rather than wrapped — same reason as the drawer: wrapping
              splits `stroke-linejoin="round"` across two lines on a phone, and the
              snippet stops looking like the code it is. */}
          <pre className="m-0 mt-2.5 overflow-x-auto rounded-xl border border-line-2 bg-sunk px-4 py-3.5 font-mono text-[12px] leading-[1.6] whitespace-pre text-ink-2">
            {code}
          </pre>
          {tab === "code" && (
            <button
              onClick={copy(fw.install, "Install command")}
              className="mt-1.5 flex w-full items-center justify-between rounded-lg border border-line-2 px-3 py-2 text-left font-mono text-[11.5px] text-muted transition-colors hover:border-line hover:text-ink-2"
            >
              <span>$ {fw.install}</span>
              <span className="text-[10.5px] uppercase tracking-wide">copy</span>
            </button>
          )}

          {/* Inside the left column on purpose. As a sibling below the grid it left the
              row as tall as the sidebar, which is three cards deep — about 280px of empty
              page between the code and the next heading on a 1440px screen. */}
          <section className="mt-8">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="text-[15px] font-semibold tracking-[-0.01em]">See it in action</h2>
              <span className="font-mono text-mono text-muted">
                {look.variant} · {look.stroke.toFixed(2)}
              </span>
            </div>
            <IconInAction name={name} slug={slug} attrs={attrs} body={body} neighbours={neighbours} />
          </section>
        </div>

        <aside className="grid gap-2.5 lg:sticky lg:top-[76px] lg:self-start">
          <Card className="px-3.5 py-3.5">
            <p className="label mb-3">Customize</p>
            <CustomizePanel look={look} onChange={setLook} compact />
          </Card>

          <Card className="px-3.5 py-3.5">
            <div className="mb-2.5 flex items-baseline justify-between">
              <p className="label">Cells</p>
              <span className="font-mono text-mono text-muted">{cells.length} of 6</span>
            </div>
            <div className="grid grid-cols-4 gap-px overflow-hidden rounded-md border border-line-2 bg-line-2">
              {cells.map((c) => {
                const on = c.variant === look.variant && c.weight === weight;
                return (
                  <Tooltip key={`${c.variant}-${c.weight}`}>
                    <TooltipTrigger asChild>
                      <button
                        aria-label={`${c.variant} ${c.weight}`}
                        aria-pressed={on}
                        onClick={() =>
                          setLook({
                            ...look,
                            variant: c.variant as typeof look.variant,
                            stroke: STROKE_OF[c.weight] ?? 2,
                          })
                        }
                        className={cn(
                          "grid aspect-square place-items-center transition-colors",
                          on ? "bg-accent-soft text-accent" : "bg-panel text-ink-2 hover:bg-sunk",
                        )}
                        dangerouslySetInnerHTML={{
                          __html:
                            `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" ` +
                            `fill="none" stroke="currentColor" stroke-width="${STROKE_OF[c.weight] ?? 2}" stroke-linecap="round" stroke-linejoin="round"` +
                            `>${c.body}</svg>`,
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      {c.variant} · {c.weight}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
              {/* Eight slots for at most six cells, so a missing one is a visible gap
                  rather than a shorter row nobody notices. */}
              {Array.from({ length: (4 - (cells.length % 4)) % 4 }, (_, i) => (
                <span key={`gap${i}`} className="aspect-square bg-panel" />
              ))}
            </div>
          </Card>

          {/* Reference — read once, then ignored — so it gets the smallest type on the
              screen and the last position in the column. */}
          <Card className="px-3.5 py-2.5">
            <dl>
              <Row k="Category">{spec.category}</Row>
              <Row k="Elements">{spec.elements}</Row>
              <Row k="Size">{spec.bytes} B</Row>
              <Row k="Added">{spec.added}</Row>
              <Row k="Licence">MIT</Row>
            </dl>
          </Card>
        </aside>
      </div>

    </>
  );
}

function Row({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line-2 py-1.5 last:border-0">
      <dt className="label">{k}</dt>
      <dd className="truncate text-right font-mono text-[10.5px] text-ink-2">{children}</dd>
    </div>
  );
}

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="11.5" height="11.5" rx="2.2" />
    <path d="M5.5 15H4.6a1.1 1.1 0 0 1-1.1-1.1V4.6a1.1 1.1 0 0 1 1.1-1.1h9.3a1.1 1.1 0 0 1 1.1 1.1v.9" />
  </svg>
);
