import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { DOMAINS } from "@iconmind/shared";

export const ICONS_DIR = "packages/icons/icons";

export interface IconFile { slug: string; category: string; svgPath: string; jsonPath: string; svg: string; json: string | null }

export async function loadIcons(): Promise<IconFile[]> {
  const out: IconFile[] = [];
  for (const category of DOMAINS) {
    const dir = join(ICONS_DIR, category);
    let entries: string[];
    try { entries = await readdir(dir); } catch { continue; }
    for (const f of entries.filter((e) => e.endsWith(".svg"))) {
      const slug = f.slice(0, -4);
      const svgPath = join(dir, f);
      const jsonPath = join(dir, `${slug}.json`);
      out.push({
        slug, category, svgPath, jsonPath,
        svg: await readFile(svgPath, "utf8"),
        json: await readFile(jsonPath, "utf8").catch(() => null),
      });
    }
    for (const f of entries.filter((e) => e.endsWith(".json"))) {
      const slug = f.slice(0, -5);
      if (!entries.includes(`${slug}.svg`)) {
        out.push({ slug, category, svgPath: join(dir, `${slug}.svg`), jsonPath: join(dir, f), svg: "", json: await readFile(join(dir, f), "utf8") });
      }
    }
  }
  return out;
}
export const rel = (p: string) => relative(process.cwd(), p);
