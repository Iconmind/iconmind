import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allIcons, getIcon, iconsIn } from "@/lib/icons";
import { readSvg, svgBody } from "@/lib/svg";
import { IconSvg } from "@/components/icon-svg";
import { CopyButton } from "@/components/copy-button";

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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <h2 className="text-eyebrow font-semibold uppercase text-ink-faint">{children}</h2>;
}

export default async function IconPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const icon = getIcon(slug);
  if (!icon) notFound();

  const svg = readSvg(icon.category, icon.slug);
  const body = svgBody(svg);
  const jsx = `<${icon.componentName} />`;
  const imp = `import { ${icon.componentName} } from "@iconmind/react";`;
  const related = icon.related.map(getIcon).filter(Boolean) as typeof allIcons;
  const siblings = iconsIn(icon.category).filter((i) => i.slug !== icon.slug).slice(0, 14);

  return (
    <article className="pb-24 pt-10">
      <nav className="text-sm text-ink-faint">
        <Link href="/icons/" className="transition-colors hover:text-ink">Icons</Link>
        <span className="px-2">/</span>
        <Link href={`/categories/${icon.category}/`} className="transition-colors hover:text-ink">{icon.category}</Link>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[19rem_1fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="chamfer hairline flex aspect-square items-center justify-center bg-surface">
            <IconSvg body={body} size={128} />
          </div>
          <div className="hairline mt-3 flex items-center justify-around rounded-card py-5">
            {[16, 20, 24, 32].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2.5">
                <IconSvg body={body} size={s} />
                <span className="text-[0.625rem] tabular-nums text-ink-faint">{s}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <CopyButton value={svg} label="Copy SVG" full />
            <CopyButton value={jsx} label="Copy JSX" full />
          </div>
        </aside>

        <div className="min-w-0">
          <h1 className="text-hero font-semibold">{icon.name}</h1>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-soft">{icon.description}</p>

          <div className="mt-10 space-y-8">
            <div>
              <Eyebrow>React</Eyebrow>
              <pre className="chamfer hairline mt-3 overflow-x-auto bg-surface px-6 py-5 font-mono text-sm leading-relaxed">
                <span className="text-ink-soft">{imp}</span>{"\n\n"}{jsx}
              </pre>
            </div>
            <div>
              <Eyebrow>SVG</Eyebrow>
              <pre className="chamfer hairline mt-3 overflow-x-auto bg-surface px-6 py-5 font-mono text-xs leading-relaxed text-ink-soft">{svg}</pre>
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
            {[["Category", icon.category], ["Subcategory", icon.subcategory],
              ["Elements", String(icon.elementCount)], ["Size", `${icon.byteSize} B`]].map(([k, v]) => (
              <div key={k}>
                <dt className="text-eyebrow font-semibold uppercase text-ink-faint">{k}</dt>
                <dd className="mt-2 font-mono text-sm">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <Eyebrow>Tags</Eyebrow>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {icon.tags.map((t) => (
                <span key={t} className="rounded-pill bg-raised px-3 py-1 text-xs text-ink-soft">{t}</span>
              ))}
            </div>
          </div>

          <a className="mt-10 inline-block text-sm text-ink-faint underline decoration-line underline-offset-4 transition-colors hover:text-ink"
            href={`https://github.com/iconmind/iconmind/blob/main/packages/icons/icons/${icon.category}/${icon.slug}.svg`}>
            Improve this icon on GitHub
          </a>
        </div>
      </div>

      {related.length > 0 && <Row title="Looks similar" icons={related} />}
      {siblings.length > 0 && <Row title={`More in ${icon.category}`} icons={siblings} />}
    </article>
  );
}

function Row({ title, icons }: { title: string; icons: typeof allIcons }) {
  return (
    <section className="mt-16 border-t border-line pt-8">
      <Eyebrow>{title}</Eyebrow>
      <ul className="mt-5 flex flex-wrap gap-2">
        {icons.map((i) => (
          <li key={i.slug}>
            <Link href={`/icons/${i.slug}/`} title={i.name}
              className="hairline flex size-16 items-center justify-center rounded-card text-ink-soft transition-colors hover:bg-raised hover:text-accent">
              <IconSvg body={svgBody(readSvg(i.category, i.slug))} size={24} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
