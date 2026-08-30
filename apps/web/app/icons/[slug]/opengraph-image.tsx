import { ImageResponse } from "next/og";
import { allIcons, categoryOf, getIcon } from "@/lib/icons";
import { readSvg, svgElements } from "@/lib/svg";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return allIcons.map((i) => ({ slug: i.slug }));
}

/**
 * The card an icon's page unfurls into — the icon itself, large, with its name.
 *
 * Every icon page used to share the site's one card, so a link to `document-search`
 * showed the same picture as a link to the home page. Generated at build like the rest
 * of the export; satori draws the icon's own paths, so the card is the drawing and not
 * a screenshot of it.
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const icon = getIcon(slug)!;
  const children = svgElements(readSvg(icon.category, icon.slug));
  const category = categoryOf(icon.category)?.name ?? icon.category;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FAF8F5", padding: 72, fontFamily: "sans-serif", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", maxWidth: 640 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, fontWeight: 700, color: "#14110E", letterSpacing: -0.8 }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#14110E" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4 20 8 20 16 12 20 4 16 4 8Z" /><path d="M12 4v8l8 4" /><path d="m12 12-8 4" /><path d="m12 12 8-4" stroke="#C2410C" />
              <circle cx="12" cy="12" r="1.7" fill="#C2410C" stroke="none" />
            </svg>
            IconMind
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", fontSize: 26, color: "#C2410C", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>{category} icon</div>
            <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: "#14110E", letterSpacing: -2.5, lineHeight: 1.02 }}>{icon.name}</div>
            <div style={{ display: "flex", fontSize: 28, color: "#5C554D", lineHeight: 1.35 }}>{icon.description}</div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#8A8177" }}>SVG · PNG · React · Vue · Svelte · Flutter · MIT</div>
        </div>
        <div style={{ display: "flex", width: 400, height: 400, alignItems: "center", justifyContent: "center", background: "#FFFFFF", borderRadius: 48, border: "3px solid #E6E0D8" }}>
          <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="#14110E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {children.map((c, i) => {
              const Tag = c.tag as "path";
              const attrs: Record<string, string> = {};
              for (const [k, v] of Object.entries(c.attrs)) attrs[k === "stroke-width" ? "strokeWidth" : k === "fill-rule" ? "fillRule" : k] = v;
              return <Tag key={i} {...attrs} />;
            })}
          </svg>
        </div>
      </div>
    ),
    size,
  );
}
