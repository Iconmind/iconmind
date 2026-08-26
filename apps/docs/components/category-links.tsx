"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export interface ShellCategory { slug: string; name: string; count: number }

/*
 * ── Why this is its own file ─────────────────────────────────────────────────────────
 *
 * `useSearchParams()` cannot be resolved when a page is prerendered — the query string is
 * not known at build time — so React bails the nearest Suspense boundary out to
 * client-side rendering and emits the fallback into the static HTML instead.
 *
 * That is fine for a control. It was not fine here: the hook lived in `IconsShell`, the
 * component that also renders `{children}` — so the boundary that bailed out contained
 * every icon's page. All 765 of them shipped `<main><template
 * data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template></main>` and nothing else. A
 * crawler that does not run JavaScript saw a header, a footer, and an empty page, on the
 * 765 URLs that are the entire point of the site being indexable.
 *
 * So the hook is quarantined here, in the one component that genuinely needs it, and it
 * is wrapped in its own boundary. `{children}` is now outside it and prerenders.
 *
 * The fallback is not a spinner. It is the same list with plain `?cat=` links — real
 * anchors a crawler can follow, and what a reader sees for the one frame before hydration.
 * The only thing the live version adds is carrying an existing `?q=` across, which is a
 * convenience for somebody mid-search and worth exactly nothing to a crawler.
 */
function itemClass(active: boolean) {
  return cn(
    "flex w-full items-center justify-between gap-3 rounded-md px-[9px] py-1.5 text-left text-ui transition-colors",
    active ? "bg-accent-soft font-semibold text-accent" : "text-ink-2 hover:bg-sunk hover:text-ink",
  );
}

function chipClass(active: boolean) {
  return cn(
    "flex items-center gap-1.5 rounded-pill border px-3 py-1.5 text-ui whitespace-nowrap transition-colors",
    active ? "border-accent bg-accent-soft font-semibold text-accent" : "border-line bg-panel text-ink-2",
  );
}

function List({
  categories, active, hrefOf, variant,
}: {
  categories: ShellCategory[];
  active: string;
  hrefOf: (slug: string) => string;
  variant: "rail" | "chips";
}) {
  if (variant === "chips")
    return (
      <div className="flex w-max gap-1.5">
        {categories.map((c) => (
          <Link key={c.slug} href={hrefOf(c.slug)} className={chipClass(active === c.slug)}>
            {c.name}
            <span className="font-mono text-[10.5px] tabular-nums opacity-60">{c.count}</span>
          </Link>
        ))}
      </div>
    );

  return (
    <div className="grid gap-px">
      {categories.map((c) => (
        <Link key={c.slug} href={hrefOf(c.slug)} className={itemClass(active === c.slug)}>
          <span className="truncate">{c.name}</span>
          <span className="shrink-0 font-mono text-[11px] tabular-nums opacity-55">{c.count}</span>
        </Link>
      ))}
    </div>
  );
}

/** The live version: reads the URL so a category link keeps whatever is being searched. */
function Live({
  categories, here, onGrid, variant,
}: {
  categories: ShellCategory[];
  here: string | null;
  onGrid: boolean;
  variant: "rail" | "chips";
}) {
  const params = useSearchParams();
  // On the grid the filter decides which one is lit; on an icon's page the icon does.
  const active = onGrid ? params.get("cat") ?? "all" : here ?? params.get("cat") ?? "all";
  const q = params.get("q");

  const hrefOf = (slug: string) => {
    const qs = new URLSearchParams();
    if (slug !== "all") qs.set("cat", slug);
    if (q) qs.set("q", q);
    const s = qs.toString();
    return `/icons/${s ? `?${s}` : ""}`;
  };

  return <List categories={categories} active={active} hrefOf={hrefOf} variant={variant} />;
}

export function CategoryLinks({
  categories, here, onGrid, variant,
}: {
  categories: ShellCategory[];
  here: string | null;
  onGrid: boolean;
  variant: "rail" | "chips";
}) {
  const plain = (slug: string) => (slug === "all" ? "/icons/" : `/icons/?cat=${slug}`);
  return (
    <Suspense
      fallback={
        <List categories={categories} active={here ?? "all"} hrefOf={plain} variant={variant} />
      }
    >
      <Live categories={categories} here={here} onGrid={onGrid} variant={variant} />
    </Suspense>
  );
}
