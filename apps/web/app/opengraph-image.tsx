import { ImageResponse } from "next/og";
import { iconCount } from "@/lib/icons";

// The site is a static export, so the route has to say it is not dynamic. Without this
// Next assumes the image is generated per request and refuses to export it at all.
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "IconMind — open-source icons for AI-era software";

/**
 * The card a link to the site unfurls into.
 *
 * Generated at build time, not drawn by hand, so the icon count on it cannot go stale the
 * way a checked-in PNG does — which is the whole reason the previous site had no card at
 * all rather than a wrong one.
 *
 * Deliberately typeset in the system stack: `next/og` would need the font binary fetched
 * and embedded, and a social card is one place where the exact face matters less than the
 * card existing.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF8F5",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* The mark, at the top rung of its ladder — a 1200×630 card is the one place
              every element of it is legible. Drawn as literal SVG rather than imported
              from `components/logo`: satori renders a subset of SVG and none of React's
              client runtime, so the component's `var(--color-accent)` would resolve to
              nothing here. */}
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#14110E"
            strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4 20 8 20 16 12 20 4 16 4 8Z" />
            <path d="M12 4v8l8 4" />
            <path d="m12 12-8 4" />
            <path d="m12 12 8-4" stroke="#C2410C" />
            <circle cx="12" cy="12" r="1.7" fill="#C2410C" stroke="none" />
          </svg>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#14110E", letterSpacing: -1.6 }}>
            IconMind
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 82, fontWeight: 700, color: "#14110E", letterSpacing: -3.4, lineHeight: 1.02 }}>
            Every icon,
          </div>
          <div style={{ display: "flex", fontSize: 82, fontWeight: 700, color: "#C2410C", letterSpacing: -3.4, lineHeight: 1.02 }}>
            drawn by one rule.
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 30, color: "#443D35", maxWidth: 900 }}>
            {iconCount} open-source icons for LLMs, agents, MCP and RAG.
          </div>
        </div>

        <div style={{ display: "flex", gap: 40, fontSize: 24, color: "#736A61" }}>
          <div>Outline · Duotone</div>
          <div>Three weights</div>
          <div>MIT licensed</div>
        </div>
      </div>
    ),
    size,
  );
}
