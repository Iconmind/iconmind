/**
 * Batch 41 — arrows with jobs, files with contents, and gauges read at a glance.
 *
 * `arrow-back` and `arrow-external` join the arrow family; `file-code` and `file-storage`
 * are `page()` with different things on it, the way every page in this set works.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import { cycle, cloud, machine, page } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_41: Icon[] = [
  /* ── Arrows with jobs ─────────────────────────────────────────────────────────── */

  {
    slug: "arrow-back", category: "interface", subcategory: "arrow",
    name: "Arrow back", description: "Arrow back — the way you came, return to the previous screen",
    tags: ["return", "previous", "left"], family: "mark",
    aliases: ["previous"], keywords: ["back", "return", "previous", "navigate back", "west"],
    shapes: [row(12, 4, 20), poly([[10, 6], [4, 12], [10, 18]])],
  },
  {
    slug: "arrow-external", category: "interface", subcategory: "arrow",
    name: "External arrow", description: "External arrow — it opens somewhere else, in a new tab or another app",
    tags: ["out", "new-tab", "leave"], family: "arrow",
    aliases: [], keywords: ["open in new tab", "external", "leaves the app", "out and up"],
    shapes: [poly([[4, 20], [20, 4]]), poly([[10, 4], [20, 4], [20, 14]])],
  },
  {
    slug: "attach", category: "interface", subcategory: "file",
    name: "Attach", description: "Attach — clip a file to the message so it travels along with it",
    tags: ["clip", "add-file", "with"], family: "page",
    aliases: [], keywords: ["paperclip", "attachment", "add file", "clip on", "with this"],
    // A paperclip's loops need angles the set refuses; a page held by a clip corner does not.
    shapes: [page(), rect(10, 6, 4, 12, 2)],
  },
  {
    slug: "crawl", category: "rag", subcategory: "ingestion",
    name: "Crawl", description: "Crawl — follow every link a spider finds, scraping page after page",
    tags: ["spider", "scrape", "walk"], family: "figure",
    aliases: ["scrape"], keywords: ["web crawler", "spider", "scrape", "follow links", "walk"],
    shapes: [
      disc(5, 5, 2), disc(19, 5, 2), disc(19, 19, 2),
      row(5, 8, 16), col(19, 8, 16),
    ],
  },

  /* ── Files with contents ──────────────────────────────────────────────────────── */

  {
    slug: "file-code", category: "devtools", subcategory: "code",
    name: "Code file", description: "A code file — source code kept in a file, a script or a module",
    tags: ["source", "script", "module"], family: "page",
    aliases: [], keywords: ["source file", "module", "script file", "ts", "py"],
    shapes: [page(), poly([[11, 9], [8, 12], [11, 15]]), poly([[13, 9], [16, 12], [13, 15]])],
  },
  {
    slug: "file-storage", category: "cloud", subcategory: "storage",
    name: "File storage", description: "File storage — files kept somewhere with room for them, a bucket or a blob store",
    tags: ["bucket", "blob", "keep"], family: "figure",
    aliases: ["blob-storage"], keywords: ["object storage", "bucket", "s3", "blob", "files at rest"],
    shapes: [rect(2, 8, 20, 12, 2), row(4, 6, 18), row(13, 6, 12), row(16, 6, 15)],
  },
  {
    slug: "export-report", category: "analytics", subcategory: "dashboard",
    name: "Export report", description: "Export report — take the numbers with you as a CSV or a download",
    tags: ["download", "csv", "out"], family: "figure",
    aliases: [], keywords: ["export csv", "download report", "take away", "pdf", "out"],
    shapes: [
      rect(2, 4, 13, 16, 2), col(6, 10, 16), col(9, 8, 16), col(12, 12, 16),
      row(12, 17, 21), poly([[18, 9], [21, 12], [18, 15]]),
    ],
  },
  {
    slug: "code-diff", category: "devtools", subcategory: "version-control",
    name: "Diff", description: "A code diff — what changed, line by line, compared for review",
    tags: ["compare", "delta", "review"], family: "figure",
    aliases: [], keywords: ["diff view", "changes", "added removed", "compare", "review"],
    shapes: [col(7, 4, 10), row(7, 4, 10), poly([[4, 20], [20, 4]]), row(17, 14, 20)],
  },

  /* ── Gauges and freshness ─────────────────────────────────────────────────────── */

  {
    slug: "gauge", category: "analytics", subcategory: "metric",
    name: "Gauge", description: "A gauge — where the needle is right now on a dial or a meter",
    tags: ["dial", "meter", "level"], family: "meter",
    aliases: ["dial"], keywords: ["dial", "speedometer", "level", "needle", "reading"],
    shapes: [arc(12, 17, 9, 200, 340), poly([[12, 17], [7, 12]]), disc(12, 17, 1)],
  },
  {
    slug: "freshness-check", category: "data", subcategory: "quality",
    name: "Freshness check", description: "A freshness check — is this still current, recently verified and not stale?",
    tags: ["recent", "current", "verified"], family: "figure",
    aliases: ["freshness-data"], keywords: ["up to date", "recent", "sla on data", "current"],
    shapes: [disc(10, 12, 6), poly([[10, 9], [10, 12], [13, 12]]), poly([[16, 15], [18, 17], [22, 13]])],
  },
  {
    slug: "anomaly-data", category: "data", subcategory: "quality",
    name: "Data anomaly", description: "A data anomaly — the row that does not belong, an outlier or a wrong value",
    tags: ["outlier", "odd", "wrong"], family: "figure",
    aliases: [], keywords: ["outlier row", "bad record", "unexpected value", "odd one out"],
    shapes: [rect(2, 3, 20, 7, 2), row(6.5, 5, 19), rect(2, 13, 20, 7, 2), poly([[10, 14.5], [14, 18.5]]), poly([[14, 14.5], [10, 18.5]])],
  },
  {
    slug: "drift-infra", category: "devops", subcategory: "infrastructure",
    name: "Infrastructure drift", description: "Infrastructure drift — what is running no longer matches what was declared in code",
    tags: ["diverged", "terraform", "unmanaged"], family: "figure",
    aliases: [], keywords: ["terraform drift", "declared vs actual", "unmanaged change"],
    shapes: [rect(2, 3, 20, 7, 2), disc(6, 6.5, 1), rect(2, 14, 20, 7, 2), disc(18, 17.5, 1)],
  },

  /* ── Watching it run ──────────────────────────────────────────────────────────── */

  {
    slug: "log-stream", category: "devops", subcategory: "observability",
    name: "Log stream", description: "A log stream — lines arriving live as they happen, tailed and followed",
    tags: ["tail", "live", "follow"], family: "figure",
    aliases: ["tail-logs"], keywords: ["tail -f", "live logs", "follow", "streaming lines"],
    shapes: [row(5, 3, 21), row(9, 3, 17), row(13, 3, 19), row(17, 3, 14), poly([[19, 17], [21, 19], [19, 21]])],
  },
  {
    slug: "dashboard-ops", category: "analytics", subcategory: "dashboard",
    name: "Ops dashboard", description: "An ops dashboard — everything that matters to operations on one wall of panels",
    tags: ["noc", "wall", "panels"], family: "window",
    aliases: [], keywords: ["noc wall", "operations view", "panels", "at a glance"],
    shapes: [rect(2, 3, 20, 18, 2), row(8, 2, 22), disc(18, 5.5, 1), poly([[5, 17], [9, 13], [12, 16], [17, 11]])],
  },
  {
    slug: "benchmark-code", category: "devtools", subcategory: "testing",
    name: "Benchmark", description: "A code benchmark — how fast it runs, measured fairly and compared",
    tags: ["perf", "timing", "compare"], family: "figure",
    aliases: [], keywords: ["performance test", "timing", "ops per second", "fair compare"],
    shapes: [disc(10, 13, 7), poly([[10, 13], [14, 9]]), disc(10, 13, 1), col(19, 4, 8), col(22, 6, 10)],
  },
  {
    slug: "loop-detect", category: "agents", subcategory: "execution",
    name: "Loop detection", description: "Loop detection — the agent is going round in circles and has been caught",
    tags: ["stuck", "cycle", "caught"], family: "rotation",
    aliases: [], keywords: ["infinite loop", "stuck agent", "cycle detected", "going in circles"],
    shapes: [...cycle(), poly([[9.5, 9.5], [14.5, 14.5]]), poly([[14.5, 9.5], [9.5, 14.5]])],
  },

  /* ── The machine being taught ─────────────────────────────────────────────────── */

  {
    slug: "fine-tune", category: "ai", subcategory: "training",
    name: "Fine-tune", description: "Fine-tune — nudge a model with a small extra pass rather than retraining it",
    tags: ["adjust", "adapt", "small"], family: "machine",
    aliases: [], keywords: ["adapt", "small adjustment", "lora", "domain tune", "nudge"],
    shapes: [machine(), row(10, 8, 16), disc(10, 10, 1), row(14, 8, 16), disc(14, 14, 1)],
  },
  {
    slug: "image-generation", category: "ai", subcategory: "multimodal",
    name: "Image generation", description: "Image generation — a picture that did not exist until a model made it",
    tags: ["make", "art", "create"], family: "window",
    aliases: [], keywords: ["make an image", "diffusion", "generate art", "new picture"],
    shapes: [rect(2, 4, 20, 16, 2), poly([[6, 16], [10, 12], [14, 16]]), col(17, 7, 11), row(9, 15, 19)],
  },
  {
    slug: "loss", category: "ai", subcategory: "training",
    name: "Loss", description: "Loss — how wrong the model still is, the objective that training drives down",
    tags: ["error", "objective", "falling"], family: "chart",
    aliases: [], keywords: ["loss curve", "training error", "objective", "going down"],
    shapes: [col(4, 3, 21), row(21, 4, 22), poly([[6, 5], [12, 11], [15, 14], [20, 14]])],
  },
  {
    slug: "f1", category: "ai", subcategory: "evaluation",
    name: "F1 score", description: "F1 score — precision and recall forced to agree in one harmonic number",
    tags: ["harmonic", "balance", "both"], family: "figure",
    aliases: [], keywords: ["f1", "harmonic mean", "precision recall", "balanced score"],
    shapes: [disc(9, 12, 5), disc(15, 12, 5), col(12, 10.5, 13.5)],
  },

  /* ── Everyday machinery ───────────────────────────────────────────────────────── */

  {
    slug: "command", category: "devtools", subcategory: "terminal",
    name: "Command", description: "A command — the line you type at a prompt in the shell to make something happen",
    tags: ["cli", "prompt", "shell"], family: "arrow",
    aliases: [], keywords: ["command line", "prompt", "type", "shell", "run"],
    // The return arrow — the key that turns the typed line into something that happens.
    // It was the prompt chevron and underscore, which is cli one unit over.
    shapes: [poly([[21, 4], [21, 14], [5, 14]]), poly([[9, 10], [5, 14], [9, 18]])],
  },
  {
    slug: "calendar-run", category: "automation", subcategory: "schedule",
    name: "Calendar run", description: "Calendar run — the day a scheduled job is planned to happen on the calendar",
    tags: ["scheduled", "planned", "date"], family: "window",
    aliases: [], keywords: ["scheduled run", "planned", "on this date", "calendar job"],
    shapes: [rect(2, 5, 20, 15, 2), col(8, 2, 5), col(16, 2, 5), row(9, 2, 22), poly([[10, 12], [13, 15], [10, 18]], true)],
  },
  {
    slug: "cost-cloud", category: "cloud", subcategory: "cost",
    name: "Cloud cost", description: "Cloud cost — what the cloud provider is charging, the bill and the spend",
    tags: ["bill", "spend", "invoice"], family: "cloud",
    aliases: [], keywords: ["cloud bill", "spend", "cost explorer", "invoice", "finops"],
    shapes: [cloud(3), disc(7, 19, 1), disc(12, 19, 1), disc(17, 19, 1)],
  },
  {
    slug: "face-id", category: "security", subcategory: "auth",
    name: "Face ID", description: "Face ID — your face is the key, biometric unlock by scanning who you are",
    tags: ["biometric", "unlock", "scan"], family: "figure",
    aliases: [], keywords: ["face unlock", "biometric", "scan face", "recognition"],
    shapes: [
      poly([[3, 8], [3, 4], [8, 4]]), poly([[16, 4], [21, 4], [21, 8]]),
      poly([[3, 16], [3, 20], [8, 20]]), poly([[16, 20], [21, 20], [21, 16]]),
      disc(9, 10, 1), disc(15, 10, 1),
    ],
  },
  {
    slug: "otp", category: "security", subcategory: "auth",
    name: "One-time password", description: "A one-time password — a six-digit code that works once and then expires",
    tags: ["code", "six-digits", "expires"], family: "window",
    aliases: ["one-time-password"], keywords: ["totp", "6 digit code", "expires", "authenticator"],
    shapes: [rect(2, 8, 20, 8, 2), disc(6, 12, 1), disc(10, 12, 1), disc(14, 12, 1), col(19, 10, 14)],
  },
];
