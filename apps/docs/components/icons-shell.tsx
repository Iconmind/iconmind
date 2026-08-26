"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CustomizePanel, DEFAULT_LOOK, type Look } from "@/components/customize-panel";
import { CategoryLinks, type ShellCategory } from "@/components/category-links";
import { Separator } from "@/components/ui/separator";

export type { ShellCategory };

/**
 * The look the whole section is set to, shared across the grid and every icon's page.
 *
 * It lives in the layout rather than in either page, which is the whole point of the
 * layout existing: Next keeps a layout mounted across a client navigation, so clicking
 * from the grid into an icon does not remount the rail, refetch the cell bundle, or reset
 * the controls to their defaults. The sidebar stays because it is never unmounted.
 */
const LookContext = createContext<{
  look: Look;
  setLook: (l: Look) => void;
  /** An icon's page reports its category so the rail can mark it. The layout cannot read
   *  its child's params, and the alternative — shipping a 756-entry slug→category map to
   *  the rail — is fifteen kilobytes to answer one question. */
  setHere: (category: string | null) => void;
}>({
  look: DEFAULT_LOOK,
  setLook: () => {},
  setHere: () => {},
});

export const useLook = () => useContext(LookContext);

const STORE = "iconmind-look";

const onGridPath = (p: string) => p === "/icons" || p === "/icons/";

export function IconsShell({
  categories, total, children,
}: {
  categories: ShellCategory[];
  total: number;
  children: React.ReactNode;
}) {
  const [look, setLook] = useState<Look>(DEFAULT_LOOK);
  const [here, setHere] = useState<string | null>(null);
  const pathname = usePathname();
  // One customiser on screen at a time. The rail's belongs to the grid; an icon's page
  // renders its own beside the preview — two identical panels either side of one preview
  // is a control asking to be misread.
  //
  // `usePathname` and not `useSearchParams`: this component renders `{children}`, and a
  // hook that cannot resolve at build time would take every icon's page down with it.
  // See `category-links.tsx` for what that cost and where the query string is read now.
  const onGrid = onGridPath(pathname);

  // Read after mount, not during render: the server has no localStorage, and a value that
  // differs between the two is a hydration mismatch.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORE);
      if (saved) setLook({ ...DEFAULT_LOOK, ...JSON.parse(saved) });
    } catch {
      /* private mode — the choice just does not survive the tab */
    }
  }, []);

  const update = (next: Look) => {
    setLook(next);
    try {
      localStorage.setItem(STORE, JSON.stringify(next));
    } catch {
      /* as above */
    }
  };

  const all = [{ slug: "all", name: "All icons", count: total }, ...categories];

  return (
    <LookContext.Provider value={{ look, setLook: update, setHere }}>
      <div className="mx-auto grid max-w-[1560px] lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="hidden self-start border-r border-line px-[22px] pt-[26px] pb-10 lg:sticky lg:top-[60px] lg:block lg:h-[calc(100vh-60px)] lg:overflow-y-auto">
          <p className="label mb-[11px]">Category</p>
          <CategoryLinks categories={all} here={here} onGrid={onGrid} variant="rail" />

          {onGrid && (
            <>
              <Separator className="my-[26px]" />
              <p className="label mb-3.5">Customize</p>
              <CustomizePanel look={look} onChange={update} />
              <p className="mt-5 text-meta leading-[1.5] text-muted">
                Every cell below is redrawn — this is not a stroke-width on one file, it is
                the weight that was drawn for it.
              </p>
            </>
          )}
        </aside>

        {/* `min-w-0`: a grid item defaults to `min-width: auto`, so the scroller sized
            itself to its 1457px of chips and took the whole page with it — the grid was
            1537px wide on a 390px phone. */}
        <div className="min-w-0 lg:hidden">
          <div className="fade-r overflow-x-auto border-b border-line px-5 py-2.5">
            <CategoryLinks categories={all} here={here} onGrid={onGrid} variant="chips" />
          </div>
        </div>

        <main className="min-w-0">{children}</main>
      </div>
    </LookContext.Provider>
  );
}
