"use client";

import { useEffect, useState } from "react";
import type { TOCItemType } from "fumadocs-core/toc";

/**
 * The "On this page" rail, with the section under the reader's viewport marked.
 *
 * One IntersectionObserver over the headings the TOC links to; the topmost heading
 * currently on screen wins, and scrolling past the last heading keeps it lit rather
 * than going dark. Pure progressive enhancement — without JavaScript this renders
 * exactly the link list it always was.
 */
export function TocNav({ items }: { items: TOCItemType[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const ids = items.map((i) => i.url.slice(1));
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!headings.length) return;

    const pick = () => {
      // The last heading above the reading line (a third down the viewport).
      const line = window.innerHeight / 3;
      let current: HTMLElement | null = null;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= line) current = h;
        else break;
      }
      setActive((current ?? headings[0]!).id);
    };
    pick();
    const observer = new IntersectionObserver(pick, {
      rootMargin: "-10% 0px -60% 0px",
    });
    headings.forEach((h) => observer.observe(h));
    window.addEventListener("scroll", pick, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", pick);
    };
  }, [items]);

  return (
    <ul className="grid gap-1.5 border-l border-line">
      {items.map((item) => {
        const isActive = active === item.url.slice(1);
        return (
          <li
            key={item.url}
            className={isActive ? "-ml-px border-l border-accent" : ""}
            style={{ paddingLeft: `${0.75 + (item.depth - 2) * 0.75}rem` }}
          >
            <a
              href={item.url}
              className={`block text-meta leading-[1.45] transition-colors ${
                isActive ? "font-medium text-accent" : "text-muted hover:text-ink"
              }`}
            >
              {item.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
