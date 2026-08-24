import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allCategories, categoryOf, iconsIn } from "@/lib/icons";
import { readSvg, svgBody } from "@/lib/svg";
import { IconSvg } from "@/components/icon-svg";

export function generateStaticParams() {
  return allCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = categoryOf(category);
  if (!c) return {};
  return {
    title: `${c.name} icons`,
    description: `${c.count} free ${c.name} icons in SVG and React. MIT licensed.`,
    alternates: { canonical: `/categories/${c.slug}/` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = categoryOf(category);
  if (!c) notFound();
  const icons = iconsIn(c.slug);

  return (
    <div className="pb-24 pt-10">
      <nav className="text-sm text-ink-faint">
        <Link href="/categories/" className="transition-colors hover:text-ink">Categories</Link>
        <span className="px-2">/</span>{c.slug}
      </nav>
      <h1 className="mt-8 text-hero font-semibold">{c.name}</h1>
      <p className="mt-4 text-lg text-ink-soft">
        {c.count} icons across {c.subcategories.length} subcategories.
      </p>

      {c.subcategories.map((sub) => {
        const group = icons.filter((i) => i.subcategory === sub.slug);
        if (!group.length) return null;
        return (
          <section key={sub.slug} className="mt-14">
            <h2 className="text-eyebrow font-semibold uppercase text-ink-faint">
              {sub.slug} <span className="tabular-nums opacity-60">{group.length}</span>
            </h2>
            <ul className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-card bg-line-soft sm:grid-cols-5 lg:grid-cols-7">
              {group.map((i) => (
                <li key={i.slug}>
                  <Link href={`/icons/${i.slug}/`} title={i.description}
                    className="group flex aspect-square flex-col items-center justify-center gap-3 bg-canvas transition-colors hover:bg-raised">
                    <span className="transition-colors group-hover:text-accent">
                      <IconSvg body={svgBody(readSvg(i.category, i.slug))} size={24} />
                    </span>
                    <span className="max-w-[90%] truncate text-[0.6875rem] text-ink-faint">{i.slug}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
