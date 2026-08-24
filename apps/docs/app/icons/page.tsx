import type { Metadata } from "next";
import { allCategories, allIcons } from "@/lib/icons";
import { readSvg, svgBody } from "@/lib/svg";
import { IconBrowser } from "@/components/icon-browser";

export const metadata: Metadata = {
  title: "Browse icons",
  description: "Search every IconMind icon by name, tag, or category.",
};

export default function IconsPage() {
  const icons = allIcons.map((i) => ({
    slug: i.slug, name: i.name, category: i.category,
    tags: [...i.tags, ...i.aliases].join(" "),
    body: svgBody(readSvg(i.category, i.slug)),
  }));
  return (
    <div className="pt-10">
      <IconBrowser icons={icons} categories={allCategories.map((c) => c.slug)} />
    </div>
  );
}
