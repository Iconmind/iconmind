"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchMiss } from "@/lib/search-miss";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { loadCell } from "@/lib/cells";

/** The event the header's search button fires. A custom event rather than a context, so
 *  the trigger can live inside a server-rendered header without making it a client tree. */
export const OPEN_SEARCH = "iconmind:open-search";

export function openSearch() {
  window.dispatchEvent(new CustomEvent(OPEN_SEARCH));
}

interface Entry {
  slug: string;
  name: string;
  cat: string;
  tags: string;
}

/** The shape `public/search-index.json` is written in: field names once, categories and
 *  subcategories interned, and every icon a positional array. 68 KB for 646 icons. */
interface RawIndex {
  c: string[];
  i: [string, string, number, number, string, string, string][];
}

const PAGES = [
  { href: "/icons/", label: "Browse all icons", hint: "Grid" },
  { href: "/categories/", label: "Categories", hint: "Grid" },
  { href: "/tags/", label: "Tags", hint: "Grid" },
  { href: "/docs/", label: "Documentation", hint: "Docs" },
  { href: "/docs/installation/", label: "Installation", hint: "Docs" },
  { href: "/docs/react/", label: "React package", hint: "Docs" },
  { href: "/docs/mcp/", label: "MCP server", hint: "Docs" },
  { href: "/changelog/", label: "Changelog", hint: "Project" },
  { href: "/contribute/", label: "Contribute an icon", hint: "Project" },
];

const RECENT_KEY = "iconmind-recent";
const readRecent = (): string[] => {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]).slice(0, 6) : [];
  } catch {
    return [];
  }
};

/** Prefix before substring, same ordering as the grid — two searches that rank the same
 *  query differently is the kind of thing people notice without being able to name it. */
function score(e: Entry, q: string): number {
  if (e.slug === q) return 1000;
  if (e.slug.startsWith(q)) return 800 - e.slug.length;
  const name = e.name.toLowerCase();
  if (name.startsWith(q)) return 700 - name.length;
  if (e.slug.split("-").some((w) => w.startsWith(q))) return 600;
  if (e.tags.split(" ").includes(q)) return 500;
  if (e.tags.includes(q)) return 300;
  if (e.slug.includes(q)) return 200;
  return 0;
}

/**
 * ⌘K, over the whole set.
 *
 * Everything it needs is fetched the first time it opens and never again: the search
 * index and one cell of bodies, together about 160 KB, on a site whose landing page
 * otherwise ships no icon data at all. Paying that at boot to save it on a keystroke
 * would be the wrong trade for the many visitors who never press ⌘K.
 *
 * `shouldFilter={false}` — cmdk's own matcher is a fuzzy scorer that does not know a slug
 * from an alias. The ranking above is the site's, so the palette and the grid agree.
 */
export function CommandPalette({ categories }: { categories: Record<string, string> }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [bodies, setBodies] = useState<Record<string, string>>({});
  const [recent, setRecent] = useState<string[]>([]);
  const loaded = useRef(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      // "/" is the other convention, but only when it is not being typed into something.
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const t = e.target as HTMLElement | null;
        const tag = t?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || t?.isContentEditable) return;
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_SEARCH, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_SEARCH, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setRecent(readRecent());
    if (loaded.current) return;
    loaded.current = true;
    fetch("/search-index.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((raw: RawIndex) =>
        setEntries(
          raw.i.map(([slug, name, cat, , tags, aliases]) => ({
            slug,
            name,
            cat: raw.c[cat] ?? "",
            tags: `${tags} ${aliases}`.trim(),
          })),
        ),
      )
      // Nothing to show is still better than a broken dialog; the pages below stay usable.
      .catch(() => setEntries([]));
    void loadCell("outline-regular").then(setBodies);
  }, [open]);

  const go = useCallback(
    (href: string, slug?: string) => {
      if (slug) {
        try {
          const next = [slug, ...readRecent().filter((s) => s !== slug)].slice(0, 6);
          localStorage.setItem(RECENT_KEY, JSON.stringify(next));
        } catch {
          /* private mode — the list just does not survive the tab */
        }
      }
      setOpen(false);
      setQ("");
      router.push(href);
    },
    [router],
  );

  const query = q.trim().toLowerCase().replace(/[\s_]+/g, "-");

  const hits = useMemo(() => {
    if (!entries || !query) return [];
    return entries
      .map((e) => ({ e, s: score(e, query) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s || a.e.slug.localeCompare(b.e.slug))
      .slice(0, 24)
      .map((r) => r.e);
  }, [entries, query]);

  const pages = useMemo(
    () => (query ? PAGES.filter((p) => p.label.toLowerCase().includes(query.replace(/-/g, " "))) : PAGES.slice(0, 4)),
    [query],
  );

  const recentEntries = useMemo(
    () => (query || !entries ? [] : (recent.map((s) => entries.find((e) => e.slug === s)).filter(Boolean) as Entry[])),
    [recent, entries, query],
  );
  // A page match is still a result; only a query that finds no icon and no page is a miss.
  useSearchMiss("palette", q, hits.length + pages.length, entries !== null);

  const glyph = (slug: string) => (
    <span
      className="grid size-8 shrink-0 place-items-center rounded-md border border-line-2 bg-sunk text-ink"
      dangerouslySetInnerHTML={{
        __html:
          `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" ` +
          `stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${bodies[slug] ?? ""}</svg>`,
      }}
    />
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
      <CommandInput
        value={q}
        onValueChange={setQ}
        placeholder={entries ? `Search ${entries.length} icons, docs and pages…` : "Loading the set…"}
      />
      <CommandList>
        <CommandEmpty>
          {entries === null ? "Loading…" : `Nothing matches “${q}”.`}
        </CommandEmpty>

        {recentEntries.length > 0 && (
          <>
            <CommandGroup heading="Recent">
              {recentEntries.map((e) => (
                <CommandItem key={e.slug} value={`recent-${e.slug}`} onSelect={() => go(`/icons/${e.slug}/`, e.slug)}>
                  {glyph(e.slug)}
                  <span className="truncate">{e.name}</span>
                  <CommandShortcut>{e.slug}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {hits.length > 0 && (
          <CommandGroup heading={`Icons · ${hits.length}${hits.length === 24 ? "+" : ""}`}>
            {hits.map((e) => (
              <CommandItem key={e.slug} value={e.slug} onSelect={() => go(`/icons/${e.slug}/`, e.slug)}>
                {glyph(e.slug)}
                <span className="min-w-0 flex-1 truncate">
                  {e.name}
                  <span className="ml-2 font-mono text-[10.5px] text-muted">{e.slug}</span>
                </span>
                <CommandShortcut>{categories[e.cat] ?? e.cat}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {pages.length > 0 && (
          <>
            {hits.length > 0 && <CommandSeparator />}
            <CommandGroup heading="Go to">
              {pages.map((p) => (
                <CommandItem key={p.href} value={p.href} onSelect={() => go(p.href)}>
                  <span className="grid size-8 shrink-0 place-items-center rounded-md border border-line-2 bg-sunk text-muted">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 12h15M13.2 6l6 6-6 6" />
                    </svg>
                  </span>
                  <span className="truncate">{p.label}</span>
                  <CommandShortcut>{p.hint}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>

      <div className="flex items-center gap-4 border-t border-line-2 bg-sunk px-4 py-2.5 font-mono text-[10.5px] text-muted">
        <span className="flex items-center gap-1.5">
          <Key>↑</Key>
          <Key>↓</Key>
          navigate
        </span>
        <span className="flex items-center gap-1.5">
          <Key>↵</Key>
          open
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <Key>esc</Key>
          close
        </span>
      </div>
    </CommandDialog>
  );
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-[17px] min-w-[17px] items-center justify-center rounded-[4px] border border-line bg-panel px-1 text-[10px] leading-none">
      {children}
    </kbd>
  );
}
