/**
 * The one place the site's public origin lives. Change this line and every canonical
 * URL, sitemap entry, JSON-LD id and llms.txt link moves with it. iconmind.vercel.app
 * still resolves — Vercel 308s it here — but nothing in the repo should point at it.
 */
export const SITE_URL = "https://iconmind.dev";

/**
 * The project's other homes, for JSON-LD `sameAs`. An AI answer or a knowledge panel ties
 * "IconMind" to this site only when something says the repo, the packages and the
 * Iconify set are one project; nothing did. Each URL was checked live on 21 October 2026.
 * Add a registry once its listing exists: Packagist and the MCP registry had none yet.
 */
export const SAME_AS = [
  "https://github.com/Iconmind/iconmind",
  "https://www.npmjs.com/package/@iconmind/react",
  "https://pub.dev/packages/iconmind_flutter",
  "https://icon-sets.iconify.design/iconmind/",
];

/** The publisher, as every page's JSON-LD names it. */
export const ORGANIZATION = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "IconMind",
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  sameAs: SAME_AS,
};
