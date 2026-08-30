"use client";
import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Report a search that found nothing — once per query, after the typing has stopped.
 *
 * The set grows by request, and a query with no result is the request nobody bothered to
 * file. Every zero-result state on the site already offers an issue link; this records the
 * ones who did not click it. The event carries the query and the surface it was typed on,
 * nothing about the person. Custom events show up in Vercel's Web Analytics on paid plans
 * and are dropped silently on Hobby — the call is harmless either way.
 *
 * Debounced so "vec", "vect", "vecto" do not each count on the way to "vector", and deduped
 * for the session so the same miss is not reported on every re-render.
 */
const seen = new Set<string>();

export function useSearchMiss(surface: "browse" | "search" | "palette", q: string, hits: number, ready = true) {
  useEffect(() => {
    const query = q.trim().toLowerCase().replace(/[\s_]+/g, "-");
    if (!ready || query.length < 2 || hits > 0) return;
    const key = `${surface}:${query}`;
    if (seen.has(key)) return;
    const t = setTimeout(() => {
      if (seen.has(key)) return;
      seen.add(key);
      try { track("search-miss", { q: query, surface }); } catch { /* analytics is optional */ }
    }, 900);
    return () => clearTimeout(t);
  }, [surface, q, hits, ready]);
}
