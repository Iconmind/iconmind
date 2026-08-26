import type { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { categories, find, inCategory, nearest, search, snippets } from "./data.js";

const CATEGORY_ENUM = categories.map((c) => c.slug);

/**
 * Tool descriptions are prompt engineering, not documentation — the model decides
 * whether to call a tool by reading them. "Use this before writing any UI code that
 * needs an icon" is the single most load-bearing sentence in this file.
 */
const TOOLS = [
  {
    name: "search_icon",
    description:
      "Search IconMind icons by keyword, concept, or description. Use this before " +
      "writing any UI code that needs an icon, so you pick one that actually exists " +
      "instead of guessing a name.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keyword or concept, e.g. 'vector database', 'agent memory'" },
        category: { type: "string", enum: CATEGORY_ENUM, description: "Restrict to one domain" },
        limit: { type: "integer", default: 10, maximum: 50 },
      },
      required: ["query"],
    },
  },
  {
    name: "get_icon",
    description: "Fetch one icon by its exact slug: metadata plus paste-ready React and HTML.",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string" },
        size: { type: "integer", default: 24 },
      },
      required: ["slug"],
    },
  },
  {
    name: "list_category",
    description:
      "List icons in a category, optionally filtered by subcategory. With no arguments, " +
      "returns the categories themselves.",
    inputSchema: {
      type: "object",
      properties: {
        category: { type: "string", enum: CATEGORY_ENUM },
        subcategory: { type: "string" },
        limit: { type: "integer", default: 50, maximum: 200 },
      },
    },
  },
  {
    name: "get_icon_code",
    description:
      "Generate one combined import plus usage for several icons at once. Prefer this " +
      "over repeated get_icon calls when building a component that needs more than one.",
    inputSchema: {
      type: "object",
      properties: {
        slugs: { type: "array", items: { type: "string" }, maxItems: 20 },
        framework: { type: "string", enum: ["react", "html"], default: "react" },
      },
      required: ["slugs"],
    },
  },
] as const;

const json = (data: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] });

export function registerTools(server: Server) {
  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS as unknown as [] }));

  server.setRequestHandler(CallToolRequestSchema, async (req) => {
    const a = (req.params.arguments ?? {}) as Record<string, never>;

    switch (req.params.name) {
      case "search_icon": {
        const query = String(a["query"] ?? "");
        const hits = search(query, {
          category: a["category"] ? String(a["category"]) : undefined,
          limit: Number(a["limit"] ?? 10),
        });
        if (!hits.length) {
          // Never an error: a model handed an error tends to stop or invent a name,
          // whereas one handed suggestions picks the right thing.
          return json({
            query, count: 0,
            suggestions: nearest(query).map((i) => i.slug),
            hint: "Nothing matched. Try a broader term, or say so rather than inventing an icon name.",
          });
        }
        return json({
          query,
          count: hits.length,
          results: hits.map(({ icon, score, matched }) => ({
            slug: icon.slug, name: icon.name, category: icon.category,
            description: icon.description, score, matched, ...snippets(icon),
          })),
        });
      }

      case "get_icon": {
        const slug = String(a["slug"] ?? "");
        const icon = find(slug);
        if (!icon) {
          return json({
            found: false, slug,
            suggestions: nearest(slug).map((i) => i.slug),
            hint: "Slug not found. Use search_icon for a free-text search.",
          });
        }
        return json({
          found: true,
          ...icon,
          ...snippets(icon, Number(a["size"] ?? 24)),
        });
      }

      case "list_category": {
        const category = a["category"] ? String(a["category"]) : undefined;
        if (!category) {
          return json({
            categories: categories.map((c) => ({
              slug: c.slug, name: c.name, count: c.count,
              subcategories: c.subcategories.map((s) => s.slug),
            })),
          });
        }
        const sub = a["subcategory"] ? String(a["subcategory"]) : undefined;
        const list = inCategory(category, sub).slice(0, Number(a["limit"] ?? 50));
        return json({
          category, subcategory: sub, count: list.length,
          icons: list.map((i) => ({
            slug: i.slug, name: i.name, subcategory: i.subcategory, description: i.description,
          })),
        });
      }

      case "get_icon_code": {
        const slugs = (a["slugs"] as unknown as string[]) ?? [];
        const found = slugs.map((s) => ({ slug: s, icon: find(s) }));
        const missing = found.filter((f) => !f.icon).map((f) => f.slug);
        const ok = found.flatMap((f) => (f.icon ? [f.icon] : []));
        if (!ok.length) return json({ missing, hint: "None of those slugs exist. Use search_icon." });

        const framework = String(a["framework"] ?? "react");
        if (framework === "html") {
          return json({ missing, html: ok.map((i) => snippets(i).html).join("\n") });
        }
        return json({
          missing,
          import: `import { ${ok.map((i) => i.componentName).join(", ")} } from "@iconmind/react";`,
          usage: ok.map((i) => `<${i.componentName} />`).join("\n"),
        });
      }

      default:
        return json({ error: `Unknown tool: ${req.params.name}` });
    }
  });
}
