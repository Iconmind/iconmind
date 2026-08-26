"use client";

import { Fragment } from "react";
import Link from "next/link";
import { IconHoverTip, useIconHoverTip } from "@/components/icon-hover-tip";
import { cn } from "@/lib/utils";

export interface Tile {
  slug: string;
  name: string;
  body: string;
  meta?: string;
}

export interface TileSection {
  slug: string;
  tiles: Tile[];
}

/**
 * A wall of icons that links, labels and explains itself on hover.
 *
 * Every page here had its own copy of this grid — the landing wall, the category groups,
 * the "related" strip, the "more in" strip — four `auto-fill` templates with four
 * slightly different gaps, and none of them told you what an icon was called unless it
 * happened to be one of the two that printed a slug underneath. They are one component
 * now, and the hover label comes free with it.
 *
 * It is a client component only because of that label: the tiles themselves are ordinary
 * links and would render fine on the server. What is shipped is this file and the shared
 * tooltip — the bodies are still inlined by the page that renders it.
 */
export function IconTileGrid({
  tiles,
  sections,
  min = 118,
  size = 24,
  labels = false,
  fit = false,
  className,
}: {
  tiles?: Tile[];
  /**
   * Groups inside one continuous grid, rather than one grid per group.
   *
   * A category page drew nine separate bordered shelves, each sized to its own contents —
   * so the page had nine different right-hand edges down it. Width as a signal of group
   * size is a nice idea with two groups and a layout bug with nine.
   *
   * One grid, with each heading spanning every column, fixes it: the left and right edges
   * are the same all the way down, a heading always starts a new row, and the gap at the
   * end of a short group reads as ordinary grid flow instead of a box that failed to fill.
   */
  sections?: TileSection[];
  /** Minimum cell width for the `auto-fill` track. */
  min?: number;
  size?: number;
  labels?: boolean;
  /**
   * Stop the box growing past the tiles it has.
   *
   * A strip of six in a full-width `auto-fill` track gets ten columns and ends with four
   * empty ones. Capping the width at `count × min` makes `auto-fill` compute exactly
   * `count` columns on a wide screen, and does nothing on a narrow one where the track
   * count is already the constraint. For the short strips — "related", not a category.
   */
  fit?: boolean;
  className?: string;
}) {
  const { bind, tip } = useIconHoverTip();
  const all = sections ? sections.flatMap((s) => s.tiles) : tiles ?? [];

  /*
   * Hairlines as outlines, not as a gap over a coloured ground.
   *
   * The `gap-px` on `bg-line-2` trick draws the grid lines for free, but it also paints
   * every cell the last row does not fill — so a "related" strip of six in a ten-column
   * track ended with four tiles' worth of flat grey, which reads as four icons that
   * failed to load. A half-pixel outline on each tile draws the same lines and leaves the
   * unfilled remainder the colour of the panel.
   */
  return (
    <>
      <div
        {...bind}
        className={cn("grid overflow-hidden rounded-2xl border border-line bg-panel", className)}
        style={{
          gridTemplateColumns: `repeat(auto-fill,minmax(${min}px,1fr))`,
          ...(fit ? { maxWidth: all.length * min + 2 } : null),
        }}
      >
        {sections?.map((section) => (
          <Fragment key={section.slug}>
            <div
              id={section.slug}
              className="col-span-full flex scroll-mt-[76px] items-baseline gap-2.5 border-b border-line-2 bg-sunk px-4 py-2.5"
            >
              {/* `h2`, not `h3`: these are the page's top-level content sections — the
                  only heading above them is the category's own `h1`. */}
              <h2 className="label">{section.slug}</h2>
              <span className="font-mono text-mono tabular-nums text-muted">
                {section.tiles.length}
              </span>
            </div>
            {section.tiles.map((t) => (
              <Tile key={t.slug} tile={t} size={size} labels={labels} />
            ))}
          </Fragment>
        ))}
        {tiles?.map((t) => (
          <Tile key={t.slug} tile={t} size={size} labels={labels} />
        ))}
      </div>
      <IconHoverTip tip={tip} />
    </>
  );
}

function Tile({ tile: t, size, labels }: { tile: Tile; size: number; labels: boolean }) {
  return (
    <Link
      href={`/icons/${t.slug}/`}
      data-tip={t.name}
      data-tip-meta={t.meta ?? t.slug}
      className="group flex aspect-square flex-col items-center justify-center gap-2.5 bg-panel outline outline-line-2 -outline-offset-[0.5px] transition-colors hover:bg-sunk"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="text-ink transition-transform duration-150 group-hover:scale-110"
        style={{ overflow: "visible" }}
        dangerouslySetInnerHTML={{ __html: t.body }}
      />
      {labels && (
        <span className="max-w-[88%] truncate font-mono text-[10.5px] text-muted transition-colors group-hover:text-ink-2">
          {t.slug}
        </span>
      )}
    </Link>
  );
}
