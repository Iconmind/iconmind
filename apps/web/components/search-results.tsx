"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Kbd } from "@/components/ui/kbd";

export interface SearchIcon {
  slug: string; name: string; category: string; subcategory: string;
  description: string; tags: string[]; body: string;
}

/** Ranking mirrors doc 09 §9.6 — exact, then prefix, then tag, then substring. */
function rank(i: SearchIcon, q: string) {
  const name = i.name.toLowerCase();
  if (i.slug === q) return { s: 1000, why: "exact name" };
  if (i.slug.startsWith(q)) return { s: 800 - i.slug.length, why: "name starts with" };
  if (name.startsWith(q)) return { s: 700 - name.length, why: "name starts with" };
  if (i.slug.split("-").some((w) => w.startsWith(q))) return { s: 600, why: "word in name" };
  const tag = i.tags.find((t) => t === q) ?? i.tags.find((t) => t.startsWith(q)) ?? i.tags.find((t) => t.includes(q));
  if (tag) return { s: tag === q ? 500 : 350, why: `tag “${tag}”` };
  if (i.slug.includes(q) || name.includes(q)) return { s: 200, why: "name contains" };
  if (i.description.toLowerCase().includes(q)) return { s: 120, why: "description" };
  return { s: 0, why: "" };
}

/** Cheap edit distance, only used to suggest something when nothing matched. */
function near(a: string, b: string) {
  const m = a.length, n = b.length;
  if (Math.abs(m - n) > 3) return 99;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) d[0]![j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      d[i]![j] = Math.min(d[i - 1]![j]! + 1, d[i]![j - 1]! + 1, d[i - 1]![j - 1]! + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m]![n]!;
}

export function SearchResults({ icons }: { icons: SearchIcon[] }) {
  const params = useSearchParams();
  const [q, setQ] = useState("");

  // The URL is the state, so a search can be pasted into Slack and land the same way.
  useEffect(() => { setQ(params.get("q") ?? ""); }, [params]);
  useEffect(() => {
    const url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }, [q]);

  const query = q.trim().toLowerCase().replace(/[\s_]+/g, "-");
  const hits = useMemo(() => {
    if (!query) return [];
    return icons.map((i) => ({ i, ...rank(i, query) })).filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s || a.i.slug.localeCompare(b.i.slug));
  }, [icons, query]);

  const suggestions = useMemo(() => {
    if (!query || hits.length) return [];
    return icons.map((i) => ({ i, d: Math.min(near(query, i.slug), ...i.tags.map((t) => near(query, t))) }))
      .filter((x) => x.d <= 3).sort((a, b) => a.d - b.d).slice(0, 6).map((x) => x.i);
  }, [icons, query, hits.length]);

  return (
    <>
      <div className="relative">
        <svg className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted"
          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        <Input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoFocus
          aria-label="Search icons"
          placeholder="Search by name, tag, or what it means"
          className="h-14 rounded-xl pr-4 pl-12 text-base"
        />
      </div>

      {!query && (
        <div className="mt-8 flex flex-wrap items-center gap-2 text-ui text-muted">
          <span>Type to search {icons.length.toLocaleString("en-GB")} icons, or press</span>
          <Kbd>⌘K</Kbd>
          <span>anywhere on the site.</span>
        </div>
      )}

      {query && hits.length > 0 && (
        <>
          <p className="mt-8 font-mono text-mono tabular-nums text-muted">
            {hits.length} {hits.length === 1 ? "result" : "results"} for “{q}”
          </p>
          <ul className="mt-4 overflow-hidden rounded-2xl border border-line bg-panel">
            {hits.map(({ i, why }) => (
              <li key={i.slug} className="border-b border-line-2 last:border-0">
                <Link
                  href={`/icons/${i.slug}/`}
                  className="group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-sunk"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-line-2 bg-sunk text-ink-2 transition-colors group-hover:border-accent group-hover:text-accent">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                      dangerouslySetInnerHTML={{ __html: i.body }} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-2">
                      <span className="truncate font-medium">{i.name}</span>
                      <span className="truncate font-mono text-[11px] text-muted">{i.slug}</span>
                    </span>
                    <span className="mt-0.5 block truncate text-meta text-muted">{i.description}</span>
                  </span>
                  <span className="hidden shrink-0 items-center gap-2 sm:flex">
                    <Badge variant="muted">{i.category}</Badge>
                    <span className="w-[9rem] text-right font-mono text-[10.5px] text-muted">
                      matched {why}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {query && hits.length === 0 && (
        <div className="mt-10">
          <div className="rounded-2xl border border-line bg-panel px-7 py-14 text-center shadow-panel">
            <p className="text-h2 font-semibold">Nothing for “{q}”</p>
            <p className="mx-auto mt-3 max-w-[44ch] leading-relaxed text-ink-2">
              That is the most useful thing this page can tell us. Requests are what decide
              which icons get drawn next.
            </p>
            <Button asChild size="lg" className="mt-8">
              <a href={`https://github.com/iconmind/iconmind/issues/new?template=icon-request.yml&title=${encodeURIComponent(`[Icon] ${q}`)}`}>
                Request “{q}”
              </a>
            </Button>
          </div>
          {suggestions.length > 0 && (
            <div className="mt-8">
              <h2 className="label">Did you mean</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {suggestions.map((i) => (
                  <li key={i.slug}>
                    <Link href={`/icons/${i.slug}/`}
                      className="flex items-center gap-2.5 rounded-pill border border-line bg-panel px-4 py-2 text-ui transition-colors hover:border-accent hover:bg-sunk">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                        dangerouslySetInnerHTML={{ __html: i.body }} />
                      {i.slug}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}
