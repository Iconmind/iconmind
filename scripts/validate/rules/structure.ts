import { ALLOWED_ELEMENTS, FORBIDDEN_ELEMENTS, MAX_CHILDREN, MAX_BYTES, VIEW_BOX } from "@iconmind/shared";
import type { ParsedSvg } from "@iconmind/shared";
import type { Report } from "../../lib/report.ts";

export function checkStructure(file: string, svg: string, p: ParsedSvg, r: Report) {
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

  if (p.children.length > MAX_CHILDREN)
    r.add(file, "structure/max-children", `${p.children.length} elements, maximum ${MAX_CHILDREN}`);
  if (p.children.length === 0) r.add(file, "structure/empty", "no drawable elements");

  const bytes = Buffer.byteLength(svg, "utf8");
  if (bytes > MAX_BYTES) r.add(file, "structure/max-bytes", `${bytes} bytes, maximum ${MAX_BYTES}`);
  if (/<!--/.test(svg)) r.add(file, "structure/no-comments", "contains an XML comment");
}
