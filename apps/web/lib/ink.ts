/**
 * A page colour, made into a file colour.
 *
 * The customiser's Ink, Accent and Muted are CSS custom properties: `var(--color-accent)`
 * means something on the page and nothing anywhere else. Baked into a standalone SVG — one
 * handed to an <img> to rasterise, or saved to disk — the property has no document to
 * resolve against, `stroke` is invalid, and the icon paints no strokes at all. PNG and WebP
 * come out empty and transparent; JPEG, which has no alpha and is given a white ground,
 * comes out a blank white square. That was the bug.
 *
 * Reading the value off the document at the moment of download also means the file carries
 * the colour of the theme the reader is actually in, which is what they picked.
 */
export function literalColour(colour?: string | null): string | null {
  if (!colour) return null;
  const token = colour.match(/^var\(\s*(--[\w-]+)\s*\)$/)?.[1];
  if (!token) return colour;
  if (typeof document === "undefined") return null;
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim() || null;
}
