/**
 * The comparison pages — honest tables against the sets people already know.
 *
 * Somebody searching "lucide alternative" or "icons like heroicons for AI" is choosing,
 * and a page that only praises itself does not help them choose. Every row is a fact
 * either set would agree with; the differences are stated, not sold. Counts for the
 * other sets are the ones published on their sites on the date given, and are marked
 * approximate because they move.
 */
export interface Compare {
  slug: string;
  name: string;
  url: string;
  lead: string;
  rows: [label: string, iconmind: string, other: string][];
  verdict: string[];
  faq: [q: string, a: string][];
}

const OURS = {
  count: "2,271 (0.5.0)",
  ai: "664 icons for LLMs, agents, MCP, RAG — a third of the set",
  variants: "outline and duotone, each in thin / regular / bold (6 drawings per icon)",
  frameworks: "React, Vue, Svelte, Solid, Preact, React Native, Astro, Laravel Blade, Flutter — one source, one release",
  mcp: "yes — `npx @iconmind/mcp` searches the set and returns paste-ready code",
  license: "MIT — commercial use, no attribution",
  grid: "24 px, 2 px stroke, every cell machine-validated",
};

export const COMPARISONS: Compare[] = [
  {
    slug: "lucide",
    name: "Lucide",
    url: "https://lucide.dev",
    lead: "Lucide is the generalist set most React apps start with. IconMind draws the same grid and stroke, then adds the vocabulary an AI product needs.",
    rows: [
      ["Icons", OURS.count, "≈2,050 (v1.37, Aug 2026)"],
      ["AI and agent vocabulary", OURS.ai, "a handful (bot, brain, sparkles)"],
      ["Variants and weights", OURS.variants, "one style; stroke width as a prop"],
      ["Frameworks", OURS.frameworks, "React, Vue, Svelte, Solid, Preact, Angular, React Native, Flutter"],
      ["MCP server for assistants", OURS.mcp, "no"],
      ["Grid and stroke", OURS.grid, "24 px, 2 px stroke"],
      ["Licence", OURS.license, "ISC — attribution required in derivative work"],
      ["Brand logos", "none, on purpose", "none, on purpose"],
    ],
    verdict: [
      "If you are drawing arrows and folders, both sets do the job and Lucide has the longer track record. If your product has agents, models, tokens, tool calls or a vector database on screen, Lucide has no icon for them and IconMind has hundreds — drawn to the same grid, so the two can even sit side by side while you migrate.",
      "The names are compatible on purpose: a hundred-odd Lucide names resolve here as aliases (`file-plus`, `message-square-check`, `panel-left`), so a search for the name you know finds the drawing.",
    ],
    faq: [
      ["Can I use IconMind and Lucide together?", "Yes. Both are 24 px, 2 px stroke, round caps and joins. Mixing them on one screen is not visible at UI sizes."],
      ["Does IconMind have every Lucide icon?", "No. It has the interface families a product needs — files, folders, people, chat, calendar, panels, lists, arrows, git, mail, charts — and not zodiac signs, food or vehicles. Lucide names for icons that exist here resolve as aliases."],
      ["Which is more permissive?", "IconMind is MIT: no attribution, commercial use, no seat count. Lucide is ISC, which is functionally similar; check the notice requirements for your use."],
    ],
  },
  {
    slug: "tabler",
    name: "Tabler Icons",
    url: "https://tabler.io/icons",
    lead: "Tabler is the biggest of the stroke sets. IconMind is a third the size and covers what Tabler does not: the software being built in 2026.",
    rows: [
      ["Icons", OURS.count, "≈5,900 (Aug 2026)"],
      ["AI and agent vocabulary", OURS.ai, "a few dozen (robot, brain, sparkles, ai)"],
      ["Variants and weights", OURS.variants, "outline and filled; stroke width as a prop"],
      ["Frameworks", OURS.frameworks, "React, Vue, Svelte, Solid, Preact, React Native, Flutter, PNG, webfont"],
      ["MCP server for assistants", OURS.mcp, "no"],
      ["Grid and stroke", OURS.grid, "24 px, 2 px stroke"],
      ["Licence", OURS.license, "MIT"],
    ],
    verdict: [
      "Tabler wins on sheer breadth — if you need a tractor, it has one. IconMind wins on the thing Tabler treats as an afterthought: the AI-era vocabulary, drawn as one family rather than as thirty unrelated glyphs, with duotone and three real weights.",
    ],
    faq: [
      ["Is IconMind a Tabler fork?", "No. Every icon is drawn from a declaration set and compiled by a validator that refuses geometry it cannot draw correctly. The grid and stroke match Tabler and Lucide because that is the sensible grid; the drawings are original."],
      ["Does IconMind ship a webfont?", "No, deliberately: a font flattens duotone and the three weights into one glyph. The sprite sheet (`/sprite.svg`) covers the no-build-step case."],
    ],
  },
  {
    slug: "heroicons",
    name: "Heroicons",
    url: "https://heroicons.com",
    lead: "Heroicons is Tailwind's set — three hundred icons, immaculately drawn. IconMind is for the product that needs the other two thousand.",
    rows: [
      ["Icons", OURS.count, "≈300 (v2)"],
      ["AI and agent vocabulary", OURS.ai, "sparkles, cpu-chip"],
      ["Variants and weights", OURS.variants, "outline, solid, mini, micro"],
      ["Frameworks", OURS.frameworks, "React, Vue"],
      ["MCP server for assistants", OURS.mcp, "no"],
      ["Grid and stroke", OURS.grid, "24 px outline (1.5 px stroke), 20 px solid"],
      ["Licence", OURS.license, "MIT"],
    ],
    verdict: [
      "Heroicons' 1.5 px stroke is lighter than IconMind's 2 px — the thin weight here (1.5 px) matches it, which is the weight to use if you are adding IconMind to a Heroicons app.",
    ],
    faq: [
      ["Does IconMind work with Tailwind?", "Yes — the components take `className`, so `className=\"size-5 text-zinc-500\"` works as it does with Heroicons. A sprite `<use>` works in plain HTML."],
      ["Which IconMind weight matches Heroicons outline?", "Thin (1.5 px)."],
    ],
  },
  {
    slug: "svgrepo",
    name: "SVG Repo",
    url: "https://www.svgrepo.com",
    lead: "SVG Repo is a search engine over half a million icons from hundreds of sets. IconMind is one set, drawn as one set.",
    rows: [
      ["Icons", OURS.count + ", one style", "≈500,000 across many sets and licences"],
      ["Consistency", "one grid, one stroke, one validator across all of it", "varies icon to icon — each result is from a different set"],
      ["AI and agent vocabulary", OURS.ai, "whatever any set uploaded; no family, no shared style"],
      ["Variants and weights", OURS.variants, "as uploaded; PNG export"],
      ["Frameworks", OURS.frameworks, "SVG and PNG download; no packages"],
      ["MCP server for assistants", OURS.mcp, "no"],
      ["Licence", OURS.license, "per icon — check each one"],
      ["Downloads", "SVG, PNG 16–512, WebP, ICO, JPEG, the whole set as a zip", "SVG, PNG"],
    ],
    verdict: [
      "Use SVG Repo when you need one icon of anything and do not mind that the next one will not match. Use IconMind when the screen has twenty icons on it and they need to look like they were drawn by the same hand — and when the twenty include an agent, a model and a tool call.",
    ],
    faq: [
      ["Can I download IconMind icons as PNG like SVG Repo?", "Yes — every icon page has a Download menu with PNG at 16 to 512 px, WebP, a favicon and JPEG, rendered from the exact variant and weight on screen, plus SVG. The whole set is available as two zips."],
      ["Is every IconMind icon MIT?", "Yes, all of them, under one licence. Nothing on the site comes from another set."],
    ],
  },
];

export const compareOf = (slug: string) => COMPARISONS.find((c) => c.slug === slug);
