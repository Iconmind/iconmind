/**
 * The box a set of path strings covers, in canvas units, ignoring stroke width.
 *
 * Shared by `precheck` — which measures a batch before it is built — and `icons:scale`,
 * which measures the whole set. The validator does not use it: once a cell exists, the
 * honest measure is the rendered pixels, and that is what `lib/hash.ts` does.
 */
/**
 * An arc's widest point is almost never an endpoint, so a box taken from the coordinates in
 * the path makes every circle in the set look like a flat line. Each `A` is turned back into
 * its centre and sweep, and the compass points inside that sweep are added to the box.
 */
function arcPoints(x0: number, y0: number, rx: number, ry: number, laf: number, sf: number, x1: number, y1: number) {
  const dx = (x0 - x1) / 2, dy = (y0 - y1) / 2;
  const l = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry);
  if (l > 1) { rx *= Math.sqrt(l); ry *= Math.sqrt(l); }
  const s = Math.sqrt(Math.max(0, (rx * rx * ry * ry - rx * rx * dy * dy - ry * ry * dx * dx) /
    (rx * rx * dy * dy + ry * ry * dx * dx))) * (laf === sf ? -1 : 1);
  const cx = (s * rx * dy) / ry + (x0 + x1) / 2;
  const cy = (-s * ry * dx) / rx + (y0 + y1) / 2;
  const a0 = Math.atan2((y0 - cy) / ry, (x0 - cx) / rx);
  const a1 = Math.atan2((y1 - cy) / ry, (x1 - cx) / rx);
  const pts = [[x0, y0], [x1, y1]];
  for (let k = -4; k <= 4; k++) {
    const a = (k * Math.PI) / 2;
    // Is this compass point on the arc we drew, or on the part of the circle we left out?
    let d = a - a0; while (d < 0) d += 2 * Math.PI; while (d > 2 * Math.PI) d -= 2 * Math.PI;
    let span = a1 - a0; if (sf) { while (span < 0) span += 2 * Math.PI; } else { while (span > 0) span -= 2 * Math.PI; }
    if (sf ? d <= span : d - 2 * Math.PI >= span) pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]);
  }
  return pts;
}

export function boxOf(ds: string[]) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const hit = (x: number, y: number) => {
    x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
  };
  for (const d of ds) {
    const tokens = d.match(/[A-Za-z]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
    let i = 0, cx = 0, cy = 0, sx = 0, sy = 0, cmd = "M";
    const num = () => Number(tokens[i++]);
    while (i < tokens.length) {
      if (/[A-Za-z]/.test(tokens[i]!)) { cmd = tokens[i++]!; if (i >= tokens.length) break; }
      const rel = cmd === cmd.toLowerCase();          // a lowercase command is relative
      const ox = rel ? cx : 0, oy = rel ? cy : 0;
      switch (cmd.toUpperCase()) {
        case "M": case "L": {
          cx = ox + num(); cy = oy + num();
          if (cmd.toUpperCase() === "M") { sx = cx; sy = cy; cmd = rel ? "l" : "L"; }
          hit(cx, cy); break;
        }
        case "H": cx = ox + num(); hit(cx, cy); break;
        case "V": cy = oy + num(); hit(cx, cy); break;
        case "A": {
          const rx = num(), ry = num(); num();
          const laf = num(), sf = num(), nx = ox + num(), ny = oy + num();
          for (const [px, py] of arcPoints(cx, cy, rx, ry, laf, sf, nx, ny)) hit(px!, py!);
          cx = nx; cy = ny; break;
        }
        case "C": {
          hit(ox + num(), oy + num()); hit(ox + num(), oy + num());
          cx = ox + num(); cy = oy + num(); hit(cx, cy); break;
        }
        case "Z": cx = sx; cy = sy; break;
        default: i++;
      }
    }
  }
  return { x0, y0, x1, y1 };
}

