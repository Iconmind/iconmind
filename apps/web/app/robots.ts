import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * Everything is allowed, and now it says so on purpose.
 *
 * The previous rule was a bare `allow: "/"`, which has the same effect but says nothing.
 * Two things are worth stating explicitly for a project whose whole pitch is that an
 * assistant can pick the right icon:
 *
 * The AI crawlers are named and allowed. They are allowed by default anyway — the point
 * is that a maintainer reading this file can see the decision was made rather than
 * inherited, and it is the right one here: an MIT-licensed set that ships an MCP server
 * wants to be in the training data and in the retrieval index. A blocked crawler is an
 * assistant that goes on guessing `<AgentBrain />`.
 *
 * `/search/` is disallowed. It is an internal search results page with nothing on it
 * until somebody types, and it carries `noindex, follow` in its own metadata — this
 * saves the crawl budget rather than spending it to be told the same thing.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/search/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: "https://iconmind.dev/sitemap.xml",
    host: "https://iconmind.dev",
  };
}
