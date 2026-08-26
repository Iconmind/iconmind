import Link from "next/link";
import { Button } from "@/components/ui/button";
import { iconCount } from "@/lib/icons";

/**
 * The band at the foot of a browse page.
 *
 * Every page on this site used to end by simply stopping — an icon's page trailed off
 * after "Improve this icon on GitHub", a category page after a list of the other
 * categories. Somebody who has read to the bottom of one of 765 pages has told you
 * exactly what they came for; ending with nothing to do next wastes that, and a page
 * whose last element is a footer link reads as unfinished.
 *
 * The three actions are the three real next steps, in the order they are wanted: take the
 * thing, get the package, or ask for the one that is missing.
 */
export function PageCta({
  heading,
  children,
  primary,
}: {
  heading: string;
  children: React.ReactNode;
  /** Overrides the first action for pages where "browse everything" is not the next step. */
  primary?: { href: string; label: string };
}) {
  return (
    <section className="mt-14 overflow-hidden rounded-3xl border border-line bg-panel shadow-panel">
      <div className="relative px-7 py-10 text-center sm:px-10">
        <div
          aria-hidden="true"
          className="grid-ground pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(80%_70%_at_50%_0%,#000,transparent_75%)]"
        />
        <div className="relative">
          <h2 className="text-h2 font-semibold">{heading}</h2>
          <p className="mx-auto mt-2.5 max-w-[54ch] text-body leading-relaxed text-ink-2">
            {children}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            <Button asChild>
              <Link href={primary?.href ?? "/icons/"}>
                {primary?.label ?? `Browse all ${iconCount.toLocaleString("en-GB")} icons`}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/docs/installation/">Install the package</Link>
            </Button>
            <Button asChild variant="outline">
              <a href="https://github.com/iconmind/iconmind/issues/new?template=icon-request.yml">
                Request an icon
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
