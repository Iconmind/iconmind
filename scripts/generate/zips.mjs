/**
 * The whole set as two zips — every SVG, every preview PNG — written into the site's
 * build output, never into git. Run after `next build` (see apps/web/vercel.json); the
 * release workflow attaches the same files to the GitHub Release.
 */
import { readdirSync, readFileSync, mkdirSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { zipSync } from "fflate";

const root = new URL("../../", import.meta.url).pathname;
const out = join(root, "apps/web/out/download");
mkdirSync(out, { recursive: true });

const svgs = {};
const cells = join(root, "packages/icons/icons");
for (const cat of readdirSync(cells)) {
  const cd = join(cells, cat); if (!statSync(cd).isDirectory()) continue;
  for (const slug of readdirSync(cd)) {
    const d = join(cd, slug); if (!statSync(d).isDirectory()) continue;
    for (const f of readdirSync(d)) if (f.endsWith(".svg")) svgs[`iconmind-svg/${cat}/${slug}/${f}`] = readFileSync(join(d, f));
  }
}
svgs["iconmind-svg/LICENSE"] = readFileSync(join(root, "LICENSE"));
writeFileSync(join(out, "iconmind-svg.zip"), zipSync(svgs, { level: 6 }));

const pngs = {};
const p = join(root, "apps/web/public/p");
for (const f of readdirSync(p)) if (f.endsWith(".png")) pngs[`iconmind-png/${f}`] = readFileSync(join(p, f));
pngs["iconmind-png/LICENSE"] = readFileSync(join(root, "LICENSE"));
writeFileSync(join(out, "iconmind-png.zip"), zipSync(pngs, { level: 0 }));

for (const f of ["iconmind-svg.zip", "iconmind-png.zip"]) console.log(`${f}: ${(statSync(join(out, f)).size / 1048576).toFixed(1)} MB`);
