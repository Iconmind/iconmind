/** @type {import('next').NextConfig} */
export default {
  output: "export",          // no server, ever — see doc 00 "Prinsip Non-Negotiable"
  images: { unoptimized: true },
  trailingSlash: true,
  agentRules: false,        // Next writes AGENTS.md/CLAUDE.md into the repo otherwise
};
