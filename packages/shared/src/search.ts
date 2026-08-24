/**
 * One ranking implementation, shared by the website and the MCP server.
 *
 * Doc 13 promises an AI assistant and a person searching the site get the same answer.
 * That only holds if there is one implementation — two copies of a scoring table drift
 * within a month, and the drift is invisible until someone compares them side by side.
 */
export interface SearchableIcon {
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  tags: string[];
  aliases?: string[];
}

export interface SearchHit<T extends SearchableIcon = SearchableIcon> {
  icon: T;
  score: number;
  /** Why it matched, in words. Makes the ranking inspectable instead of a black box. */
  matched: string;
}

export interface SearchOptions {
  category?: string;
  limit?: number;
}

/** The four AI-native domains. A tie there is almost always what the asker meant. */
const FOCUS = new Set(["ai", "agents", "mcp", "rag"]);

export const normalizeQuery = (q: string) => q.trim().toLowerCase().replace(/[\s_]+/g, "-");

function scoreOne(i: SearchableIcon, q: string): { score: number; matched: string } {
  const name = i.name.toLowerCase();
  const aliases = i.aliases ?? [];

  if (i.slug === q) return { score: 1000, matched: "exact name" };
  if (aliases.includes(q)) return { score: 900, matched: "exact alias" };
  if (i.slug.startsWith(q)) return { score: 800 - i.slug.length * 2, matched: "name starts with" };
  if (name.startsWith(q)) return { score: 700 - name.length * 2, matched: "name starts with" };
  if (i.slug.split("-").some((w) => w.startsWith(q))) return { score: 600, matched: "word in name" };

  const exactTag = i.tags.find((t) => t === q);
  if (exactTag) return { score: 500, matched: `tag “${exactTag}”` };
  const prefixTag = i.tags.find((t) => t.startsWith(q));
  if (prefixTag) return { score: 400, matched: `tag “${prefixTag}”` };

  if (name.includes(q) || i.slug.includes(q)) return { score: 300, matched: "name contains" };
  const looseTag = i.tags.find((t) => t.includes(q));
  if (looseTag) return { score: 200, matched: `tag “${looseTag}”` };
  if (i.description.toLowerCase().includes(q)) return { score: 120, matched: "description" };
  return { score: 0, matched: "" };
}

export function searchIcons<T extends SearchableIcon>(
  icons: readonly T[],
  query: string,
  opts: SearchOptions = {},
): SearchHit<T>[] {
  const q = normalizeQuery(query);
  const pool = opts.category ? icons.filter((i) => i.category === opts.category) : icons;
  if (!q) return [];

  // Multi-word queries are AND, not OR: "vector search" must not return everything
  // that merely mentions vectors.
  const words = q.split("-").filter(Boolean);

  const hits: SearchHit<T>[] = [];
  for (const icon of pool) {
    const whole = scoreOne(icon, q);
    let score = whole.score;
    let matched = whole.matched;

    if (!score && words.length > 1) {
      const parts = words.map((w) => scoreOne(icon, w));
      if (parts.every((p) => p.score > 0)) {
        score = Math.round(parts.reduce((a, p) => a + p.score, 0) / words.length);
        matched = `all terms — ${parts[0]!.matched}`;
      }
    }
    if (!score) continue;

    if (FOCUS.has(icon.category)) score += 50;
    score -= Math.round(icon.slug.length / 4);
    hits.push({ icon, score, matched });
  }

  hits.sort((a, b) => b.score - a.score || a.icon.slug.localeCompare(b.icon.slug));
  return opts.limit ? hits.slice(0, opts.limit) : hits;
}

/** Edit distance, capped — only used to suggest something when nothing matched. */
export function editDistance(a: string, b: string, cap = 4): number {
  if (Math.abs(a.length - b.length) > cap) return cap + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++)
      cur[j] = Math.min(prev[j]! + 1, cur[j - 1]! + 1, prev[j - 1]! + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length]!;
}

/** Closest slugs or tags to a query that found nothing. */
export function suggest<T extends SearchableIcon>(icons: readonly T[], query: string, limit = 6): T[] {
  const q = normalizeQuery(query);
  if (q.length < 3) return [];
  return icons
    .map((i) => ({ i, d: Math.min(editDistance(q, i.slug), ...i.tags.map((t) => editDistance(q, t))) }))
    .filter((x) => x.d <= 3)
    .sort((a, b) => a.d - b.d)
    .slice(0, limit)
    .map((x) => x.i);
}
