import Link from "next/link";

/**
 * The icons on a list page, in words.
 *
 * A grid of tiles is what a reader scans; a list of names with a sentence each is what a
 * search engine reads — and the only text on a tag or group page that no other page has
 * in this combination. Every description here was written for that: what the drawing
 * shows, and what somebody would call it. Not a summary, not a sample — every icon on the
 * page, so the page says exactly what it contains.
 */
export function DescribedList({
  heading,
  icons,
}: {
  heading: string;
  icons: { slug: string; name: string; description: string; componentName: string }[];
}) {
  const first = icons[0];
  return (
    <section className="mt-12">
      <h2 className="text-[15px] font-semibold tracking-[-0.01em]">{heading}</h2>
      <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 xl:grid-cols-3">
        {icons.map((i) => (
          <div key={i.slug} className="min-w-0">
            <dt className="text-ui font-medium">
              <Link href={`/icons/${i.slug}/`} className="transition-colors hover:text-accent">
                {i.name}
              </Link>
              <span className="ml-2 font-mono text-[11px] text-muted">{i.slug}</span>
            </dt>
            <dd className="mt-0.5 text-meta text-ink-2">
              {/[.!?]$/.test(i.description) ? i.description : `${i.description}.`}
            </dd>
          </div>
        ))}
      </dl>
      {first && (
        <p className="mt-6 text-meta text-muted">
          In code, each is one import —{" "}
          <code className="rounded-md border border-line-2 bg-sunk px-1.5 py-0.5 font-mono text-[11.5px] text-ink-2">
            {`import { ${first.componentName} } from "@iconmind/react/icons/${first.slug}"`}
          </code>{" "}
          — and the same name in Vue, Svelte, Solid, Preact, React Native, Astro, Blade and Flutter.
        </p>
      )}
    </section>
  );
}
