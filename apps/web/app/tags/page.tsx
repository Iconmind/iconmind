import type { Metadata } from "next";
import Link from "next/link";
import { iconCount } from "@/lib/icons";
import { TAG_PAGE_MIN, allTags } from "@/lib/index-pages";
import { PageCta } from "@/components/page-cta";
import { JsonLd, breadcrumbs } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tags",
  description: `Every IconMind tag with ${TAG_PAGE_MIN} or more icons — ${allTags.length} ways into ${iconCount} open-source icons for AI-era software, from “alert” to “workflow”.`,
  alternates: { canonical: "/tags/" },
};

/**
 * The tags, as an index — alphabetical, with a count, and nothing else.
 *
 * The categories page can afford a card per entry because there are twelve. There are
 * six hundred and sixty-nine of these, and the reader's question is "is my word here":
 * a letter rail, one chip per tag, and the count that says how much is behind it. The
 * popular row at the top is for the reader who does not have a word yet.
 */
export default function TagsPage() {
  const letters = new Map<string, typeof allTags>();
  for (const t of allTags.slice().sort((a, b) => a.slug.localeCompare(b.slug))) {
    const l = t.slug[0]!.toUpperCase();
    const list = letters.get(l);
    if (list) list.push(t);
    else letters.set(l, [t]);
  }
  const popular = allTags.slice(0, 24);

  return (
    <div className="mx-auto max-w-[1560px] px-5 pt-14 pb-24 sm:px-7">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              name: "Icon tags",
              description: `${allTags.length} tags across ${iconCount} open-source icons for AI-era software.`,
              url: `${SITE_URL}/tags/`,
              isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: allTags.length,
                itemListElement: popular.map((t, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: `${t.slug} icons`,
                  url: `${SITE_URL}/tags/${t.slug}/`,
                })),
              },
            },
            breadcrumbs([{ name: "Tags", path: "/tags/" }]),
          ],
        }}
      />
      <header className="max-w-[62ch]">
        <h1 className="text-h1 font-semibold">Tags</h1>
        <p className="mt-2 text-lead text-ink-2">
          {allTags.length} tags, each on {TAG_PAGE_MIN} or more of the{" "}
          {iconCount.toLocaleString("en-GB")} icons. A tag is the word the drawing answers to
          across categories — <span className="font-mono text-ink">retry</span> is in devops,
          agents and automation, and its page holds all of them.
        </p>
      </header>

      <section className="mt-8">
        <h2 className="label mb-3">Most used</h2>
        <div className="flex flex-wrap gap-2">
          {popular.map((t) => (
            <Link
              key={t.slug}
              href={`/tags/${t.slug}/`}
              className="flex items-center gap-2 rounded-md border border-line bg-panel px-3 py-1.5 font-mono text-mono transition-colors hover:border-accent"
            >
              {t.slug}
              <span className="text-[11px] tabular-nums text-muted">{t.count}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="fade-r mt-10 overflow-x-auto border-y border-line py-2.5">
        <div className="flex w-max gap-1">
          {[...letters.keys()].map((l) => (
            <a
              key={l}
              href={`#${l}`}
              className="rounded-pill px-2.5 py-1 font-mono text-mono text-ink-2 transition-colors hover:bg-sunk hover:text-ink"
            >
              {l}
            </a>
          ))}
        </div>
      </div>

      {[...letters.entries()].map(([l, list]) => (
        <section key={l} id={l} className="mt-8 scroll-mt-[76px] grid gap-3 sm:grid-cols-[3rem_1fr]">
          <h2 className="font-mono text-h2 font-semibold text-muted">{l}</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {list.map((t) => (
              <Link
                key={t.slug}
                href={`/tags/${t.slug}/`}
                className="font-mono text-mono text-ink-2 transition-colors hover:text-accent"
              >
                {t.slug}
                <span className="ml-1 text-[11px] tabular-nums text-muted">{t.count}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <PageCta heading="A word, not a category">
        Tags are how the set is searched — on this site, in the MCP server, and in the search
        index every assistant can read. MIT licensed: commercial use, no attribution, no seat
        count.
      </PageCta>
    </div>
  );
}
