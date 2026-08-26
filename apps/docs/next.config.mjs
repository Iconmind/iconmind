import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
export default withMDX({
  output: "export",          // no server, ever — see doc 00 "Prinsip Non-Negotiable"
  images: { unoptimized: true },
  trailingSlash: true,
  agentRules: false,        // Next writes AGENTS.md/CLAUDE.md into the repo otherwise
});
