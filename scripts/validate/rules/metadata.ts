import { IconMetaInput, isValidSlug, toComponentName, RESERVED_WORDS } from "@iconmind/shared";
import type { IconFile } from "../../lib/fs.ts";
import type { Report } from "../../lib/report.ts";

export function checkMetadata(icons: IconFile[], r: Report) {
  const slugs = new Map<string, string>();
  const aliases = new Map<string, string>();

  for (const ic of icons) {
    const f = ic.svgPath;
    if (!ic.svg) { r.add(f, "metadata/svg-missing", `${ic.jsonPath} exists but its SVG does not`); continue; }
    if (ic.json === null) { r.add(f, "metadata/json-exists", `${ic.slug}.json is missing`); continue; }

    if (!isValidSlug(ic.slug)) r.add(f, "naming/slug-format", `'${ic.slug}' is not kebab-case of 2–40 characters`);

    let raw: unknown;
    try { raw = JSON.parse(ic.json); }
    catch (e) { r.add(f, "metadata/json-parse", (e as Error).message); continue; }

    const res = IconMetaInput.safeParse(raw);
    if (!res.success) {
      for (const i of res.error.issues)
        r.add(f, "metadata/schema-valid", `${i.path.join(".") || "(root)"}: ${i.message}`);
      continue;
    }
    const m = res.data;

    if (m.slug !== ic.slug) r.add(f, "metadata/slug-matches-filename", `slug "${m.slug}" ≠ filename "${ic.slug}"`);
    if (m.category !== ic.category) r.add(f, "metadata/category-matches-folder", `category "${m.category}" ≠ folder "${ic.category}"`);

    const prev = slugs.get(m.slug);
    if (prev) r.add(f, "naming/slug-unique-global", `slug '${m.slug}' is also used by ${prev}`);
    slugs.set(m.slug, f);

    for (const a of m.aliases) {
      const p2 = aliases.get(a);
      if (p2) r.add(f, "naming/alias-no-collision", `alias '${a}' is also used by ${p2}`);
      aliases.set(a, f);
    }

    const comp = toComponentName(m.slug);
    if (RESERVED_WORDS.has(comp)) r.add(f, "naming/component-name-safe", `'${comp}' collides with a JS global`);
  }

  for (const [alias, file] of aliases)
    if (slugs.has(alias)) r.add(file, "naming/alias-no-collision", `alias '${alias}' collides with another icon's slug`);
}
