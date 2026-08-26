"use client";

import { useEffect, useSyncExternalStore } from "react";

/**
 * The matrix cells, fetched once and shared by everything on the page.
 *
 * A variant is data, not an attribute — a duotone body carries its tint on the shapes
 * themselves, not on the root — so showing the grid in duotone means swapping 756 bodies. The bundles are per cell and the browser caches them; the store
 * exists so the grid and the drawer do not each fetch their own copy of the same 150 KB
 * when they are almost always looking at the same cell.
 *
 * `outline-regular` is never fetched: the page is server-rendered with it inline, which is
 * what the grid shows before anybody touches a control.
 */
const cache = new Map<string, Record<string, string>>();
const inflight = new Set<string>();
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** A version counter — the cache itself is mutable, so the snapshot has to be a value. */
let version = 0;
const snapshot = () => version;

export function ensureCell(cell: string) {
  // `outline-regular` is inlined by the server on every page that renders icons, so the
  // grid and the drawer must never spend 95 KB re-fetching what is already in the HTML.
  // The command palette is the one caller that has no such HTML — it asks for it by name
  // through `loadCell` below, which shares this cache.
  if (cell === "outline-regular" || cache.has(cell) || inflight.has(cell)) return;
  void loadCell(cell);
}

/**
 * Fetch a cell and resolve with its bodies, sharing the store's cache.
 *
 * For the callers that have nothing to fall back on and would rather await than subscribe.
 * Failure resolves to `{}` rather than rejecting: a palette with no glyphs is still a
 * working palette, and there is nothing useful for a caller to do with the error.
 */
export function loadCell(cell: string): Promise<Record<string, string>> {
  const hit = cache.get(cell);
  if (hit) return Promise.resolve(hit);
  inflight.add(cell);
  return fetch(`/v/${cell}.json`)
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((m: Record<string, string>) => {
      cache.set(cell, m);
      version += 1;
      emit();
      return m;
    })
    // Whatever was on screen stays there. An empty grid is a worse answer than the
    // outline the page already carries.
    .catch(() => ({}) as Record<string, string>)
    .finally(() => {
      inflight.delete(cell);
    });
}

/** The bodies for one cell, or `undefined` until they arrive. */
export function useCell(cell: string): Record<string, string> | undefined {
  useSyncExternalStore(subscribe, snapshot, () => 0);
  useEffect(() => ensureCell(cell), [cell]);
  return cache.get(cell);
}

/** The cell file name for a variant and stroke width. */
export function cellName(variant: string, stroke: number): string {
  const weight = stroke === 1.5 ? "thin" : stroke === 2.5 ? "bold" : "regular";
  return `${variant}-${weight}`;
}
