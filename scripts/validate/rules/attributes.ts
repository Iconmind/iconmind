import { FORBIDDEN_ATTRS, STROKE_WIDTH } from "@iconmind/shared";
import type { ParsedSvg } from "@iconmind/shared";
import type { Report } from "../../lib/report.ts";

const COLOR = /#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(|\b(black|white|red|blue|green|gray|grey|currentcolor)\b/i;

const REQUIRED: Record<string, string> = {
  fill: "none",
  stroke: "currentColor",
  "stroke-width": String(STROKE_WIDTH),
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
};

export function checkAttributes(file: string, p: ParsedSvg, r: Report) {
  for (const [k, want] of Object.entries(REQUIRED))
    if (p.root[k] !== want)
      r.add(file, `attributes/${k}`, `root ${k}="${p.root[k] ?? "—"}", must be "${want}"`);

  if (p.root["xmlns"] !== "http://www.w3.org/2000/svg")
    r.add(file, "attributes/xmlns", "xmlns is missing or wrong");

  for (const c of p.children) {
    for (const a of Object.keys(c.attrs)) {
      if ((FORBIDDEN_ATTRS as readonly string[]).includes(a))
        r.add(file, "attributes/forbidden-attr", `<${c.tag}> uses attribute '${a}'`);
      if (a.includes(":") || a.startsWith("data-"))
        r.add(file, "attributes/no-editor-junk", `<${c.tag}> uses attribute '${a}'`);
      if (a === "fill" && c.attrs[a] !== "none")
        r.add(file, "attributes/fill-none", `<${c.tag}> fill="${c.attrs[a]}", only "none" is allowed`);
      if (a.startsWith("stroke"))
        r.add(file, "attributes/no-stroke-override", `<${c.tag}> overrides '${a}' — stroke belongs on the root only`);
      const v = c.attrs[a] ?? "";
      if (a !== "d" && COLOR.test(v) && v !== "none")
        r.add(file, "attributes/no-literal-color", `<${c.tag}> ${a}="${v}" contains a literal color`);
    }
  }
}
