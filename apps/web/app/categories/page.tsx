import type { Metadata } from "next";
import Link from "next/link";
import { allCategories, iconCount, iconsIn } from "@/lib/icons";
import { readSvg, svgBody } from "@/lib/svg";
import { BLURB, spread } from "@/lib/blurbs";
import { IconSvg } from "@/components/icon-svg";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageCta } from "@/components/page-cta";
import { JsonLd, breadcrumbs } from "@/components/json-ld";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Every IconMind icon grouped by domain — AI, agents, MCP, RAG, data, devops, cloud, security, automation, analytics, developer tools and interface.",
  alternates: { canonical: "/categories/" },
};

/**
 * The twelve domains, at the density of the rest of the site.
 *
 * This page used to run two columns of 26px-padded cards with 24px headings — the only
 * screen on the site set at that scale, and twelve of them meant three scrolls to see a
 * list of twelve things. It is the same card as the landing page's category strip now:
 * four up, a 14.5px title, the blurb at caption size, and the icons doing the talking.
 * Nothing was dropped in the shrink — the share bar and the group list are still here,
 * and the groups are links rather than a count.
 */
export default function CategoriesPage() {
  const cards = allCategories
    .slice()
    .sort((a, b) => b.count - a.count)
    .map((c) => ({
      ...c,
      blurb: BLURB[c.slug] ?? "",
      strip: spread(iconsIn(c.slug), 6).map((i) => ({
        slug: i.slug,
        body: svgBody(readSvg(i.category, i.slug)),
      })),
    }));

  // The bar under each name is that category's share of the set — the ordering already
  // says which is biggest, and this says by how much without a second number.
  const largest = Math.max(...cards.map((c) => c.count));
  const groups = allCategories.reduce((n, c) => n + c.subcategories.length, 0);

  return (
    <div className="mx-auto max-w-[1560px] px-5 pt-14 pb-24 sm:px-7">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              name: "Icon categories",
              description: `${allCategories.length} domains covering ${iconCount} open-source icons for AI-era software.`,
              url: "https://iconmind.dev/categories/",
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: allCategories.length,
                itemListElement: cards.map((c, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: `${c.name} icons`,
                  url: `https://iconmind.dev/categories/${c.slug}/`,
                })),
              },
            },
            breadcrumbs([{ name: "Categories", path: "/categories/" }]),
          ],
        }}
      />
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-[62ch]">
          <h1 className="text-h1 font-semibold">Categories</h1>
          <p className="mt-2 text-lead text-ink-2">
            {allCategories.length} domains, {groups} groups,{" "}
            {iconCount.toLocaleString("en-GB")} icons — ordered by how much of the set each
            one carries.
          </p>
        </div>
        <Button asChild variant="outline" size="sm" className="self-start sm:self-auto">
          <Link href="/icons/">
            Browse everything
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h15M13.2 6l6 6-6 6" />
            </svg>
          </Link>
        </Button>
      </header>

      <div className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.slug} href={`/categories/${c.slug}/`} className="group">
            <Card className="flex h-full flex-col px-4 pt-4 pb-3.5 transition-all group-hover:-translate-y-0.5 group-hover:border-accent group-hover:shadow-panel">
              <div className="mb-4 flex justify-between gap-2 text-ink">
                {c.strip.map((i) => (
                  <IconSvg key={i.slug} body={i.body} size={19} />
                ))}
              </div>

              <div className="flex items-baseline justify-between gap-2">
                <CardTitle>{c.name}</CardTitle>
                <span className="font-mono text-[11.5px] tabular-nums text-muted">{c.count}</span>
              </div>
              <CardDescription className="mt-[3px]">{c.blurb}</CardDescription>

              <div className="mt-3.5 h-[3px] w-full overflow-hidden rounded-pill bg-sunk">
                <span
                  className="block h-full rounded-pill bg-accent/60 transition-colors group-hover:bg-accent"
                  style={{ width: `${Math.round((c.count / largest) * 100)}%` }}
                />
              </div>

              {/* The groups, named. A card that says "9 groups" makes you open it to find
                  out whether yours is one of them; this one answers that from the index.

                  Three and a remainder, not a two-line clamp: clamping cut the fourth slug
                  mid-word on half the cards, and a truncated `tool-use…` reads as a broken
                  string rather than as a list that carries on. */}
              <p className="mt-3 truncate font-mono text-[10.5px] text-muted">
                {c.subcategories.slice(0, 3).map((s) => s.slug).join(" · ")}
                {c.subcategories.length > 3 && (
                  <span> +{c.subcategories.length - 3}</span>
                )}
              </p>

              <p className="mt-auto pt-3 font-mono text-[10.5px] text-muted">
                {c.subcategories.length} groups
                <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="px-1.5 text-line">·</span>
                  open →
                </span>
              </p>
            </Card>
          </Link>
        ))}
      </div>

      <PageCta heading="Pick a domain, or take the lot">
        Every category is generated from the same declaration set, so an icon from Security
        and one from RAG are the same drawing system at two ends of a product. MIT licensed —
        commercial use, no attribution, no seat count.
      </PageCta>
    </div>
  );
}
