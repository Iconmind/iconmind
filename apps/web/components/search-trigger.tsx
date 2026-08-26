"use client";

import { Kbd } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";
import { openSearch } from "@/components/command-palette";

/**
 * The header's search affordance, in two shapes.
 *
 * Wide screens get the full field — the shortcut has to be *visible* for anyone to learn
 * it, and a bare magnifier teaches nobody that ⌘K exists. Below `lg` it collapses to the
 * icon, because a 260px field in a 60px bar leaves no room for the nav.
 */
export function SearchTrigger({ count }: { count: number }) {
  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        className="hidden h-[34px] items-center gap-2.5 rounded-md border border-line bg-panel pr-1.5 pl-3 text-ui text-muted transition-colors hover:border-accent hover:text-ink-2 lg:flex"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20.5 20.5 16.9 16.9" />
        </svg>
        <span className="pr-8">Search {count.toLocaleString("en-GB")} icons…</span>
        <Kbd className="ml-auto">⌘K</Kbd>
      </button>

      <Button
        variant="ghost"
        size="icon"
        aria-label="Search icons"
        onClick={openSearch}
        className="lg:hidden"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20.5 20.5 16.9 16.9" />
        </svg>
      </Button>
    </>
  );
}
