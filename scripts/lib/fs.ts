import { readdir, readFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_VARIANT, DEFAULT_WEIGHT, DOMAINS, VARIANTS, WEIGHTS, hasWeight } from "@iconmind/shared";
import type { Variant, Weight } from "@iconmind/shared";

/**
 * Anchored to this file, not to the working directory. Turbo runs each package's build
 * from inside that package, so every cwd-relative path silently resolves one level off
 * — which is how the icons package ended up building into packages/icons/packages/icons.
 */
export const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const fromRoot = (...p: string[]) => join(REPO, ...p);

/**
 * The tree being validated.
 *
 * Overridable so a batch of new declarations can be checked in a scratch directory before
 * any of it lands. Every rule in this validator existed before the icons that break it,
 * and the icons still landed first — the loop was write, discover, patch. Pointing the
 * same rules at a temp tree turns that into write, discover, fix, land.
 */
export const ICONS_DIR = process.env.ICONMIND_ICONS_DIR
  ? resolve(process.env.ICONMIND_ICONS_DIR)
  : fromRoot("packages/icons/icons");

/** One cell of one concept's variant matrix. */
export interface IconCell { variant: Variant; weight: Weight; svgPath: string; svg: string }

/**
 * One concept: its metadata, and every matrix cell drawn so far.
 *
 * `svgPath` and `svg` still name the master, so the many callers that only ever wanted
 * the drawing keep working unchanged. Callers that care about the matrix read `cells`.
 */
export interface IconFile {
  slug: string; category: string; family?: string; jsonPath: string; json: string | null;
  svgPath: string; svg: string;
  cells: IconCell[];
}

/**
 * `outline-bold.svg` → its cell, or null if the name is not a cell.
 *
 * The weight is only in the name where the variant has one, so a variant without a weight
 * axis reads at the default weight rather than as a file missing half its name.
 */
export function parseCell(fileName: string): { variant: Variant; weight: Weight } | null {
  const m = /^([a-z]+)(?:-([a-z]+))?\.svg$/.exec(fileName);
  if (!m) return null;
  const [, v, w] = m;
  if (!(VARIANTS as readonly string[]).includes(v!)) return null;
  const variant = v as Variant;
  if (!hasWeight(variant)) return w ? null : { variant, weight: DEFAULT_WEIGHT };
  if (!w || !(w in WEIGHTS)) return null;
  return { variant, weight: w as Weight };
}

export async function loadIcons(): Promise<IconFile[]> {
  const out: IconFile[] = [];
  for (const category of DOMAINS) {
    const dir = join(ICONS_DIR, category);
    let slugs: string[];
    try {
      slugs = (await readdir(dir, { withFileTypes: true })).filter((e) => e.isDirectory()).map((e) => e.name);
    } catch { continue; }

    for (const slug of slugs.sort()) {
      const cdir = join(dir, slug);
      const entries = await readdir(cdir);
      const cells: IconCell[] = [];
      for (const f of entries.filter((e) => e.endsWith(".svg")).sort()) {
        const c = parseCell(f);
        if (!c) continue;   // an unrecognised name is reported by the validator, not skipped silently there
        cells.push({ ...c, svgPath: join(cdir, f), svg: await readFile(join(cdir, f), "utf8") });
      }
      const master = cells.find((c) => c.variant === DEFAULT_VARIANT && c.weight === DEFAULT_WEIGHT);
      const jsonPath = join(cdir, `${slug}.json`);
      const json = await readFile(jsonPath, "utf8").catch(() => null);
      out.push({
        slug, category, jsonPath, json,
        family: json ? (JSON.parse(json).family as string | undefined) : undefined,
        // A concept with no master still has to reach the validator so it can say so.
        svgPath: master?.svgPath ?? join(cdir, "outline-regular.svg"),
        svg: master?.svg ?? "",
        cells,
      });
    }
  }
  return out;
}

/** Every SVG in the set, one entry per cell rather than per concept. */
export const allCells = (icons: IconFile[]) =>
  icons.flatMap((i) => i.cells.map((c) => ({ ...c, slug: i.slug, category: i.category })));

export const rel = (p: string) => relative(process.cwd(), p);
