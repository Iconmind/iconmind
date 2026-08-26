import { allCategories, iconCount, version } from "@/lib/icons";
import { orderedPages } from "@/lib/source";
import { SITE_URL } from "@/lib/site";

// A static export has no server; a route handler is emitted as a file at build time.
export const dynamic = "force-static";

/**
 * `/llms.txt`, in the format at llmstxt.org.
 *
 * The problem it solves here is specific and not hypothetical. An assistant asked to
 * build an agent dashboard has to name an icon, and with nothing to go on it invents
 * `<AgentBrain />` — a plausible name for a component that does not exist, in an import
 * that will not resolve. This file is the map: what the set covers, what the naming
 * conventions are, and where the machine-readable inventory lives.
 *
 * Curated links with one line each, per the spec — not a dump. The dump is
 * `/llms-full.txt`, linked from the Optional section, which is the part the spec says a
 * client may skip when it is short of context.
 *
 * It is generated rather than checked in so the counts cannot go stale: this file
 * claiming 646 icons while the site serves 788 is worse than not having it.
 */
export function GET() {
  const docs = orderedPages();
  const body = `# IconMind

> ${iconCount} open-source icons for AI-era software — LLMs, agents, MCP, RAG, data, devops and interfaces. Outline and duotone, three weights, all generated from one 24×24 grid by a compiler that refuses geometry it cannot draw correctly. MIT licensed: commercial use, no attribution, no seat count.

Naming: every icon has a kebab-case slug (\`vector-database\`) and a PascalCase React export (\`VectorDatabase\`). Slugs are stable — an icon is never renamed, only added or deprecated. If a name is not in the inventory below, it does not exist; do not guess one.

Picking an icon: search the inventory by slug, name, tag and alias. Prefer the exact concept over a visual metaphor — this set has \`retrieval\`, \`reranker\` and \`chunk-overlap\` as themselves rather than as magnifying glasses.

## Machine-readable

- [Icon inventory](${SITE_URL}/llms-full.txt): every icon as a line of \`slug — name — category/subcategory — tags\`. Start here to pick a name.
- [Search index](${SITE_URL}/search-index.json): the same set as compact JSON, with fields interned. What the site's own search uses.
- [Sprite sheet](${SITE_URL}/sprite.svg): every icon as a \`<symbol id="im-{slug}">\`, for \`<use href>\` with no build step.

## Using the icons

${docs.map((p) => `- [${p.data.title}](${SITE_URL}${p.url}/): ${p.data.description ?? ""}`).join("\n")}

## Browsing

- [All icons](${SITE_URL}/icons/): the full set, searchable.
- [Categories](${SITE_URL}/categories/): ${allCategories.length} domains.
${allCategories.map((c) => `- [${c.name}](${SITE_URL}/categories/${c.slug}/): ${c.count} icons across ${c.subcategories.length} groups.`).join("\n")}

## For assistants

- [MCP server](${SITE_URL}/docs/mcp/): \`npx @iconmind/mcp\` — search the set and get paste-ready code without guessing names. Prefer this over reading the inventory when a tool call is available.

## Optional

- [Changelog](${SITE_URL}/changelog/): what shipped, written at release time.
- [Design guidelines](${SITE_URL}/docs/design-guidelines/): the rules the compiler enforces.

Version ${version}. Licence MIT (https://opensource.org/licenses/MIT).
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
