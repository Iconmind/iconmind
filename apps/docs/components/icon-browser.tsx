"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

export interface BrowserIcon { slug: string; name: string; category: string; tags: string; body: string }

const SIZES = [16, 20, 24, 32] as const;

/** Prefix matches first — most queries are the start of a name, and those have to land
 *  with no perceptible delay. Substring is the fallback, never the first pass. */
function score(icon: BrowserIcon, q: string): number {
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

export function IconBrowser({ icons, categories }: { icons: BrowserIcon[]; categories: string[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [size, setSize] = useState<number>(24);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase().replace(/[\s_]+/g, "-");
    return icons
      .filter((i) => !cat || i.category === cat)
      .map((i) => ({ i, s: score(i, query) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s || a.i.slug.localeCompare(b.i.slug))
      .map((r) => r.i);
  }, [icons, q, cat]);

  const chip = (active: boolean) =>
    `rounded-pill px-3 py-1.5 text-xs font-medium transition-colors ${
      active ? "bg-ink text-canvas" : "text-ink-soft hover:bg-raised hover:text-ink"
    }`;

  return (
    <div className="pb-24">
      <div className="sticky top-15 z-40 -mx-6 border-b border-line bg-canvas/85 px-6 py-5 backdrop-blur-xl">
        <div className="relative">
          <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
            width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search" value={q} onChange={(e) => setQ(e.target.value)} autoFocus
            placeholder={`Search ${icons.length} icons — try “agent”, “vector”, “mcp”`}
            className="chamfer-sm hairline w-full bg-surface py-3 pl-11 pr-4 text-[0.95rem] outline-none placeholder:text-ink-faint"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <button onClick={() => setCat(null)} className={chip(cat === null)}>All</button>
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(cat === c ? null : c)} className={chip(cat === c)}>{c}</button>
          ))}
          <div className="ml-auto flex items-center gap-1 rounded-pill bg-raised p-1">
            {SIZES.map((s) => (
              <button key={s} onClick={() => setSize(s)}
                className={`rounded-pill px-2.5 py-1 text-xs tabular-nums transition-colors ${
                  size === s ? "bg-canvas text-ink shadow-sm" : "text-ink-faint hover:text-ink"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="chamfer hairline mt-10 bg-surface px-6 py-20 text-center">
          <p className="text-title font-semibold">No icon for “{q}”</p>
          <p className="mx-auto mt-3 max-w-[42ch] text-ink-soft">
            Worth knowing. A request is the strongest signal we get about what to draw next.
          </p>
          <a
            className="chamfer-sm mt-8 inline-block bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-opacity hover:opacity-88"
            href={`https://github.com/iconmind/iconmind/issues/new?template=icon-request.yml&title=${encodeURIComponent(`[Icon] ${q}`)}`}
          >
            Request “{q}”
          </a>
        </div>
      ) : (
        <>
          <p className="py-6 text-sm tabular-nums text-ink-faint">{results.length} icons</p>
          <ul className="grid grid-cols-3 gap-px overflow-hidden rounded-card bg-line-soft sm:grid-cols-5 lg:grid-cols-7">
            {results.map((icon) => (
              <li key={icon.slug}>
                <Link href={`/icons/${icon.slug}/`} title={icon.name}
                  className="group flex aspect-square flex-col items-center justify-center gap-3 bg-canvas transition-colors hover:bg-raised">
                  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true" className="transition-colors group-hover:text-accent"
                    dangerouslySetInnerHTML={{ __html: icon.body }} />
                  <span className="max-w-[90%] truncate text-[0.6875rem] text-ink-faint">{icon.slug}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
