import { defineConfig, defineDocs } from "fumadocs-mdx/config";

export const docs = defineDocs({ dir: "content/docs" });

export default defineConfig({
  mdxOptions: {
    // Headings get ids so the table of contents can link to them; the rest of the
    // rendering is ours, so Fumadocs is doing content and structure only.
    rehypeCodeOptions: { themes: { light: "github-light", dark: "github-dark" } },
  },
});
