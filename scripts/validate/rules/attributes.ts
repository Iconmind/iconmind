import { WEIGHTS, DUOTONE_OPACITY, FORBIDDEN_ATTRS, svgRootAttrs } from "@iconmind/shared";
import type { ParsedSvg, Variant, Weight } from "@iconmind/shared";
import type { Report } from "../../lib/report.ts";

const COLOR = /#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(|\b(black|white|red|blue|green|gray|grey|currentcolor)\b/i;

/**
 * The tint layer of a duotone icon, and the only element in the set allowed to carry its
 * own paint. It is checked as a set: all four attributes or none, with exactly these
 * values. Half of them is not a variation, it is a mistake — `fill` without `stroke="none"`
 * paints a tinted shape that is also stroked, doubling the outline it sits behind.
 */
const TINT: Record<string, string> = {
  fill: "currentColor",
  opacity: DUOTONE_OPACITY,
  stroke: "none",
};

/**
 * The second kind of tint layer: the halo behind a mark-only icon.
 *
 * An icon made only of marks has nothing to fill, so its tint is the mark's own strokes
 * three units wider at the tint opacity. It carries exactly `opacity` and `stroke-width`,
 * and its width must be the cell's weight plus three — a halo at any other width is a
 * stroke override wearing the halo's clothes.
 */
const isHalo = (attrs: Record<string, string>) =>
  "opacity" in attrs && "stroke-width" in attrs && !("fill" in attrs);

/**
 * `fill-rule` is not part of the set.
 *
 * Nothing here encloses a region that needs one: every cell is stroked, and a duotone tint
 * lands on shapes that are closed by construction. A file that declares one was written
 * against an engine this repo no longer has.
 */
const FILL_RULES = new Set(["evenodd", undefined as unknown as string]);

const isTint = (attrs: Record<string, string>) =>
  Object.keys(TINT).some((k) => k in attrs);

export function checkAttributes(file: string, p: ParsedSvg, r: Report, variant: Variant, weight: Weight) {
  for (const [k, want] of svgRootAttrs(variant, weight))
    if (p.root[k] !== want)
      r.add(file, `attributes/${k}`, `root ${k}="${p.root[k] ?? "—"}", must be "${want}" for ${variant}-${weight}`);

  // An attribute that belongs to another cell of the matrix is worse than a missing one:
  // it does nothing visible and suggests the file was copied from the wrong variant.
  const allowed = new Set(svgRootAttrs(variant, weight).map(([k]) => k));
  for (const k of Object.keys(p.root))
    if (!allowed.has(k))
      r.add(file, "attributes/root-extra", `root has '${k}', which ${variant}-${weight} does not use`);

  for (const c of p.children) {
    const halo = variant === "duotone" && isHalo(c.attrs);
    if (halo) {
      if (c.attrs["opacity"] !== DUOTONE_OPACITY)
        r.add(file, "attributes/duotone-halo", `<${c.tag}> halo opacity="${c.attrs["opacity"]}", must be "${DUOTONE_OPACITY}"`);
      const want = String(WEIGHTS[weight] + 3);
      if (c.attrs["stroke-width"] !== want)
        r.add(file, "attributes/duotone-halo", `<${c.tag}> halo stroke-width="${c.attrs["stroke-width"]}", must be "${want}" for ${weight}`);
      continue;
    }
    const tint = variant === "duotone" && isTint(c.attrs);

    if (tint) {
      for (const [k, want] of Object.entries(TINT))
        if (c.attrs[k] !== want)
          r.add(file, "attributes/duotone-tint", `<${c.tag}> tint layer has ${k}="${c.attrs[k] ?? "—"}", must be "${want}"`);
    }

    if (c.attrs["fill-rule"] != null && !FILL_RULES.has(c.attrs["fill-rule"]))
      r.add(file, "attributes/fill-rule", `<${c.tag}> fill-rule="${c.attrs["fill-rule"]}", only "evenodd" is allowed`);

    for (const a of Object.keys(c.attrs)) {
      if ((FORBIDDEN_ATTRS as readonly string[]).includes(a))
        r.add(file, "attributes/forbidden-attr", `<${c.tag}> uses attribute '${a}'`);
      if (a.includes(":") || a.startsWith("data-"))
        r.add(file, "attributes/no-editor-junk", `<${c.tag}> uses attribute '${a}'`);
      if (tint && (a in TINT || a === "fill-rule")) continue;   // checked above, as a set

      if (a === "fill" && c.attrs[a] !== "none")
        r.add(file, "attributes/fill-none", `<${c.tag}> fill="${c.attrs[a]}", only "none" is allowed`);
      if (a.startsWith("stroke"))
        r.add(file, "attributes/no-stroke-override", `<${c.tag}> overrides '${a}' — stroke belongs on the root only`);
      const v = c.attrs[a] ?? "";
      if (a !== "d" && COLOR.test(v) && v !== "none")
        r.add(file, "attributes/no-literal-color", `<${c.tag}> ${a}="${v}" contains a literal color`);
    }
  }

  /*
   * At least one path has to declare how its holes work, or the enclosed regions paint
   * solid and the icon is a blob. Not every path: material that reaches outside the
   * container is a plain path on purpose, because under evenodd it would cancel whatever
   * it overlaps.
   */
}
