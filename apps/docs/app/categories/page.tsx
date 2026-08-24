import type { Metadata } from "next";
import Link from "next/link";
import { allCategories, iconsIn } from "@/lib/icons";
import { readSvg, svgBody } from "@/lib/svg";
import { IconSvg } from "@/components/icon-svg";

export const metadata: Metadata = {
  title: "Categories",
  description: "IconMind icons grouped by domain: AI, agents, MCP, RAG, and more.",
};

export default function CategoriesPage() {
  return (
    <div className="pb-24 pt-16">
      <h1 className="text-hero font-semibold">Categories</h1>
      <p className="mt-4 max-w-[48ch] text-lg text-ink-soft">
        Twelve domains, ordered by how much of the set they carry.
      </p>
      <ul className="mt-12 grid gap-px overflow-hidden rounded-card bg-line sm:grid-cols-2">
        {allCategories.map((c) => (
          <li key={c.slug}>
            <Link href={`/categories/${c.slug}/`}
              className="flex h-full flex-col justify-between gap-7 bg-canvas p-7 transition-colors hover:bg-raised">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-[1.0625rem] font-medium">{c.name}</h2>
                <span className="text-sm tabular-nums text-ink-faint">{c.count}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-ink-faint">
                {iconsIn(c.slug).slice(0, 8).map((i) => (
                  <IconSvg key={i.slug} body={svgBody(readSvg(i.category, i.slug))} size={20} />
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
