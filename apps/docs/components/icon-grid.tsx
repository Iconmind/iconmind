"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLook } from "@/components/icons-shell";
import { inkOf } from "@/components/customize-panel";
import { IconDrawer } from "@/components/icon-drawer";
import { IconHoverTip, useIconHoverTip } from "@/components/icon-hover-tip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cellName, useCell } from "@/lib/cells";
import { cn } from "@/lib/utils";

export interface GridIcon {
  slug: string; name: string; category: string; subcategory: string; tags: string; body: string;
}
export interface GridCategory { slug: string; name: string; count: number }

/** Prefix matches first — most queries are the start of a name, and those have to land
 *  with no perceptible delay. Substring is the fallback, never the first pass. */
function score(icon: GridIcon, q: string): number {
  if (!q) return 1;
  const { slug } = icon, name = icon.name.toLowerCase();
  if (slug === q) return 1000;
  if (slug.startsWith(q)) return 800 - slug.length;
  if (name.startsWith(q)) return 700 - name.length;
  if (slug.split("-").some((w) => w.startsWith(q))) return 600;
  if (icon.tags.split(" ").includes(q)) return 500;
  if (icon.tags.includes(q)) return 300;
  if (slug.includes(q)) return 200;
  return 0;
}

/** Three cell sizes. The grid is `auto-fill`, so this is a minimum rather than a count —
 *  the same control gives a 27" screen twelve columns and a laptop six. */
const DENSITY = {
  compact: { id: "compact", label: "S", min: 92, glyph: 0.82 },
  cosy: { id: "cosy", label: "M", min: 118, glyph: 1 },
  roomy: { id: "roomy", label: "L", min: 152, glyph: 1.28 },
} as const;
type DensityId = keyof typeof DENSITY;
const DENSITY_KEY = "iconmind-density";

export function IconGrid({ icons, categories }: { icons: GridIcon[]; categories: GridCategory[] }) {
  const { look } = useLook();
  const params = useSearchParams();
  const router = useRouter();
  const cat = params.get("cat") ?? "all";
  const [q, setQ] = useState(params.get("q") ?? "");
  const [labels, setLabels] = useState(true);
  const [density, setDensity] = useState<DensityId>("cosy");
  const [open, setOpen] = useState<string | null>(null);
  const search = useRef<HTMLInputElement>(null);
  const { bind, tip } = useIconHoverTip();

  // Read after mount: the server has no localStorage, and a value that differs between
  // the two renders is a hydration mismatch.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DENSITY_KEY);
      if (saved && saved in DENSITY) setDensity(saved as DensityId);
    } catch {
      /* private mode — the choice just does not survive the tab */
    }
  }, []);

  const pickDensity = (id: DensityId) => {
    setDensity(id);
    try {
      localStorage.setItem(DENSITY_KEY, id);
    } catch {
      /* as above */
    }
  };

  /*
   * The panel is open state; the address bar follows it.
   *
   * `history.pushState` rather than the router, because a router navigation would swap the
   * page under the panel and take the grid with it — and the whole reason the panel exists
   * is that the grid stays. The URL is still the icon's own page, so the link is real: it
   * is only this tab that is spared the round trip.
   *
   * The query string comes along. It is where the category and the search live, and both
   * the rail and this grid read them from there — so pushing a bare `/icons/agent/` while
   * filtered to AI dropped `?cat=ai`, and the grid silently went from ninety icons back to
   * seven hundred and fifty-six behind the panel. It looked like the icons had shrunk.
   */
  const qs = params.toString();
  const show = (slug: string) => {
    setOpen(slug);
    window.history.pushState({ iconmind: slug }, "", `/icons/${slug}/${qs ? `?${qs}` : ""}`);
  };
  const hide = () => {
    setOpen(null);
    if (window.history.state?.iconmind) window.history.back();
  };

  // Back and forward have to move through the panel, not past it.
  useEffect(() => {
    const onPop = () => setOpen((window.history.state?.iconmind as string) ?? null);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const bodies = useCell(cellName(look.variant, look.stroke));

  const results = useMemo(() => {
    const query = q.trim().toLowerCase().replace(/[\s_]+/g, "-");
    return icons
      .filter((i) => cat === "all" || i.category === cat)
      .map((i) => ({ i, s: score(i, query) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s || a.i.slug.localeCompare(b.i.slug))
      .map((r) => r.i);
  }, [icons, q, cat]);

  const ink = inkOf(look.colour);
  const catName = cat === "all" ? "All icons" : categories.find((c) => c.slug === cat)?.name ?? cat;
  const catNameOf = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;
  const blurb = q.trim()
    ? "Matching name, tag and alias across the full set."
    : cat === "all"
      ? "The complete set, drawn on a 24×24 grid. Adjust the controls on the left and every icon updates in place."
      : `Everything in ${catName}.`;

  const attrs = {
    fill: "none", stroke: "currentColor", strokeWidth: look.stroke,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  };

  const cell = DENSITY[density];
  const glyph = Math.round(look.size * cell.glyph);

  // The search field pushes the query into the URL so a search is a link somebody can
  // send, and the rail's category links carry it with them.
  const setQuery = (value: string) => {
    setQ(value);
    const next = new URLSearchParams();
    if (cat !== "all") next.set("cat", cat);
    if (value.trim()) next.set("q", value.trim());
    const s = next.toString();
    router.replace(`/icons/${s ? `?${s}` : ""}`, { scroll: false });
  };

  return (
    <div className="pb-24">
      <div className="px-5 pt-7 sm:px-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <h1 className="text-h1 font-semibold">{q.trim() ? `“${q.trim()}”` : catName}</h1>
              <span className="mt-1 rounded-pill bg-sunk px-2.5 py-1 font-mono text-[11px] tabular-nums text-muted">
                {results.length}
              </span>
            </div>
            <p className="mt-1.5 max-w-[560px] text-body leading-relaxed text-muted">{blurb}</p>
          </div>

          <div className="flex flex-none items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <a href="/sprite.svg" download>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3.5v11.6M7.4 10.6l4.6 4.6 4.6-4.6" />
                  <path d="M4 17.5v2.4a.6.6 0 0 0 .6.6h14.8a.6.6 0 0 0 .6-.6v-2.4" />
                </svg>
                Download set
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/*
       * The toolbar sticks under the header.
       *
       * Browsing 756 icons means scrolling a long way from the search field, and the two
       * things you reach for while scrolling are "search again" and "make them smaller".
       * Both are now always in reach; the ground is opaque-ish so the grid does not show
       * through the type.
       */}
      <div className="sticky top-[60px] z-30 mt-5 border-y border-line bg-[color-mix(in_srgb,var(--color-page)_92%,transparent)] px-5 py-2.5 backdrop-blur-[14px] sm:px-7">
        <div className="flex items-center gap-2.5">
          <div className="relative min-w-0 flex-1">
            <svg
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
              width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20.5 20.5 16.9 16.9" />
            </svg>
            <Input
              ref={search}
              type="search"
              value={q}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape" && q) {
                  e.preventDefault();
                  setQuery("");
                }
              }}
              placeholder={`Search ${icons.length} icons by name, tag or alias…`}
              aria-label="Search icons"
              className="h-9 pl-9"
            />
            {q ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  search.current?.focus();
                }}
                aria-label="Clear search"
                className="absolute top-1/2 right-2 grid size-6 -translate-y-1/2 place-items-center rounded-sm text-muted transition-colors hover:bg-sunk hover:text-ink"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" aria-hidden="true">
                  <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />
                </svg>
              </button>
            ) : (
              <Kbd className="absolute top-1/2 right-2.5 hidden -translate-y-1/2 sm:inline-flex">/</Kbd>
            )}
          </div>

          <Separator orientation="vertical" className="hidden h-6 sm:block" />

          <ToggleGroup
            type="single"
            value={density}
            onValueChange={(v) => v && pickDensity(v as DensityId)}
            aria-label="Cell size"
            className="hidden w-auto sm:flex"
          >
            {Object.values(DENSITY).map((d) => (
              <Tooltip key={d.id}>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value={d.id} className="w-8 flex-none font-mono">
                    {d.label}
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>{d.id} cells</TooltipContent>
              </Tooltip>
            ))}
          </ToggleGroup>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={labels ? "secondary" : "ghost"}
                size="icon-lg"
                aria-pressed={labels}
                aria-label={labels ? "Hide names" : "Show names"}
                onClick={() => setLabels(!labels)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 6.5h16M4 12h16M4 17.5h10" />
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{labels ? "Hide names" : "Show names"}</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="px-5 pt-5 sm:px-7">
        {results.length === 0 ? (
          <div className="mx-auto max-w-[46ch] rounded-2xl border border-line bg-panel px-7 py-16 text-center shadow-panel">
            <div className="mx-auto grid size-11 place-items-center rounded-xl bg-sunk text-muted">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20.5 20.5 16.9 16.9M8.6 11h4.8" />
              </svg>
            </div>
            <p className="mt-4 text-[17px] font-semibold">No icon matches “{q}”</p>
            <p className="mt-1.5 text-ui leading-relaxed text-muted">
              That is the most useful thing this page can tell us — requests are what decide
              which icons get drawn next. Most ship in the following minor.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Button asChild>
                <a
                  href={`https://github.com/iconmind/iconmind/issues/new?template=icon-request.yml&title=${encodeURIComponent(`[Icon] ${q}`)}`}
                >
                  Request “{q.trim()}”
                </a>
              </Button>
              <Button variant="outline" onClick={() => setQuery("")}>
                Clear search
              </Button>
            </div>
          </div>
        ) : (
          // Hairlines as outlines rather than a gap over a coloured ground: the last row
          // is almost never full, and `gap-px` on `bg-line-2` paints the remainder of it
          // flat grey — which reads as icons that failed to load.
          <div
            {...bind}
            className="grid overflow-hidden rounded-2xl border border-line bg-panel"
            style={{ gridTemplateColumns: `repeat(auto-fill,minmax(${cell.min}px,1fr))` }}
          >
            {results.map((icon) => (
              // A real link that a plain click intercepts. Middle-click, ⌘-click and a
              // crawler all get the icon's page; a plain click gets the panel, because
              // leaving the grid to look at one icon is the thing browsing cannot afford.
              <Link
                key={icon.slug}
                href={`/icons/${icon.slug}/`}
                data-tip={icon.name}
                data-tip-meta={catNameOf(icon.category)}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                  e.preventDefault();
                  show(icon.slug);
                }}
                className={cn(
                  "group relative flex aspect-square w-full flex-col items-center justify-center gap-[11px] outline outline-line-2 -outline-offset-[0.5px] transition-colors",
                  open === icon.slug ? "bg-accent-soft" : "bg-panel hover:bg-sunk",
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg" width={glyph} height={glyph} viewBox="0 0 24 24"
                  {...attrs}
                  className="transition-transform duration-150 group-hover:scale-110"
                  style={{ color: ink, overflow: "visible" }} aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: bodies?.[icon.slug] ?? icon.body }}
                />
                {labels && (
                  <span
                    className="max-w-[88%] truncate font-mono text-[10.5px] text-muted transition-colors group-hover:text-ink-2"
                    style={{ color: open === icon.slug ? "var(--color-accent)" : undefined }}
                  >
                    {icon.slug}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>

      <IconHoverTip tip={tip} />

      <IconDrawer
        slug={open}
        icons={icons}
        categories={categories}
        initial={look}
        onClose={hide}
        onPick={show}
      />
    </div>
  );
}
