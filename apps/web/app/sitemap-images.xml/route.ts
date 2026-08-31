import { allIcons, categoryOf } from "@/lib/icons";
import { releaseDate } from "@/lib/releases";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * The image sitemap: every icon page, with the PNG that stands for it.
 *
 * Google Images finds pictures through `<img>` tags and through this file; the site had
 * neither, so a set of 2,437 drawings had no presence in the one search surface an icon
 * set is actually found through. Title and caption are the page's own name and
 * description — the words a person would type.
 */
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

export function GET() {
  const urls = allIcons.map((i) => {
    const mod = releaseDate(i.updatedIn ?? i.addedIn);
    return `<url><loc>${SITE_URL}/icons/${i.slug}/</loc>${mod ? `<lastmod>${mod}</lastmod>` : ""}` +
      `<image:image><image:loc>${SITE_URL}/p/${i.slug}.png</image:loc>` +
      `<image:title>${esc(`${i.name} icon`)}</image:title>` +
      `<image:caption>${esc(`${i.description}. Free ${categoryOf(i.category)?.name ?? i.category} icon by IconMind — SVG, PNG, React, Vue, Flutter and more. MIT.`)}</image:caption>` +
      `</image:image></url>`;
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8" } });
}
