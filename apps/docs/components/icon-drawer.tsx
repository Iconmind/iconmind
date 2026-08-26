"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Sheet,
  SheetCloseButton,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTriggerBare } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FrameworkMenu } from "@/components/framework-menu";
import { frameworkOf, rememberedFramework, rememberFramework, type Look as SnippetLook } from "@/lib/snippets";
import { CustomizePanel, inkOf, weightOf, type Look } from "@/components/customize-panel";
import { cellName, useCell } from "@/lib/cells";
import type { GridCategory, GridIcon } from "@/components/icon-grid";

// No Vue tab: the package is generated but not published, and the docs say so. A code
// sample for an import that fails is worse than not offering it.
const TABS = [["code", "Code"], ["svg", "SVG"], ["sprite", "Sprite"]] as const;

const pascal = (slug: string) =>
  slug.split("-").map((w) => w[0]!.toUpperCase() + w.slice(1)).join("");

/** `n` items spread evenly across a list, in order. */
function spread<T>(list: T[], n: number): T[] {
  if (list.length <= n) return list;
  const step = list.length / n;
  return Array.from({ length: n }, (_, i) => list[Math.floor(i * step)]!);
}

/**
 * The detail panel, over the grid.
 *
 * Opening it does not navigate: the grid and the rail stay exactly where they were, which
 * is the point of browsing a set — you look at one, close it, and you are still in the same
 * place at the same scroll position. The address bar is updated anyway, so the icon on
 * screen is always the icon the URL names and a link is a link.
 *
 * Landing on that URL cold renders the static page instead, which carries the same detail
 * in its HTML. Next's intercepting routes would collapse the two into one file — they are
 * the feature this pattern is named after — but they are not supported under
 * `output: export`. So there are two renderings of one thing, and they share
 * `CustomizePanel` and the cell store so they cannot drift.
 *
 * ── On the density ──────────────────────────────────────────────────────────────────
 * The panel used to run about 1100px tall for one icon: a 210px preview, a boxed
 * customiser, then the code, then the related strip, each with its own heading and 26px
 * of air. Everything below the fold was invisible on a laptop, which meant the code
 * sample — the reason most people open this — was a scroll away.
 *
 * It now fits above the fold at 900px. The customiser moved into a popover, because it is
 * a thing you set once and then browse with rather than a thing you read; the size and
 * weight it is set to are still on screen, in the chip that opens it. The rest is the
 * same content at the same reading sizes, with the boxes taken off.
 */
export function IconDrawer({
  slug, icons, categories, initial, onClose, onPick,
}: {
  slug: string | null;
  icons: GridIcon[];
  categories: GridCategory[];
  initial: Look;
  onClose: () => void;
  onPick: (slug: string) => void;
}) {
  const [look, setLook] = useState<Look>(initial);
  const [tab, setTab] = useState<(typeof TABS)[number][0]>("code");
  const [framework, setFramework] = useState("react");
  useEffect(() => setFramework(rememberedFramework()), []);
  const pickFramework = (id: string) => { setFramework(id); rememberFramework(id); };

  // Each opening starts from what the grid is showing; changes after that are the
  // drawer's own. Anything else means the panel disagrees with the cell you clicked.
  useEffect(() => {
    if (slug) setLook(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const icon = slug ? icons.find((i) => i.slug === slug) : undefined;
  const bodies = useCell(cellName(look.variant, look.stroke));
  const body = (slug && bodies?.[slug]) || icon?.body || "";
  const change = useCallback((open: boolean) => !open && onClose(), [onClose]);

  const ink = inkOf(look.colour);
  const attrs = {
    fill: "none", stroke: "currentColor", strokeWidth: look.stroke,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  };

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${look.size}" height="${look.size}" viewBox="0 0 24 24"\n  ` +
    `fill="none" stroke="currentColor" stroke-width="${look.stroke}"\n  stroke-linecap="round" stroke-linejoin="round">` +
    `\n  ${body.replace(/></g, ">\n  <")}\n</svg>`;

  const name = icon ? pascal(icon.slug) : "";
  // Only what differs from the default, so the snippet is the shortest thing that
  // reproduces what is on the canvas. `ink` is `currentColor`, so it is never emitted.
  const hex = look.colour === "ink" ? null : inkOf(look.colour);
  const props = [
    look.variant !== "outline" && `variant="${look.variant}"`,
    look.stroke !== 2 && `weight="${weightOf(look.stroke)}"`,
    look.size !== 24 && `size={${look.size}}`,
    hex && !hex.startsWith("var(") && `color="${hex}"`,
  ].filter(Boolean).join("\n  ");

  const snippetLook: SnippetLook = {
    variant: look.variant, weightName: weightOf(look.stroke), size: look.size,
    hex: hex && !hex.startsWith("var(") ? hex : null,
  };
  const fw = frameworkOf(framework);
  const code =
    tab === "code"
      ? fw.code(name, icon?.slug ?? "", snippetLook)
      : tab === "sprite"
        ? `<svg width="${look.size}" height="${look.size}">\n  <use href="/sprite.svg#im-${icon?.slug ?? ""}" />\n</svg>`
        : svg;

  /*
   * Confirmation as a toast, not as a label.
   *
   * Every copy control here used to swap its own text to "Copied" for 1.4 seconds — which
   * moves the thing under the cursor, and makes two copies in a row indistinguishable. A
   * toast names what went to the clipboard and leaves the button alone.
   */
  const copy = (text: string, what: string) => async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${what} copied`, { description: icon?.slug });
    } catch {
      toast.error("Clipboard blocked", { description: "The code is on screen — select and copy." });
    }
  };

  // Spread rather than the first five: `agent-add`, `agent-alert`, `agent-check` is one
  // drawing with three marks on it, and a strip of those says nothing about the category.
  const related = icon
    ? spread(icons.filter((i) => i.category === icon.category && i.slug !== icon.slug), 6)
    : [];
  const categoryName = icon
    ? categories.find((c) => c.slug === icon.category)?.name ?? icon.category
    : "";
  // Tags and aliases arrive joined; the same word can be in both.
  const tags = icon ? [...new Set(icon.tags.split(" ").filter(Boolean))].slice(0, 5) : [];

  return (
    <Sheet open={slug !== null} onOpenChange={change}>
      <SheetContent
        side="right"
        className="w-[25rem] max-w-full border-line bg-panel p-0 shadow-[-24px_0_60px_-30px_rgba(20,14,8,.5)]"
      >
        <SheetHeader className="px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <Link
              href={`/categories/${icon?.category ?? ""}/`}
              className="label transition-colors hover:text-accent"
            >
              {categoryName}
            </Link>
            <span className="text-line">/</span>
            <span className="truncate font-mono text-mono text-ink-2">{icon?.slug}</span>
          </div>
          <SheetCloseButton />
        </SheetHeader>

        {icon && (
          <div className="px-4 pt-4 pb-6">
            {/* The preview and the reading share a row. The big drawing answers "what is
                this"; the chip in the corner is the icon at the size the controls are set
                to, which is the size the copied SVG will be — and the only way to see
                whether it survives it. */}
            {/* 96 rather than 84, for the same reason as the detail page's 192: the ground
                is the icon's own grid, and 96 ÷ 24 is a whole 4px per unit. */}
            <div
              className="artboard relative grid h-[150px] place-items-center rounded-xl border border-line-2"
              style={{ color: ink, "--unit": "4px" } as CSSProperties}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg" width={96} height={96} viewBox="0 0 24 24"
                {...attrs} style={{ overflow: "visible" }} aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: body }}
              />
              <div className="absolute right-2.5 bottom-2.5 flex items-center gap-2 rounded-md border border-line-2 bg-panel px-2 py-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg" width={look.size} height={look.size} viewBox="0 0 24 24"
                  {...attrs} style={{ overflow: "visible" }} aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: body }}
                />
                <span className="font-mono text-[10px] tabular-nums text-muted">{look.size}px</span>
              </div>

              {/* The controls live behind this chip. It is also the readout, so the panel
                  never has to spend a row saying what it is set to. */}
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="absolute top-2.5 right-2.5 flex h-7 items-center gap-1.5 rounded-md border border-line-2 bg-panel px-2 font-mono text-[10px] text-muted transition-colors hover:border-accent hover:text-ink"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M5 7h14M5 12h9M5 17h5" />
                    </svg>
                    {look.variant} · {weightOf(look.stroke)}
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-[17rem]">
                  <p className="label mb-3">Customize</p>
                  <CustomizePanel look={look} onChange={setLook} compact />
                </PopoverContent>
              </Popover>
            </div>

            <div className="mt-3.5 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <SheetTitle className="truncate text-[1.0625rem] leading-snug font-semibold tracking-[-0.02em]">
                  {icon.name}
                </SheetTitle>
                <SheetDescription className="mt-0.5 truncate font-mono text-[11px] text-muted">
                  {icon.slug}
                </SheetDescription>
              </div>
              <Button asChild variant="ghost" size="sm" className="-mr-1.5 shrink-0 text-accent hover:text-accent">
                <a href={`/icons/${icon.slug}/`}>
                  Full page
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8.5 7H17v8.5" />
                  </svg>
                </a>
              </Button>
            </div>

            {tags.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1">
                {tags.map((t) => (
                  <Badge key={t} variant="muted" className="px-2 py-px">
                    {t}
                  </Badge>
                ))}
              </div>
            )}

            <div className="mt-4 flex gap-1.5">
              <Button onClick={copy(svg, "SVG")} className="flex-1">
                <CopyIcon />
                Copy SVG
              </Button>
              <IconAction label="Copy name" onClick={copy(icon.slug, "Name")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 7h11M4 12h16M4 17h9" />
                </svg>
              </IconAction>
              <IconAction label="Download SVG" href={`/icons/${icon.slug}.svg`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3.5v11.6M7.4 10.6l4.6 4.6 4.6-4.6" />
                  <path d="M4 17.5v2.4a.6.6 0 0 0 .6.6h14.8a.6.6 0 0 0 .6-.6v-2.4" />
                </svg>
              </IconAction>
            </div>

            <div className="mt-5">
              <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
                <div className="flex items-center justify-between">
                  <TabsList className="bg-transparent p-0">
                    {TABS.map(([id, label]) => (
                      <TabsTriggerBare key={id} value={id}>
                        {label}
                      </TabsTriggerBare>
                    ))}
                  </TabsList>
                  <div className="flex items-center gap-1">
                    {tab === "code" && <FrameworkMenu value={framework} onChange={pickFramework} />}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Copy snippet" onClick={copy(code, "Snippet")}>
                          <CopyIcon />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Copy snippet</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </Tabs>
              {/* Scrolled sideways rather than wrapped. In a 400px panel, wrapping breaks
                  `stroke-linecap="round"` across two lines mid-attribute, and the snippet
                  stops looking like the code it is. */}
              <pre className="m-0 mt-1.5 max-h-[13rem] overflow-auto rounded-lg border border-line-2 bg-sunk px-3.5 py-3 font-mono text-mono leading-[1.65] whitespace-pre text-ink-2">
                {code}
              </pre>
              {tab === "code" && (
                <button
                  onClick={copy(fw.install, "Install command")}
                  className="mt-1.5 flex w-full items-center justify-between rounded-lg border border-line-2 px-3 py-1.5 text-left font-mono text-[11px] text-muted transition-colors hover:border-line hover:text-ink-2"
                >
                  <span>$ {fw.install}</span>
                  <span className="text-[10px] uppercase tracking-wide">copy</span>
                </button>
              )}
            </div>

            {related.length > 0 && (
              <div className="mt-5">
                <div className="mb-2 flex items-baseline justify-between">
                  <p className="label">More in {categoryName}</p>
                  <Link
                    href={`/icons/?cat=${icon.category}`}
                    className="font-mono text-[10.5px] text-muted transition-colors hover:text-accent"
                  >
                    see all
                  </Link>
                </div>
                <div className="grid grid-cols-6 gap-px overflow-hidden rounded-lg border border-line-2 bg-line-2">
                  {related.map((r) => (
                    <Tooltip key={r.slug}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => onPick(r.slug)}
                          aria-label={r.name}
                          className="grid aspect-square place-items-center bg-panel text-ink transition-colors hover:bg-sunk"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                            strokeLinejoin="round" aria-hidden="true"
                            dangerouslySetInnerHTML={{ __html: bodies?.[r.slug] ?? r.body }}
                          />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>{r.name}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

/** A square button whose only label is its tooltip — the row has room for one worded
 *  action and the primary one has taken it. */
function IconAction({
  label, onClick, href, children,
}: {
  label: string;
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {href ? (
          <Button asChild variant="outline" size="icon-lg" aria-label={label}>
            <a href={href} download>
              {children}
            </a>
          </Button>
        ) : (
          <Button variant="outline" size="icon-lg" aria-label={label} onClick={onClick}>
            {children}
          </Button>
        )}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="11.5" height="11.5" rx="2.2" />
    <path d="M5.5 15H4.6a1.1 1.1 0 0 1-1.1-1.1V4.6a1.1 1.1 0 0 1 1.1-1.1h9.3a1.1 1.1 0 0 1 1.1 1.1v.9" />
  </svg>
);
