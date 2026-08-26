import type { Metadata } from "next";
import Link from "next/link";
import { allCategories, allIcons, getIcon, iconCount, version } from "@/lib/icons";
import { readCells, readSvg, svgBody } from "@/lib/svg";
import { BLURB, spread } from "@/lib/blurbs";
import { IconSvg } from "@/components/icon-svg";
import { HeroCustomizer } from "@/components/hero-customizer";
import { InstallTabs } from "@/components/install-tabs";
import { IconTileGrid } from "@/components/icon-tile-grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "IconMind — open-source icons for AI-era software",
  description:
    `${iconCount} free SVG icons for LLMs, agents, MCP, RAG, data, devops and interfaces. ` +
    "Outline and duotone, in three weights. React, Vue and plain SVG. MIT licensed.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "IconMind — open-source icons for AI-era software",
    description: `${iconCount} free SVG icons for AI products. Outline and duotone, in three weights. MIT licensed.`,
    url: "/",
  },
};

/* The eighteen the hero puts under its controls. Chosen to spread the vocabulary — a
   container, a body, a diagonal, a curve — because a panel of eighteen rounded rectangles
   would prove the opposite of what it is there to prove. */
const HERO = [
  "agent", "model", "prompt", "embedding", "token", "parameters",
  "terminal", "cpu", "database", "document", "folder", "calendar",
  "search", "filter", "clock", "user", "upload", "check",
];

/** The icon the matrix section takes apart. It has all six cells and reads at 40px. */
const MATRIX_SLUG = "agent";

/*
 * Structured data, and only what is true.
 *
 * The `SearchAction` is the one that earns its bytes: it is what lets a search result for
 * the site carry its own search box, and the target is a real route that works with no
 * JavaScript. Nothing here claims a rating or a price the project does not have.
 */
function schema(count: number) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://iconmind.dev/#website",
        url: "https://iconmind.dev/",
        name: "IconMind",
        description: `${count} open-source SVG icons for AI-era software.`,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://iconmind.dev/search/?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "IconMind",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        url: "https://iconmind.dev/",
        description: `${count} open-source SVG icons for LLMs, agents, MCP and RAG. Outline and duotone, in three weights.`,
        license: "https://opensource.org/licenses/MIT",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    ],
  };
}

export default function Home() {
  const bySlug = new Map(allIcons.map((i) => [i.slug, i]));

  // Three weights of the same eighteen: the weight control swaps drawn cells, so the panel
  // needs the bodies for each rather than one body and an attribute.
  const heroCells: Record<string, Record<string, string>> = { thin: {}, regular: {}, bold: {} };
  for (const slug of HERO) {
    const icon = bySlug.get(slug);
    // A missing slug would leave a hole in a six-by-three grid, which reads as a bug
    // rather than as an omission. The list is short enough to keep true.
    if (!icon) throw new Error(`hero icon "${slug}" is not in the set`);
    for (const weight of ["thin", "regular", "bold"] as const)
      heroCells[weight]![icon.slug] = svgBody(readSvg(icon.category, icon.slug, `outline-${weight}`));
  }

  // One icon in every cell it has, for the section that explains what a cell is. Read at
  // build time from the same files the packages are generated from.
  const matrixIcon = getIcon(MATRIX_SLUG);
  const matrix = matrixIcon ? readCells(matrixIcon.category, matrixIcon.slug) : [];

  const cards = allCategories
    .slice()
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
    .map((c) => ({
      ...c,
      blurb: BLURB[c.slug] ?? "",
      strip: spread(allIcons.filter((i) => i.category === c.slug), 5).map((i) => ({
        slug: i.slug,
        body: svgBody(readSvg(i.category, i.slug)),
      })),
    }));

  // A wall of real links. It is the honest way to show scale, and it is also how the icon
  // pages get found: fifty-four internal links from the highest-authority page on the site.
  const wall = spread(allIcons, 54).map((i) => ({
    slug: i.slug,
    name: i.name,
    body: svgBody(readSvg(i.category, i.slug)),
    meta: i.category,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema(iconCount)) }}
      />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* The grid the icons are drawn to, faint, behind the thing that says so. It
            fades out before it reaches the copy — a ground with texture under body type
            is a legibility cost with no argument for it. */}
        <div
          aria-hidden="true"
          className="grid-ground pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(120%_80%_at_70%_0%,#000_10%,transparent_70%)]"
        />
        <div className="relative mx-auto grid max-w-[1560px] items-center gap-14 px-5 pt-14 pb-14 sm:px-7 lg:grid-cols-[minmax(0,1fr)_480px] lg:gap-[72px] lg:pt-24">
          <div>
            <div className="mb-[26px] inline-flex items-center gap-2 rounded-pill border border-line bg-panel py-[5px] pr-[11px] pl-1.5 text-[12px] text-ink-2">
              <Badge variant="accent">v{version}</Badge>
              {iconCount.toLocaleString("en-GB")} icons · outline, duotone · three weights
            </div>

            <h1 className="text-hero font-semibold text-balance">
              Every icon,
              <br />
              drawn by
              <br />
              <span className="text-accent">one rule.</span>
            </h1>

            <p className="mt-7 max-w-[470px] text-lead text-ink-2 text-pretty">
              Open-source icons for AI-era software — LLMs, agents, MCP, RAG and everything
              around them. Three weights, three variants, generated from one grid by a
              compiler that refuses a shape it cannot draw correctly.
            </p>

            <div className="mt-[34px] flex flex-wrap gap-2.5">
              <Button asChild size="lg">
                <Link href="/icons/">
                  Browse {iconCount.toLocaleString("en-GB")} icons
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 12h15M13.2 6l6 6-6 6" />
                  </svg>
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/docs/">Read the docs</Link>
              </Button>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-8 border-t border-line pt-[26px] sm:gap-11">
              <Stat value={iconCount.toLocaleString("en-GB")} label="icons" />
              <Separator orientation="vertical" className="hidden h-8 sm:block" />
              <Stat value={String(allCategories.length)} label="categories" />
              <Separator orientation="vertical" className="hidden h-8 sm:block" />
              <Stat value="MIT" label="licence" />
              <Separator orientation="vertical" className="hidden h-8 sm:block" />
              <Stat value="0 kB" label="runtime" />
            </div>
          </div>

          <HeroCustomizer cells={heroCells} />
        </div>
      </section>

      {/* ── Install ────────────────────────────────────────────────────────── */}
      <Section
        title="Four ways in"
        note="Pick one — they are the same drawings."
        className="pt-4"
      >
        <InstallTabs />
      </Section>

      {/* ── What makes it one set ──────────────────────────────────────────── */}
      <Section title="Why they look like one set">
        <div className="grid gap-3.5 md:grid-cols-3">
          <Feature
            title="Compiled, not drawn twice"
            icon={
              <path d="M8.5 4.5H6a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 6 19.5h12a1.5 1.5 0 0 0 1.5-1.5v-2.5M9 15l10.5-10.5M15 3.5h5.5V9" />
            }
          >
            Every icon is one declaration. The generator emits all seven cells from it, so a
            change to the corner radius is a change to {iconCount} icons rather than{" "}
            {iconCount} edits.
          </Feature>
          <Feature
            title="It refuses bad geometry"
            icon={<><circle cx="12" cy="12" r="8.5" /><path d="M6 18 18 6" /></>}
          >
            An anchor off the grid, a segment at 127°, a run too short to survive the bold
            weight, two strokes that would merge — the compiler stops before the file exists.
          </Feature>
          <Feature
            title="Every cell is the same drawing"
            icon={
              <>
                <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
                <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
                <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
                <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
              </>
            }
          >
            Nothing is offset, derived or redrawn. The cells differ by a stroke width and a
            tint, so no two of them can drift apart.
          </Feature>
        </div>
      </Section>

      {/* ── The matrix, on one icon ────────────────────────────────────────── */}
      {matrixIcon && matrix.length > 0 && (
        <Section
          title="One declaration, six cells"
          note={
            <Link href={`/icons/${matrixIcon.slug}/`} className="text-accent transition-colors hover:text-ink">
              Open {matrixIcon.name} →
            </Link>
          }
        >
          <Card className="overflow-hidden">
            <div className="grid gap-px bg-line-2 sm:grid-cols-6">
              {matrix.map((c) => (
                <div key={`${c.variant}-${c.weight}`} className="bg-panel px-4 pt-5 pb-4">
                  <div className="grid h-[92px] place-items-center text-ink">
                    <svg
                      xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor"
                      strokeWidth={c.weight === "thin" ? 1.5 : c.weight === "bold" ? 2.5 : 2}
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                      style={{ overflow: "visible" }}
                      dangerouslySetInnerHTML={{ __html: c.body }}
                    />
                  </div>
                  <p className="mt-2 text-center font-mono text-[10.5px] text-muted">
                    {c.variant}
                    <span className="text-line"> / </span>
                    {c.weight}
                  </p>
                </div>
              ))}
            </div>
            <p className="border-t border-line-2 px-5 py-3.5 text-meta leading-[1.55] text-muted">
              Six files, one source. The weights are separate drawings — the thin cell is not
              the regular one with a smaller <span className="font-mono">stroke-width</span>,
              which is why the counters stay open at 16px and the bold one does not fill in.
            </p>
          </Card>
        </Section>
      )}

      {/* ── Categories ─────────────────────────────────────────────────────── */}
      <Section
        title="Browse by category"
        note={
          <Link href="/categories/" className="text-accent transition-colors hover:text-ink">
            All {allCategories.length} categories →
          </Link>
        }
      >
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <Link key={c.slug} href={`/categories/${c.slug}/`} className="group">
              <Card className="h-full px-4 pt-4 pb-3.5 transition-all group-hover:-translate-y-0.5 group-hover:border-accent group-hover:shadow-panel">
                <div className="mb-4 flex gap-3.5 text-ink">
                  {c.strip.map((i) => (
                    <IconSvg key={i.slug} body={i.body} size={19} />
                  ))}
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <CardTitle>{c.name}</CardTitle>
                  <span className="font-mono text-[11.5px] tabular-nums text-muted">{c.count}</span>
                </div>
                <CardDescription className="mt-[3px]">{c.blurb}</CardDescription>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── The wall ───────────────────────────────────────────────────────── */}
      <Section
        title="A few of them"
        note={
          <Link href="/icons/" className="text-accent transition-colors hover:text-ink">
            See all {iconCount.toLocaleString("en-GB")} →
          </Link>
        }
      >
        <IconTileGrid tiles={wall} min={104} size={22} labels />
      </Section>

      {/* ── Close ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1560px] px-5 pb-[110px] sm:px-7">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-panel px-8 py-14 text-center shadow-panel">
          <div
            aria-hidden="true"
            className="grid-ground pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(80%_60%_at_50%_0%,#000,transparent_75%)]"
          />
          <div className="relative">
            <h2 className="text-h1 font-semibold">Free, and it stays free.</h2>
            <p className="mx-auto mt-3 max-w-[52ch] text-lead text-ink-2">
              MIT licensed — commercial use, no attribution, no seat count, and no later
              version that takes it away.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              <Button asChild size="lg">
                <Link href="/icons/">Browse the set</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://github.com/iconmind/iconmind">Star on GitHub</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contribute/">Request an icon</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/** Every band on this page is a heading, an optional right-hand link, and a block. */
function Section({
  title, note, children, className,
}: {
  title: string;
  note?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-[1560px] px-5 pb-16 sm:px-7 ${className ?? ""}`}>
      <div className="mb-[18px] flex items-baseline justify-between gap-4">
        <h2 className="text-[15px] font-semibold tracking-[-0.01em]">{title}</h2>
        {note && <div className="shrink-0 text-[13px] text-muted">{note}</div>}
      </div>
      {children}
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-[26px] font-semibold tracking-[-0.03em] tabular-nums">{value}</div>
      <div className="mt-0.5 text-meta text-muted">{label}</div>
    </div>
  );
}

function Feature({
  title, icon, children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="px-5 py-5">
      <span className="mb-4 grid size-9 place-items-center rounded-lg bg-accent-soft text-accent">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {icon}
        </svg>
      </span>
      <h3 className="text-[14.5px] font-semibold tracking-[-0.015em]">{title}</h3>
      <p className="mt-2 text-body leading-relaxed text-ink-2">{children}</p>
    </Card>
  );
}
