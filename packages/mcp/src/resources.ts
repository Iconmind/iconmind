import type { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { ListResourcesRequestSchema, ReadResourceRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { categories, find, icons, inCategory, version } from "./data.js";

export function registerResources(server: Server) {
  server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: [
      { uri: "category://index", name: "Categories", description: "Every category with its counts", mimeType: "application/json" },
      { uri: "metadata://stats", name: "Set statistics", description: "Version and coverage", mimeType: "application/json" },
      ...categories.map((c) => ({
        uri: `category://${c.slug}`,
        name: `${c.name} icons`,
        description: `${c.count} icons in ${c.slug}`,
        mimeType: "application/json",
      })),
      // metadata://all is readable but deliberately not advertised: it is large enough
      // to crowd out a context window, and search_icon answers the same questions.
    ],
  }));

  server.setRequestHandler(ReadResourceRequestSchema, async (req) => {
    const uri = req.params.uri;
    const body = (data: unknown) => ({
      contents: [{ uri, mimeType: "application/json", text: JSON.stringify(data, null, 2) }],
    });

    if (uri === "category://index") return body(categories);
    if (uri === "metadata://stats") {
      return body({
        version,
        total: icons.length,
        byCategory: Object.fromEntries(categories.map((c) => [c.slug, c.count])),
      });
    }
    if (uri === "metadata://all") return body({ version, icons });

    const cat = /^category:\/\/(.+)$/.exec(uri);
    if (cat) return body(inCategory(cat[1]!));

    const meta = /^icon:\/\/(.+)\/meta$/.exec(uri);
    if (meta) {
      const icon = find(meta[1]!);
      if (!icon) throw new Error(`No icon '${meta[1]}'`);
      return body(icon);
    }

    const one = /^icon:\/\/(.+)$/.exec(uri);
    if (one) {
      const icon = find(one[1]!);
      if (!icon) throw new Error(`No icon '${one[1]}'`);
      return body(icon);
    }

    throw new Error(`Unknown resource: ${uri}`);
  });
}
