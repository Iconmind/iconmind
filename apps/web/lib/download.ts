/**
 * Hand the browser a file it never fetched.
 *
 * The download buttons used to point at `/icons/<slug>.svg` — a path that has never
 * existed on the static export, so every click politely saved 404.html. The page
 * already holds the exact SVG markup it is showing (variant, weight and colour
 * included), which is strictly more correct than any file on disk: the served
 * `/i/<slug>.svg` is only ever outline-regular. So the file is made here, from what
 * is on screen.
 *
 * `currentColor` is right on a page and wrong in a standalone file — a viewer with no
 * CSS context resolves it to black, which happens to be the default anyway, but when
 * the user picked a colour the download should carry it.
 */
export function downloadSvg(svg: string, filename: string, hex?: string | null) {
  const text = hex ? svg.replaceAll("currentColor", hex) : svg;
  const url = URL.createObjectURL(new Blob([text], { type: "image/svg+xml" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
