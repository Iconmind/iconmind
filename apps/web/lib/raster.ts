/**
 * Every download format but SVG, made in the browser from the SVG on screen.
 *
 * The page already holds the exact markup it shows — variant, weight, colour and all —
 * so the file a person asks for is rendered from that, at the size they picked, on
 * their own machine. Nothing is fetched and nothing is stored: the site is a static
 * export and has no server to ask. PNG and WebP fall out of a canvas; the ICO is a
 * PNG-in-ICO container, which every browser and Windows since Vista reads.
 */
export type RasterType = "image/png" | "image/webp" | "image/jpeg";

function svgToImage(svg: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("the SVG did not decode")); };
    img.src = url;
  });
}

/** The SVG with its colour baked in and a pixel size set, ready to rasterise. */
function sized(svg: string, px: number, hex?: string | null) {
  const coloured = hex ? svg.replaceAll("currentColor", hex) : svg.replaceAll("currentColor", "#000000");
  return coloured.replace(/<svg([^>]*?)\s(width|height)="[^"]*"/g, "<svg$1").replace("<svg", `<svg width="${px}" height="${px}"`);
}

export async function rasterise(svg: string, px: number, type: RasterType, hex?: string | null): Promise<Blob> {
  const img = await svgToImage(sized(svg, px, hex));
  const canvas = document.createElement("canvas");
  canvas.width = px; canvas.height = px;
  const ctx = canvas.getContext("2d")!;
  // JPEG has no alpha: give it the page's own white rather than a black ground.
  if (type === "image/jpeg") { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, px, px); }
  ctx.drawImage(img, 0, 0, px, px);
  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("no blob"))), type, 0.92));
}

/** An .ico holding PNG frames at the sizes given — the favicon a site made of these icons wants. */
export async function ico(svg: string, sizes: number[], hex?: string | null): Promise<Blob> {
  const frames = await Promise.all(sizes.map(async (s) => new Uint8Array(await (await rasterise(svg, s, "image/png", hex)).arrayBuffer())));
  const header = 6 + 16 * frames.length;
  const total = header + frames.reduce((n, f) => n + f.length, 0);
  const out = new Uint8Array(total); const dv = new DataView(out.buffer);
  dv.setUint16(0, 0, true); dv.setUint16(2, 1, true); dv.setUint16(4, frames.length, true);
  let offset = header;
  frames.forEach((f, i) => {
    const s = sizes[i]!; const e = 6 + 16 * i;
    out[e] = s >= 256 ? 0 : s; out[e + 1] = s >= 256 ? 0 : s; out[e + 2] = 0; out[e + 3] = 0;
    dv.setUint16(e + 4, 1, true); dv.setUint16(e + 6, 32, true);
    dv.setUint32(e + 8, f.length, true); dv.setUint32(e + 12, offset, true);
    out.set(f, offset); offset += f.length;
  });
  return new Blob([out], { type: "image/x-icon" });
}

export function save(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

/** PNG onto the clipboard — the fastest path from "that one" to a Figma frame or a chat. */
export async function copyPng(svg: string, px: number, hex?: string | null) {
  const blob = await rasterise(svg, px, "image/png", hex);
  await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
}
