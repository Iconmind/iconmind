import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allIcons, categoryOf, getIcon, iconCount, iconsIn } from "@/lib/icons";
import { readCells, readSvg, svgBody } from "@/lib/svg";
import { IconStudio } from "@/components/icon-studio";
import { IconTileGrid } from "@/components/icon-tile-grid";
import { PageCta } from "@/components/page-cta";
import { JsonLd, breadcrumbs } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { SITE_URL } from "@/lib/site";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function generateStaticParams() {
  return allIcons.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const icon = getIcon(slug);
  if (!icon) return {};
  return {
    title: `${icon.name} icon`,
    description: `${icon.description}. Free ${icon.category} icon in SVG and React — MIT licensed.`,
    alternates: { canonical: `/icons/${icon.slug}/` },
  };
}

/**
 * What this page is, in the words a search engine parses. Only what is true.
 *
 * A graph rather than a single node, because the page is two things at once: an image
 * with a licence, and a leaf on a trail. The `BreadcrumbList` is what turns a result's
 * second line from `iconmind.dev › icons › agent` guessed from the URL into the names
 * this site actually calls those levels.
 */
function schema(icon: {
  slug: string; name: string; description: string; category: string; addedIn: string;
}, categoryName: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageObject",
        name: `${icon.name} icon`,
        description: icon.description,
        contentUrl: `${SITE_URL}/icons/${icon.slug}.svg`,
        encodingFormat: "image/svg+xml",
        license: "https://opensource.org/licenses/MIT",
        acquireLicensePage: `${SITE_URL}/docs/licence/`,
        creditText: "IconMind",
        isFamilyFriendly: true,
      },
      breadcrumbs([
        { name: "Icons", path: "/icons/" },
        { name: categoryName, path: `/categories/${icon.category}/` },
        { name: icon.name, path: `/icons/${icon.slug}/` },
      ]),
    ],
  };
}

/**
 * The icon's own page.
 *
 * The drawer is where browsing happens; this exists for what a drawer cannot be — a link
 * somebody can send, and a result a search engine can index. It carries the same
 * customiser, because somebody who arrived here from a search result wants the exact SVG
 * just as much as somebody who got here by clicking a grid cell — and below it the things
 * a drawer has no room for: every cell at once, the spec, and the rest of the category.
 */
export default async function IconPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const icon = getIcon(slug);
  if (!icon) notFound();

  const cells = readCells(icon.category, icon.slug);
  const category = categoryOf(icon.category);
  const categoryName = category?.name ?? icon.category;
  const tile = (i: (typeof allIcons)[number]) => ({
    slug: i.slug,
    name: i.name,
    body: svgBody(readSvg(i.category, i.slug)),
    meta: i.subcategory,
  });

  const related = (icon.related.map(getIcon).filter(Boolean) as typeof allIcons).map(tile);
  // Its neighbours in the same category, for the toolbar and the list — an icon beside five
  // grey boxes proves nothing about whether it holds its own.
  const rest = iconsIn(icon.category).filter((i) => i.slug !== icon.slug);
  const neighbours = rest.slice(0, 5).map((i) => ({
    slug: i.slug,
    name: i.name,
    body: svgBody(readSvg(i.category, i.slug)),
  }));
  const siblings = rest.slice(0, 18).map(tile);

  return (
    <article className="px-5 pt-6 pb-20 sm:px-7">
      <JsonLd data={schema(icon, categoryName)} />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/icons/">icons</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/categories/${icon.category}/`}>{icon.category}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{icon.slug}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-[62ch]">
          <h1 className="text-h1 font-semibold">{icon.name}</h1>
          <p className="mt-2 text-lead text-ink-2">{icon.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {icon.tags.map((t) => (
              <Badge key={t} variant="outline" className="px-2.5">
                {t}
              </Badge>
            ))}
          </div>

          {/* The aliases were in the metadata and on no page.
              They are the words somebody types when they do not know what this set calls
              the thing — 255 of the 765 icons have them, and printing them is the only
              unique sentence most of these pages can honestly add. */}
          {icon.aliases.length > 0 && (
            <p className="mt-3 text-meta text-muted">
              Also searched as{" "}
              {icon.aliases.map((a, i) => (
                <span key={a}>
                  {i > 0 && ", "}
                  <span className="font-mono text-ink-2">{a}</span>
                </span>
              ))}
              .
            </p>
          )}
        </div>
        <dl className="flex shrink-0 gap-6 sm:gap-8">
          <Fact k="Category" v={categoryName} />
          <Fact k="Added" v={icon.addedIn} />
          <Fact k="Licence" v="MIT" />
        </dl>
      </header>

      <div className="mt-7">
        <IconStudio
          name={icon.name}
          slug={icon.slug}
          category={icon.category}
          cells={cells}
          neighbours={neighbours}
          spec={{
            category: `${categoryName} / ${icon.subcategory}`,
            elements: icon.elementCount,
            bytes: icon.byteSize,
            added: icon.addedIn,
          }}
        />
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <div>
              <h2 className="text-[15px] font-semibold tracking-[-0.01em]">
                Icons that go with {icon.name}
              </h2>
              <p className="mt-1 text-meta text-muted">
                The concepts this one usually appears beside, not just the ones filed near it.
              </p>
            </div>
            <span className="font-mono text-mono text-muted">{related.length}</span>
          </div>
          {/* Bigger cells than the browse grid, and named.
              Browsing 700 icons wants density; being shown six alternatives to the one
              you already chose wants legibility, and an unlabelled 24px glyph makes you
              hover each one to find out what it is. */}
          <IconTileGrid tiles={related} min={136} size={30} labels fit />
        </section>
      )}

      {siblings.length > 0 && (
        <section className="mt-10">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <div>
              <h2 className="text-[15px] font-semibold tracking-[-0.01em]">
                More {categoryName} icons
              </h2>
              <p className="mt-1 text-meta text-muted">
                {category?.count ?? rest.length + 1} icons across{" "}
                {category?.subcategories.length ?? 0} groups, drawn to the same grid and the
                same stroke.
              </p>
            </div>
            <Link
              href={`/categories/${icon.category}/`}
              className="shrink-0 text-[13px] text-accent transition-colors hover:text-ink"
            >
              See all {category?.count ?? rest.length + 1} →
            </Link>
          </div>
          <IconTileGrid tiles={siblings} min={136} size={30} labels />
        </section>
      )}

      <a
        className="mt-10 inline-flex items-center gap-1.5 text-meta text-muted underline underline-offset-[3px] transition-colors hover:text-ink"
        href={`https://github.com/iconmind/iconmind/tree/main/packages/icons/icons/${icon.category}/${icon.slug}`}
      >
        Improve this icon on GitHub
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 17 17 7M8.5 7H17v8.5" />
        </svg>
      </a>
      <PageCta heading={`Ship ${icon.name} in your next build`} primary={{ href: `/categories/${icon.category}/`, label: `Browse ${categoryName}` }}>
        {icon.name} is one of {iconCount.toLocaleString("en-GB")} icons compiled from a single
        grid — outline and duotone, three weights, every cell generated rather than redrawn.
        MIT licensed: commercial use, no attribution, no seat count.
      </PageCta>

    </article>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="label">{k}</dt>
      <dd className="mt-1 text-ui font-medium">{v}</dd>
    </div>
  );
}
