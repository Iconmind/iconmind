import { z } from "zod";
import { ACRONYMS, DOMAINS, MATRIX_CELLS, SUBCATEGORIES, WAIVABLE_RULES, type Domain } from "./constants.ts";
import { SLUG_RE } from "./slug.ts";

const slug = z.string().regex(SLUG_RE, "must be kebab-case").min(2).max(40);
const semver = z.string().regex(/^\d+\.\d+\.\d+$/);

/** Human-authored fields — doc 07 §7.2. */
export const IconMetaInput = z
  .object({
    $schema: z.string().optional(),
    slug,
    category: z.enum(DOMAINS),
    subcategory: slug,
    name: z.string().min(2).max(40),
    description: z.string().min(5).max(120)
      .refine((s) => !s.endsWith("."), "must not end with a period"),
    tags: z.array(z.string().regex(/^[a-z0-9]+([ -][a-z0-9]+)*$/).max(30))
      .min(3).max(12).refine((a) => new Set(a).size === a.length, "duplicate tag"),
    aliases: z.array(slug).max(5).default([]),
    keywords: z.array(z.string().max(40)).max(20).default([]),
    contributors: z.array(z.string().regex(/^[A-Za-z0-9-]{1,39}$/)).default([]),
    /**
     * The drawing, and the only one anyone authors. All six cells are generated from it by
     * `scripts/draw` — the drawing pipeline. Nothing is offset or
     * derived: what separates the cells is a stroke width and, on duotone, a tint.
     *
     * `closed` marks a shape as part of the silhouette, which is what the duotone tint
     * lands on. An open shape is a stroke drawn through it and stays untinted.
     */
    shapes: z.array(z.object({
      d: z.string().min(4),
      closed: z.boolean().default(false),
      /**
       * Why this path was written by hand instead of composed.
       *
       * 43% of the geometry in the first 175 concepts was hand-written, and every
       * geometry failure in the set came out of that 43%. It is not forbidden — a wrench,
       * a ghost and a cloud are not compositions of rectangles — but it is the unchecked
       * path, and an icon taking it should say so where the next person will see it.
       */
      _why: z.string().min(12).optional(),
      /**
       * An interior edge of a solid object: a cube's fold lines, a cylinder's rim, the
       * seam of a folded page.
       *
       * Never tinted, however the shape is drawn. An interior edge describes the surface
       * it sits on rather than bounding an area of its own.
       */
      detail: z.boolean().optional(),
    })).min(1).max(12).optional(),
    relatedOverride: z.array(slug).max(6).optional(),
    /**
     * Warnings this icon has answered, keyed by rule, each with the reason. The reason is
     * not decoration: it is the whole mechanism. Anyone can silence a warning; writing
     * down why is what makes the silence reviewable.
     */
    /**
     * The family this icon is drawn as a member of.
     *
     * Slugs carry a family only when they happen to share a word: `agent-add` and
     * `agent-check` do, `prompt` and `user-prompt` do not, though the second is the first
     * with a person in it. The duplicate scanner judges family members on where they
     * differ rather than on how much, and it can only do that if it is told.
     */
    family: z.string().min(2).max(40).optional(),
    accepted: z.record(z.string(), z.string().min(10, "give a real reason").max(200)).optional(),
    /**
     * Cells that are deliberately not what derivation would produce, keyed by cell name.
     *
     * Every cell is either exactly its derivation or declared here. There is no third
     * state, because a hand-corrected `bold` and a derivation left stale by an edit to
     * its parent are the same bytes on disk — the only thing that separates them is
     * somebody writing down which one it is.
     */
    redrawn: z.record(z.string(), z.string().min(10, "say what was changed and why").max(200)).optional(),
    deprecated: z
      .object({ since: semver, replacedBy: slug.optional(), reason: z.string().max(200) })
      .nullable()
      .default(null),
  })
  .strict()
  .superRefine((v, ctx) => {
    const subs = SUBCATEGORIES[v.category as Domain];
    if (!subs.includes(v.subcategory)) {
      ctx.addIssue({
        code: "custom",
        path: ["subcategory"],
        message: `'${v.subcategory}' is not a subcategory of '${v.category}'. Allowed: ${subs.join(", ")}`,
      });
    }
    for (const word of v.name.split(" ")) {
      if (ACRONYMS.has(word.toLowerCase()) && word !== word.toUpperCase()) {
        ctx.addIssue({
          code: "custom", path: ["name"],
          message: `'${word}' is an acronym — write it '${word.toUpperCase()}'`,
        });
      }
    }
    for (const cell of Object.keys(v.redrawn ?? {})) {
      if (!(MATRIX_CELLS as readonly string[]).includes(cell)) {
        ctx.addIssue({
          code: "custom", path: ["redrawn", cell],
          message: `'${cell}' is not a matrix cell. Cells are: ${MATRIX_CELLS.join(", ")}`,
        });
      }
    }
    for (const rule of Object.keys(v.accepted ?? {})) {
      if (!(WAIVABLE_RULES as readonly string[]).includes(rule)) {
        ctx.addIssue({
          code: "custom", path: ["accepted", rule],
          message: `'${rule}' cannot be accepted. Only warnings can: ${WAIVABLE_RULES.join(", ")}`,
        });
      }
    }
    if (v.tags.includes(v.category)) {
      ctx.addIssue({
        code: "custom", path: ["tags"],
        message: `'${v.category}' is redundant as a tag — it is already the category`,
      });
    }
  });

export type IconMetaInput = z.input<typeof IconMetaInput>;

/** Machine-derived fields — doc 07 §7.3. */
export interface IconMetaDerived {
  componentName: string;
  contentHash: string;
  structuralHash: string;
  elementCount: number;
  byteSize: number;
  related: string[];
  addedIn: string;
  updatedIn: string;
}

export type IconMeta = z.output<typeof IconMetaInput> & IconMetaDerived;
