"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/*
 * One tooltip for a wall of icons.
 *
 * The obvious version wraps every cell in a Radix `Tooltip` — which is correct for three
 * buttons in a toolbar and wrong for seven hundred and fifty-six cells: that is 756 Root
 * components, each with its own state, timer and presence machine, mounted before a
 * pointer has touched any of them. The grid is the page people judge this site by, and it
 * is the one place a per-item primitive is too expensive.
 *
 * So the grid gets one tooltip and delegates. `pointerover` bubbles, so a single listener
 * on the container finds the cell under the pointer with `closest()`, reads the label off
 * a data attribute, and moves one absolutely-positioned element. Cost is constant in the
 * number of cells.
 *
 * The delay behaves the way Radix's does, because that behaviour is the point: the first
 * one waits ~90ms so a pointer crossing the grid on its way somewhere else does not light
 * it up, and every one after it — while the tooltip is still open — is instant, which is
 * what makes scanning a set feel like scanning rather than querying.
 */
export interface HoverTipState {
  label: string;
  meta: string;
  x: number;
  y: number;
}

const OPEN_DELAY = 90;

export function useIconHoverTip() {
  const [tip, setTip] = useState<HoverTipState | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openRef = useRef(false);

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const hide = useCallback(() => {
    clear();
    openRef.current = false;
    setTip(null);
  }, [clear]);

  const onPointerOver = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      // Touch fires `pointerover` on tap and then leaves it hanging until the next tap
      // somewhere else — a tooltip stuck over the grid on a phone.
      if (e.pointerType === "touch") return;

      const cell = (e.target as HTMLElement).closest<HTMLElement>("[data-tip]");
      if (!cell) return;

      const label = cell.dataset["tip"] ?? "";
      const meta = cell.dataset["tipMeta"] ?? "";
      const show = () => {
        const r = cell.getBoundingClientRect();
        openRef.current = true;
        setTip({ label, meta, x: r.left + r.width / 2, y: r.top });
      };

      clear();
      if (openRef.current) show();
      else timer.current = setTimeout(show, OPEN_DELAY);
    },
    [clear],
  );

  // Scrolling moves the cell out from under a tooltip that is positioned in viewport
  // coordinates. Rather than track it, drop it — the pointer will re-open it in 90ms.
  useEffect(() => {
    if (!tip) return;
    window.addEventListener("scroll", hide, { passive: true, capture: true });
    return () => window.removeEventListener("scroll", hide, { capture: true } as EventListenerOptions);
  }, [tip, hide]);

  useEffect(() => clear, [clear]);

  return {
    /** Spread onto the element that contains the cells. */
    bind: { onPointerOver, onPointerLeave: hide },
    tip,
  };
}

/** The tooltip itself. Render it once, beside the grid. */
export function IconHoverTip({ tip }: { tip: HoverTipState | null }) {
  if (!tip) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full pb-2"
      style={{ left: tip.x, top: tip.y }}
    >
      <div className="animate-in fade-in-0 zoom-in-95 flex items-center gap-2 rounded-md bg-ink px-2.5 py-1.5 whitespace-nowrap shadow-panel duration-100">
        <span className="text-[11.5px] font-medium text-page">{tip.label}</span>
        {tip.meta && (
          <span className="font-mono text-[10px] text-page/55">{tip.meta}</span>
        )}
      </div>
    </div>
  );
}
