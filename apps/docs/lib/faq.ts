import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The FAQ, as question-and-answer pairs, read from the MDX at build time.
 *
 * `FAQPage` is one of the few structured-data types that still earns a visibly different
 * search result, and the page already is a FAQ — `## ` questions with prose under each. What it lacked was anything telling a crawler that.
 *
 * Parsed from the raw file rather than from the compiled MDX because the compiled body is
 * a React component: getting text back out of it would mean rendering to a string and
 * stripping tags, which is a lot of machinery to recover something the source already had
 * in plain form.
 *
 * Deliberately literal about what it can handle: `## ` headings, prose paragraphs under
 * them, nothing nested. A question whose answer is a table or a code block contributes
 * its prose and drops the rest, which is correct — Google wants the answer as text, and
 * a serialised table is not that.
 */
export interface FaqEntry {
  question: string;
  answer: string;
}

export function faqEntries(): FaqEntry[] {
  const raw = readFileSync(join(process.cwd(), "content", "docs", "faq.mdx"), "utf8");
  // Drop the frontmatter block.
  const body = raw.replace(/^---[\s\S]*?\n---\n/, "");

  const out: FaqEntry[] = [];
  for (const chunk of body.split(/^## /m).slice(1)) {
    const nl = chunk.indexOf("\n");
    if (nl === -1) continue;
    const question = chunk.slice(0, nl).trim();
    const answer = chunk
      .slice(nl + 1)
      // Blocks that do not survive as plain text.
      .replace(/```[\s\S]*?```/g, "")
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter((p) => p && !p.startsWith("|") && !p.startsWith("<"))
      // Inline markdown, unwrapped: `code`, **bold**, [text](href).
      .map((p) =>
        p
          .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
          .replace(/[`*_]/g, "")
          .replace(/\s*\n\s*/g, " ")
          .trim(),
      )
      .join(" ");
    if (question && answer) out.push({ question, answer });
  }
  return out;
}
