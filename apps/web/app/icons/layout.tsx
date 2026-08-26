import { allCategories, iconCount } from "@/lib/icons";
import { IconsShell } from "@/components/icons-shell";

/**
 * The rail, mounted once for the whole `/icons` section.
 *
 * Both the grid and every icon's own page live under here, so Next keeps this mounted
 * across the navigation between them — which is what makes the sidebar persist rather
 * than flash and rebuild on every click. The alternative, rendering the grid inside each
 * of the 765 icon pages, was measured: 619 MB of HTML against 56, and 838 KB on the wire
 * for somebody who landed on one icon from a search result instead of 76.
 *
 * There is no `<Suspense>` here any more, and that is the fix rather than an omission.
 * It was wrapping `IconsShell` because the shell read `useSearchParams()` — and since the
 * shell also renders `{children}`, the boundary that bailed out at build time contained
 * every icon's page. All of them prerendered to an empty `<main>`. The hook now lives in
 * `CategoryLinks` behind its own boundary; nothing at this level needs one.
 */
export default function IconsLayout({ children }: { children: React.ReactNode }) {
  const categories = allCategories.map((c) => ({ slug: c.slug, name: c.name, count: c.count }));
  return (
    <IconsShell categories={categories} total={iconCount}>
      {children}
    </IconsShell>
  );
}
