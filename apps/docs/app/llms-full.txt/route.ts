import { allCategories, allIcons, iconCount, version } from "@/lib/icons";

export const dynamic = "force-static";

/**
 * The whole inventory, one icon per line.
 *
 * This is the file that stops an assistant inventing `<AgentBrain />`. It is deliberately
 * flat and deliberately boring: slug first, because the slug is what goes in the import,
 * then the name, then where it sits, then every word that finds it. Under 100 KB for the
 * whole set, which is cheap next to an assistant being confidently wrong about a name.
 *
 * Aliases are included because they are the words somebody reaches for when they do not
 * know what this set calls the thing — `bot` for `agent`, `split-test` for `ab-test`.
 */
export function GET() {
  const byCategory = allCategories.map((c) => {
    const icons = allIcons.filter((i) => i.category === c.slug);
    const lines = icons
      .map((i) => {
        const words = [...new Set([...i.tags, ...i.aliases])].join(", ");
        return `${i.slug} — ${i.name} — ${c.slug}/${i.subcategory} — ${i.description}${words ? ` — ${words}` : ""}`;
      })
      .join("\n");
    return `## ${c.name} (${c.slug}) — ${c.count} icons\n\n${lines}`;
  });

  const body = `# IconMind — full icon inventory

> ${iconCount} icons, version ${version}. One line per icon:
> \`slug — Name — category/subcategory — description — tags and aliases\`
>
> The slug is the file name (\`/icons/{slug}.svg\`), the sprite id (\`#im-{slug}\`) and the
> URL (\`/icons/{slug}/\`). The React export is the slug in PascalCase.
> Every icon exists in outline and duotone at thin, regular and bold.
> MIT licensed: commercial use, no attribution, no seat count.

${byCategory.join("\n\n")}
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
