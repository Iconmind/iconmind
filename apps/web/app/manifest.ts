import type { MetadataRoute } from "next";

// A static export has no server to generate this per request, so it is emitted at build
// time like `robots.ts` and `sitemap.ts` beside it.
export const dynamic = "force-static";

/**
 * Enough of a manifest to install, and nothing it cannot honour.
 *
 * No `screenshots`, no `shortcuts` pointing at routes that do not exist, and
 * `display: browser` rather than `standalone` — this is a documentation site, and 700
 * icons behind a chrome-less window with no address bar is worse to use, not better.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IconMind — icons for AI-era software",
    short_name: "IconMind",
    description:
      "Open-source icons for AI-era software: LLMs, agents, MCP, RAG, and everything around them. MIT licensed.",
    start_url: "/",
    display: "browser",
    background_color: "#faf8f5",
    theme_color: "#faf8f5",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/icon-192.png", type: "image/png", sizes: "192x192", purpose: "any" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512", purpose: "any" },
    ],
  };
}
