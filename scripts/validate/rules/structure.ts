import { ALLOWED_ELEMENTS, DEFAULT_VARIANT, DEFAULT_WEIGHT, FORBIDDEN_ELEMENTS, MAX_CHILDREN, MAX_BYTES, SVG_CLOSE, svgOpen, VIEW_BOX } from "@iconmind/shared";
import type { ParsedSvg as _P, Variant, Weight } from "@iconmind/shared";
import type { ParsedSvg } from "@iconmind/shared";
import type { Report } from "../../lib/report.ts";

export function checkStructure(file: string, svg: string, p: ParsedSvg, r: Report, variant: Variant = DEFAULT_VARIANT, weight: Weight = DEFAULT_WEIGHT) {
  const open = svgOpen(variant, weight);
  if (p.root["viewBox"] !== VIEW_BOX)
    r.add(file, "structure/viewbox-exact", `viewBox="${p.root["viewBox"] ?? "—"}", must be "${VIEW_BOX}"`);
  for (const dim of ["width", "height"] as const)
    if (p.root[dim] !== "24") r.add(file, "structure/dimensions-24", `${dim}="${p.root[dim] ?? "—"}", must be "24"`);

  for (const c of p.children) {
    if ((FORBIDDEN_ELEMENTS as readonly string[]).includes(c.tag))
      r.add(file, "structure/forbidden-element", `<${c.tag}> is not allowed`);
    else if (!(ALLOWED_ELEMENTS as readonly string[]).includes(c.tag))
      r.add(file, "structure/allowed-elements", `<${c.tag}> is not in the allowed element list`);
  }
  for (const u of p.unknown) r.add(file, "structure/no-nesting", `nested element: ${u}`);

  // Halo layers (duotone's tint for mark-only icons) double every mark by design; the
  // ceiling guards authored geometry, not the doubling.
  const authored = p.children.filter((c) => !(c.attrs["opacity"] != null && c.attrs["stroke-width"] != null)).length;
  if (authored > MAX_CHILDREN)
    r.add(file, "structure/max-children", `${authored} elements, maximum ${MAX_CHILDREN}`);
  if (p.children.length === 0) r.add(file, "structure/empty", "no drawable elements");

  const bytes = Buffer.byteLength(svg, "utf8");
  if (bytes > MAX_BYTES) r.add(file, "structure/max-bytes", `${bytes} bytes, maximum ${MAX_BYTES}`);
  if (/<!--/.test(svg)) r.add(file, "structure/no-comments", "contains an XML comment");

  // Every other rule here checks what the file *means*. This one checks how it is
  // written, which nothing else does: attribute order, spacing, line count and the
  // trailing newline. Two icons can satisfy every attribute rule individually and still
  // read as unrelated files in a diff, and a set whose files do not look alike is one
  // nobody can review by eye. `pnpm icons:optimize` rewrites a file into this form.
  if (!svg.startsWith(open)) {
    const got = svg.slice(0, svg.indexOf(">") + 1) || svg.slice(0, 80);
    r.add(file, "structure/canonical-form", `opening tag differs from the canonical form for ${variant}-${weight}\n  expected ${open}\n  found    ${got}`);
  } else if (!svg.endsWith(SVG_CLOSE)) {
    r.add(file, "structure/canonical-form", "must end with </svg> and exactly one newline");
  } else {
    const body = svg.slice(open.length, -SVG_CLOSE.length);
    if (/[\n\t]/.test(body))
      r.add(file, "structure/canonical-form", "one line: no newlines or tabs between the opening and closing tags");
    else if (/>\s+</.test(body))
      r.add(file, "structure/canonical-form", "no space between elements — write `/><` with nothing in between");
  }
}
