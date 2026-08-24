import { z } from "zod";
import { DOMAINS, SUBCATEGORIES, type Domain } from "./constants.ts";
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
    relatedOverride: z.array(slug).max(6).optional(),
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
