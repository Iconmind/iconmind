/**
 * Structured data, as a real `<script>` in the HTML.
 *
 * One component so there is one place to check that it actually renders. The icon pages
 * had this inline and it was emitting nothing at all — not because of how it was written
 * but because the whole subtree was bailing out to client-side rendering, and structured
 * data that only exists after hydration is structured data no crawler will read.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const BASE = "https://iconmind.dev";

/** The trail a search result shows under its title instead of a bare URL. */
export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${BASE}${t.path}`,
    })),
  };
}
