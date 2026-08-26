import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { TOCItemType } from "fumadocs-core/toc";
import { getMDXComponents } from "@/components/mdx";
import { orderedPages, source } from "@/lib/source";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { JsonLd, breadcrumbs } from "@/components/json-ld";
import { faqEntries } from "@/lib/faq";

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug?: string[] }> },
): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) return {};
  return {
    title: page.data.title,
    description: page.data.description,
    alternates: { canonical: page.url.endsWith("/") ? page.url : `${page.url}/` },
  };
}

/**
 * What a documentation page is, to a crawler.
 *
 * `TechArticle` rather than the generic `Article`: these are reference pages for
 * developers, and the type is the one Google documents for exactly that. No
 * `datePublished` — the pages have no dates in their frontmatter, and inventing one to
 * fill a recommended field is how structured data stops being worth trusting.
 *
 * The FAQ gets a second node. It is already a set of `##` questions with prose under
 * each; all it was missing was anything telling a crawler so, and `FAQPage` is one of the
 * few types that still changes what a result looks like.
 */
function schema(page: { url: string; data: { title: string; description?: string } }, isFaq: boolean) {
  const url = `https://iconmind.dev${page.url}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: page.data.title,
        description: page.data.description,
        url,
        inLanguage: "en",
        isPartOf: { "@type": "WebSite", "@id": "https://iconmind.dev/#website" },
        license: "https://opensource.org/licenses/MIT",
      },
      breadcrumbs(
        page.url === "/docs"
          ? [{ name: "Docs", path: "/docs/" }]
          : [
              { name: "Docs", path: "/docs/" },
              { name: page.data.title, path: `${page.url}/` },
            ],
      ),
      ...(isFaq
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faqEntries().map((e) => ({
                "@type": "Question",
                name: e.question,
                acceptedAnswer: { "@type": "Answer", text: e.answer },
              })),
            },
          ]
        : []),
    ],
  };
}

export default async function DocPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
  const isFaq = page.url === "/docs/faq";

  // Sync collection: the compiled body and toc sit directly on page.data. The
  // load() form belongs to the async collection variant.
  const { body: MDX, toc } = page.data;
  const pages = orderedPages();
  const index = pages.findIndex((p) => p.url === page.url);
  const prev = pages[index - 1];
  const next = pages[index + 1];

  return (
    <div className="mx-auto grid max-w-[84rem] gap-0 px-5 pb-24 sm:px-7 lg:grid-cols-[14rem_minmax(0,1fr)_12rem]">
      <JsonLd data={schema(page, isFaq)} />
      <nav
        aria-label="Documentation"
        className="border-line py-8 lg:sticky lg:top-[60px] lg:h-[calc(100vh-60px)] lg:overflow-y-auto lg:border-r lg:py-12 lg:pr-6"
      >
        <h2 className="label mb-3">Docs</h2>
        <ul className="grid gap-px">
          {pages.map((p) => {
            const active = p.url === page.url;
            return (
              <li key={p.url}>
                <Link href={`${p.url}/`}
                  className={`block rounded-md px-2.5 py-1.5 text-ui transition-colors ${
                    active ? "bg-accent-soft font-semibold text-accent" : "text-ink-2 hover:bg-sunk hover:text-ink"}`}>
                  {p.data.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <Separator className="my-6 hidden lg:block" />
        <a
          href="https://github.com/iconmind/iconmind"
          className="hidden items-center gap-1.5 px-2.5 text-meta text-muted transition-colors hover:text-ink lg:flex"
        >
          Source on GitHub
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7M8.5 7H17v8.5" />
          </svg>
        </a>
      </nav>

      <article className="min-w-0 py-10 lg:px-10 lg:py-12">
        <p className="label">Documentation</p>
        <h1 className="mt-3 text-h1 font-semibold">{page.data.title}</h1>
        {page.data.description && (
          <p className="mt-4 max-w-[62ch] text-[1.0625rem] leading-[1.7] text-ink-2">{page.data.description}</p>
        )}
        <div className="mt-10">
          <MDX components={getMDXComponents()} />
        </div>

        <nav className="mt-20 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
          {prev ? (
            <Link href={`${prev.url}/`} className="group">
              <Card className="h-full px-5 py-4 transition-colors group-hover:border-accent">
                <span className="label block">← Previous</span>
                <span className="mt-1.5 block text-ui font-semibold">{prev.data.title}</span>
              </Card>
            </Link>
          ) : <span />}
          {next && (
            <Link href={`${next.url}/`} className="group sm:col-start-2">
              <Card className="h-full px-5 py-4 text-right transition-colors group-hover:border-accent">
                <span className="label block">Next →</span>
                <span className="mt-1.5 block text-ui font-semibold">{next.data.title}</span>
              </Card>
            </Link>
          )}
        </nav>
      </article>

      {toc.length > 0 && (
        <nav
          aria-label="On this page"
          className="hidden py-12 lg:sticky lg:top-[60px] lg:block lg:max-h-[calc(100vh-60px)] lg:self-start lg:overflow-y-auto"
        >
          <h2 className="label mb-3">On this page</h2>
          <ul className="grid gap-1.5 border-l border-line">
            {toc.map((item: TOCItemType) => (
              <li key={item.url} style={{ paddingLeft: `${0.75 + (item.depth - 2) * 0.75}rem` }}>
                <a href={item.url} className="block text-meta leading-[1.45] text-muted transition-colors hover:text-ink">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
