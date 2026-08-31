import type { Metadata, Viewport } from "next";
import { Azeret_Mono, Figtree } from "next/font/google";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchTrigger } from "@/components/search-trigger";
import { CommandPalette } from "@/components/command-palette";
import { MobileNav } from "@/components/mobile-nav";
import { NavLink } from "@/components/nav-link";
import { Wordmark } from "@/components/logo";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { allCategories, iconCount, version } from "@/lib/icons";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/*
 * Two faces. Figtree carries the identity and the reading both — the mockup sets the 84px
 * hero and the 13.5px nav in it and it holds at either end. Azeret Mono keeps every
 * technical label: counts, specs, code, and anything naming a thing rather than saying
 * something.
 *
 * Both go through next/font so they are self-hosted in the export. A static site that
 * reaches out to fonts.googleapis.com on first paint has a third party in its critical
 * path for no reason.
 */
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-figtree",
  display: "swap",
});
const azeret = Azeret_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-azeret",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "IconMind — icons for AI-era software", template: "%s — IconMind" },
  description:
    "Open-source icons for AI-era software: LLMs, agents, MCP, RAG, and everything around them. MIT licensed.",
  openGraph: { type: "website", siteName: "IconMind" },
  twitter: { card: "summary_large_image" },
  // `app/icon.svg` and `app/apple-icon.png` are picked up by convention; the manifest is
  // the one link Next does not add on its own.
  manifest: "/manifest.webmanifest",
  applicationName: "IconMind",
};

/*
 * The colour the browser paints its own chrome.
 *
 * Two entries rather than one: a single `themeColor` would tint a phone's address bar
 * with the paper ground even in dark mode, and that is the one surface the site's own
 * theme switch cannot reach.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#100e0d" },
  ],
  colorScheme: "light dark",
};

const NAV = [
  { href: "/icons/", label: "Icons" },
  { href: "/categories/", label: "Categories" },
  { href: "/collections/", label: "Collections" },
  { href: "/tags/", label: "Tags" },
  { href: "/docs/", label: "Docs" },
  { href: "/changelog/", label: "Changelog" },
];

const PROJECT = [
  { href: "/compare/", label: "Compare" },
  { href: "/not-here/", label: "What's not here" },
  { href: "/contribute/", label: "Contribute" },
  { href: "/search/", label: "Search" },
];

const FOOTER: { heading: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  {
    heading: "Browse",
    links: [
      { href: "/icons/", label: "All icons" },
      { href: "/categories/", label: "Categories" },
      { href: "/tags/", label: "Tags" },
      { href: "/collections/", label: "Collections" },
      { href: "/compare/", label: "Compare" },
      { href: "/search/", label: "Search" },
    ],
  },
  {
    heading: "Use it",
    links: [
      { href: "/docs/installation/", label: "Installation" },
      { href: "/docs/react/", label: "React" },
      { href: "/docs/svg/", label: "SVG & sprite" },
      { href: "/docs/mcp/", label: "MCP server" },
      { href: "/docs/figma/", label: "Figma" },
      // A file nobody finds unless it is linked. It is written for assistants, but the
      // person wiring one up is the one who has to point at it.
      //
      // `external` is not about the host — it is about `<Link>` being wrong here. The
      // router would try a client navigation to a route handler that serves `text/plain`
      // and has no RSC payload; a plain anchor asks the browser for the file, which is
      // what a reader clicking "llms.txt" means.
      { href: "/llms.txt", label: "llms.txt", external: true },
    ],
  },
  {
    heading: "Project",
    links: [
      { href: "/changelog/", label: "Changelog" },
      { href: "/not-here/", label: "What's not here" },
      { href: "/contribute/", label: "Contribute" },
      { href: "/docs/design-guidelines/", label: "Design guidelines" },
    ],
  },
];

/*
 * Before React runs, and before the first paint.
 *
 * A theme applied from an effect shows the light ground for one frame to everyone who
 * chose dark. The stored value is the *choice*, which may be "system" — so this resolves
 * it here rather than storing a resolved theme that would go stale the moment the machine
 * switched at sunset.
 */
const THEME_BOOT = `try{var c=localStorage.getItem("iconmind-theme");if(c!=="light"&&c!=="dark")c="system";document.documentElement.dataset.theme=c==="system"?(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"):c}catch(e){document.documentElement.dataset.theme="light"}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // The palette shows a category beside every hit; it reads the slug out of the search
  // index, and the display names live here. Twelve pairs, sent once.
  const categoryNames = Object.fromEntries(allCategories.map((c) => [c.slug, c.name]));

  return (
    // `suppressHydrationWarning` because the attribute below is *meant* to differ: the
    // boot script rewrites `data-theme` before React runs, so a visitor on dark hydrates
    // against `light` and React reports a mismatch it says it "won't patch up". Scoped to
    // this element, so a real mismatch anywhere inside still reports.
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${figtree.variable} ${azeret.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        {/* Not something the Metadata API models, so it is written out. It is what lets a
            browser offer "search IconMind" from the address bar after one visit. */}
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          title="IconMind"
          href="/opensearch.xml"
        />
      </head>
      <body className="font-sans">
        <TooltipProvider>
          {/* Keyboard and screen-reader users land here first; a 756-cell grid is a long
              way to tab through to reach the content. */}
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-ui focus:font-semibold focus:text-page"
          >
            Skip to content
          </a>

          <header className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--color-page)_88%,transparent)] backdrop-blur-[14px]">
            <div className="mx-auto flex h-[60px] max-w-[1560px] items-center gap-7 px-5 sm:px-7">
              <Link href="/" className="group flex shrink-0 items-center gap-2.5">
                <Wordmark size={22} markClassName="transition-transform duration-200 group-hover:rotate-[60deg]" />
                <Badge variant="muted" className="hidden px-1.5 py-px text-[10px] sm:inline-flex">
                  v{version}
                </Badge>
              </Link>

              <nav className="hidden items-center gap-0.5 md:flex">
                {NAV.map((n) => (
                  <NavLink key={n.href} href={n.href}>
                    {n.label}
                  </NavLink>
                ))}
              </nav>

              <div className="ml-auto flex items-center gap-2 sm:gap-3">
                <SearchTrigger count={iconCount} />
                <ThemeToggle />
                <Button asChild size="sm" className="hidden sm:inline-flex">
                  <a href="https://github.com/iconmind/iconmind">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.9c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.05 10.05 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
                    </svg>
                    GitHub
                  </a>
                </Button>
                <MobileNav primary={NAV} secondary={PROJECT} />
              </div>
            </div>
          </header>

          <main id="content">{children}</main>

          <footer className="mt-24 border-t border-line bg-sunk">
            <div className="mx-auto max-w-[1560px] px-5 py-14 sm:px-7">
              <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
                <div className="max-w-[34ch]">
                  <Wordmark size={22} />
                  <p className="mt-3 text-meta leading-[1.6] text-muted">
                    {iconCount.toLocaleString("en-GB")} open-source icons for AI-era software,
                    compiled from one grid. MIT licensed — commercial use, no attribution,
                    no seat count.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <Badge variant="muted">v{version}</Badge>
                    <Badge variant="muted">MIT</Badge>
                    <Badge variant="muted">0 kB runtime</Badge>
                  </div>
                </div>

                {FOOTER.map((col) => (
                  <div key={col.heading}>
                    <p className="label mb-3.5">{col.heading}</p>
                    <ul className="grid gap-2.5">
                      {col.links.map((l) => (
                        <li key={l.href}>
                          {l.external ? (
                            <a href={l.href} className="text-meta text-muted transition-colors hover:text-ink">
                              {l.label}
                            </a>
                          ) : (
                            <Link href={l.href} className="text-meta text-muted transition-colors hover:text-ink">
                              {l.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-meta text-muted sm:flex-row sm:items-center sm:justify-between">
                <p>© {new Date().getFullYear()} IconMind contributors. MIT licensed.</p>
                <div className="flex gap-6">
                  <a href="https://github.com/iconmind/iconmind" className="transition-colors hover:text-ink">
                    Source
                  </a>
                  <a
                    href="https://github.com/iconmind/iconmind/issues/new?template=icon-request.yml"
                    className="transition-colors hover:text-ink"
                  >
                    Request an icon
                  </a>
                  <Link href="/docs/faq/" className="transition-colors hover:text-ink">
                    FAQ
                  </Link>
                </div>
              </div>
            </div>
          </footer>

          <CommandPalette categories={categoryNames} />
          <Toaster />
        </TooltipProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
