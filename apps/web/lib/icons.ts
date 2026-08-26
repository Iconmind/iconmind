import metadata from "@iconmind/icons/metadata.json";

export interface IconMeta {
  slug: string; name: string; category: string; subcategory: string;
  description: string; tags: string[]; aliases: string[];
  componentName: string; elementCount: number; byteSize: number;
  related: string[]; addedIn: string;
}
export interface Category {
  slug: string; name: string; count: number;
  subcategories: { slug: string; count: number }[];
}

export const allIcons = metadata.icons as unknown as IconMeta[];
export const allCategories = metadata.categories as unknown as Category[];
export const iconCount = allIcons.length;
export const version = metadata.version as string;

export const getIcon = (slug: string) => allIcons.find((i) => i.slug === slug);
export const iconsIn = (category: string) => allIcons.filter((i) => i.category === category);
export const categoryOf = (slug: string) => allCategories.find((c) => c.slug === slug);
