import { allCategories, allIcons, categoryOf, type IconMeta } from "@/lib/icons";

/**
 * The two index layers under a category: its groups, and the tags that cut across all
 * of them.
 *
 * A category page lists three hundred icons under one title. Search does not work at that
 * grain — nobody types "AI icons" and means the lot; they type "loss curve icon" or
 * "retry icons" and want the eight that match. Those are the pages this file describes:
 * one per group (`/categories/ai/training/`) and one per tag (`/tags/retry/`), each with
 * a real list on it, a sentence that names what is on it, and links between them.
 *
 * Tags need a floor. 2,259 distinct tags, and half of them are on exactly one icon — a
 * "page" for those is the icon's own page with a different title, which is the thin,
 * duplicate content a search engine indexes once and then learns to skip. Three icons is
 * where a tag page starts to be a list rather than a redirect: 669 tags clear it.
 */
export const TAG_PAGE_MIN = 3;

export interface TagPage {
  slug: string;
  count: number;
  icons: IconMeta[];
  /** The categories these icons come from, most represented first. */
  categories: { slug: string; name: string; count: number }[];
}

export interface GroupPage {
  category: string;
  categoryName: string;
  slug: string;
  count: number;
  icons: IconMeta[];
}

const tagMap = new Map<string, IconMeta[]>();
for (const icon of allIcons)
  for (const t of icon.tags) {
    const list = tagMap.get(t);
    if (list) list.push(icon);
    else tagMap.set(t, [icon]);
  }

function categoriesOf(icons: IconMeta[]) {
  const counts = new Map<string, number>();
  for (const i of icons) counts.set(i.category, (counts.get(i.category) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([slug, count]) => ({ slug, name: categoryOf(slug)?.name ?? slug, count }));
}

/** Every tag that earns a page, most used first. */
export const allTags: TagPage[] = [...tagMap.entries()]
  .filter(([, icons]) => icons.length >= TAG_PAGE_MIN)
  .map(([slug, icons]) => ({ slug, count: icons.length, icons, categories: categoriesOf(icons) }))
  .sort((a, b) => b.count - a.count || a.slug.localeCompare(b.slug));

const tagIndex = new Map(allTags.map((t) => [t.slug, t]));

export const tagOf = (slug: string) => tagIndex.get(slug);
/** Whether a tag has a page — the icon page links the badge only when it does. */
export const hasTagPage = (slug: string) => tagIndex.has(slug);

/**
 * The tags that share icons with this one, by how many they share.
 *
 * `retry` sits beside `backoff`, `timeout` and `fallback` because the same icons carry
 * them — which is the list a reader on the `retry` page wants next, and the link a
 * crawler follows from one indexable page to another.
 */
export function relatedTags(tag: TagPage, limit = 12) {
  const shared = new Map<string, number>();
  for (const icon of tag.icons)
    for (const t of icon.tags)
      if (t !== tag.slug && tagIndex.has(t)) shared.set(t, (shared.get(t) ?? 0) + 1);
  return [...shared.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([slug, overlap]) => ({ ...tagIndex.get(slug)!, overlap }));
}

/** Every group in every category, in the category's own order. */
export const allGroups: GroupPage[] = allCategories.flatMap((c) =>
  c.subcategories.map((s) => ({
    category: c.slug,
    categoryName: c.name,
    slug: s.slug,
    count: s.count,
    icons: allIcons.filter((i) => i.category === c.slug && i.subcategory === s.slug),
  })),
);

export const groupsOf = (category: string) => allGroups.filter((g) => g.category === category);
export const groupOf = (category: string, slug: string) =>
  allGroups.find((g) => g.category === category && g.slug === slug);

/**
 * The tags most used inside a group or category — the "narrow it further" row.
 * Only tags with pages, so every chip is a link.
 */
export function topTags(icons: IconMeta[], limit = 10) {
  const counts = new Map<string, number>();
  for (const i of icons) for (const t of i.tags) if (tagIndex.has(t)) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .filter(([, n]) => n >= 2)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([slug, count]) => ({ slug, count, total: tagIndex.get(slug)!.count }));
}

/** "agent, agent-add, agent-alert and 12 more" — the names, as a phrase. */
export function nameList(icons: IconMeta[], shown = 4) {
  const names = icons.slice(0, shown).map((i) => i.name);
  const rest = icons.length - names.length;
  if (rest <= 0) return names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}` : names[0] ?? "";
  return `${names.join(", ")} and ${rest} more`;
}

/** `word` → `Word`, for a slug used as a title. */
export const titleCase = (slug: string) => slug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
