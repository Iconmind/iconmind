/**
 * How much of the set is on the unchecked path.
 *
 * Not a rule — hand-written data is legitimate, and some shapes have no composition. It is
 * a number to watch: it was 43% when the form library was widened, and the whole point of
 * widening it was to make that fall.
 */
import { loadIcons } from "../lib/fs.ts";

const icons = await loadIcons();
let shapes = 0, hand = 0;
const worst: Array<[number, string]> = [];
for (const i of icons) {
  if (!i.json) continue;
  const decl = JSON.parse(i.json) as { shapes?: Array<{ _why?: string }> };
  const s = decl.shapes ?? [];
  const h = s.filter((x) => x._why).length;
  shapes += s.length;
  hand += h;
  if (h) worst.push([h, i.slug]);
}
worst.sort((a, b) => b[0] - a[0]);
const pct = shapes ? Math.round((hand / shapes) * 100) : 0;
console.log(`${hand} of ${shapes} shapes declare a reason for being hand-written (${pct}%), across ${worst.length} concepts`);
console.log("Concepts drawn before the field existed do not carry it, so this counts new work only.");
for (const [n, slug] of worst.slice(0, 12)) console.log(`  ${n}  ${slug}`);
