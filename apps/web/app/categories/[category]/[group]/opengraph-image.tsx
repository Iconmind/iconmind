import { ImageResponse } from "next/og";
import { allGroups, groupOf, titleCase } from "@/lib/index-pages";
import { readSvg, svgElements } from "@/lib/svg";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return allGroups.map((g) => ({ category: g.category, group: g.slug }));
}

/** A group's card: the category, the group, and eight of its icons. */
export default async function Image({ params }: { params: Promise<{ category: string; group: string }> }) {
  const { category, group } = await params;
  const g = groupOf(category, group)!;
  const sample = g.icons.slice(0, 8);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#FAF8F5", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", fontSize: 26, color: "#C2410C", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>IconMind · {g.categoryName}</div>
          <div style={{ display: "flex", fontSize: 80, fontWeight: 700, color: "#14110E", letterSpacing: -3 }}>{titleCase(g.slug)} icons</div>
          <div style={{ display: "flex", fontSize: 28, color: "#5C554D" }}>{g.count} icons in this group — outline and duotone, three weights, MIT</div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {sample.map((i) => {
            const children = svgElements(readSvg(i.category, i.slug));
            return (
              <div key={i.slug} style={{ display: "flex", width: 112, height: 112, alignItems: "center", justifyContent: "center", background: "#FFFFFF", borderRadius: 24, border: "3px solid #E6E0D8" }}>
                <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#14110E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {children.map((c, n) => { const Tag = c.tag as "path"; const attrs: Record<string, string> = {}; for (const [k, v] of Object.entries(c.attrs)) attrs[k === "stroke-width" ? "strokeWidth" : k] = v; return <Tag key={n} {...attrs} />; })}
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    ),
    size,
  );
}
