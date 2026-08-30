/**
 * Batch 01 — twenty concepts, drawn in the set's language rather than in everybody's.
 *
 * Two moves carry it. **Open silhouettes** — a shape stops short of closing, and the break
 * sits at the top where a reader's eye starts — and **chamfered corners**, one corner cut
 * at 45°, reserved for the things that are machines. The gap is the same idea as the hollow
 * middle a modifier will sit in, so the family system is a consequence of the language
 * rather than a fitting bolted onto it.
 *
 * Each icon is one list of shapes, and there is nothing else to keep in step. Two earlier
 * attempts carried a second, solid drawing beside this one — the first derived by a curve
 * offsetter, the second typed by hand — and both came out wrong on three of the first five.
 * That second drawing no longer exists, so neither can be wrong.
 *
 * Nothing here is repaired after the fact either. Every constructor asserts before it
 * returns, so an icon that cannot be drawn legally stops the run instead of reaching disk
 * in a state somebody has to notice later.
 */
import { arc, body, col, disc, frame, openDisc, poly, rect, row } from "../forms.ts";
import {
  bookmark, core, folder, lattice, machine, machineInset, machineWide, page, panel, pill,
  ring, tray, window_,
} from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_01: Icon[] = [
  /* ── The language stated plainly ──────────────────────────────────────────────── */

  {
    slug: "agent", category: "agents", subcategory: "agent-core",
    name: "Agent", description: "An autonomous AI agent that decides and acts on its own to reach a goal, without step-by-step prompts",
    tags: ["autonomous", "bot", "actor"], family: "orbit",
    aliases: ["bot"], keywords: ["autonomous agent", "ai agent"],
    // A circle that will not close, and a core in the middle that a modifier takes the
    // place of. Everything else in the set is a variation on this sentence.
    shapes: [ring(), core()],
  },

  {
    slug: "embedding", category: "rag", subcategory: "vector",
    name: "Embedding", description: "A vector embedding — a piece of meaning turned into coordinates a model can compare and search",
    tags: ["vector", "encode", "latent"], family: "lattice",
    aliases: [], keywords: ["latent space", "encode", "vector"],
    // The same sentence on a diamond instead of a circle: a point placed in a space that
    // is oriented rather than round. The core is smaller because the diamond's diagonals
    // come closer to the middle than a circle's rim does.
    shapes: [lattice(), core(3)],
  },

  /* ── Machines: the chamfered register ─────────────────────────────────────────── */

  {
    slug: "model", category: "ai", subcategory: "model",
    name: "Model", description: "A trained machine learning model, the network of weights that turns an input into an output",
    tags: ["neural", "weights", "network"], family: "machine",
    aliases: [], keywords: ["neural network", "weights", "checkpoint", "llm"],
    // A machine with a structured core. The core was a circle first, and a rounded box
    // with a big circle in the middle is a camera — at any size, to everyone. The diamond
    // says the same thing about structure and ties the icon to `embedding`, which is what
    // a model's inside is actually made of.
    shapes: [machine(), poly([[12, 8], [16, 12], [12, 16], [8, 12]], true)],
  },

  {
    slug: "database", category: "data", subcategory: "storage",
    name: "Database", description: "A database where records are stored, indexed and queried — the system of record behind an app",
    tags: ["storage", "records", "sql"], family: "machine",
    aliases: ["db"], keywords: ["sql", "datastore", "table"],
    // Two rules rather than the stack of ellipses every other set draws. A cylinder is a
    // 1970s disk pack; what a reader actually pictures is rows they can query.
    shapes: [machine(), row(11, 7, 17), row(15.5, 7, 17)],
  },

  {
    slug: "cpu", category: "cloud", subcategory: "compute",
    name: "CPU", description: "The CPU, the processor where general computation runs before work is handed to accelerators",
    tags: ["processor", "chip", "compute"], family: "machine",
    aliases: ["processor"], keywords: ["chip", "compute", "silicon"],
    // The pins are on the sides only. The top edge is where the silhouette breaks, so a
    // pin there would float with nothing to stand on.
    shapes: [
      machineInset(),
      rect(8.5, 8.5, 7, 7, 2),
      row(9, 2, 5), row(15, 2, 5),
      row(9, 19, 22), row(15, 19, 22),
    ],
  },

  {
    slug: "terminal", category: "devtools", subcategory: "terminal",
    name: "Terminal", description: "A terminal window — run commands from the shell and read what the command line prints back",
    tags: ["console", "shell", "command"], family: "machine",
    aliases: ["console"], keywords: ["shell", "bash", "zsh", "command line"],
    // The prompt sits in the cut corner, where a real one is, which leaves the middle free
    // for a modifier without moving anything.
    shapes: [
      machineWide(),
      poly([[6, 9], [9, 12], [6, 15]]),
      row(15, 11.5, 17.5),
    ],
  },

  /* ── Containers ───────────────────────────────────────────────────────────────── */

  {
    slug: "folder", category: "interface", subcategory: "file",
    name: "Folder", description: "A folder that keeps related files together — a directory in a workspace or a project tree",
    tags: ["directory", "files", "group"], family: "folder",
    aliases: ["directory", "folder-closed"], keywords: ["dir", "files"],
    // The tab is at the top left and steps up, which is the half of the shape that says
    // "folder" — drawn on the right it reads as a page with a corner torn off, which is
    // what the first version of this was and what `document` already is.
    // The gap goes in the long top edge, past the step. One run, not two: two polylines
    // meeting at a point blend under round joins and tear apart at the seam.
    shapes: [folder()],
  },

  {
    slug: "document", category: "interface", subcategory: "file",
    name: "Document", description: "A single document or file with something written in it — a page of text, notes or a report",
    tags: ["file", "page", "text"], family: "page",
    aliases: ["file", "page"], keywords: ["page", "doc", "text file"],
    // The fold is the break. A page already has one place it opens, so the language does
    // not have to impose a second — and the missing corner reads as a fold at any size,
    // where a drawn fold line disappears below twenty pixels.
    shapes: [
      page(), row(12, 9, 15), row(16, 9, 15),
    ],
  },

  {
    slug: "calendar", category: "interface", subcategory: "time",
    name: "Calendar", description: "A calendar showing what happens on which day — dates, schedules, deadlines and events",
    tags: ["date", "schedule", "month"], family: "window",
    aliases: ["schedule"], keywords: ["date", "month", "event"],
    // The rings straddle the break, which is the one place they can be: a calendar's top
    // edge is where its binding is, and that is exactly where this language opens.
    shapes: [window_(), row(10, 3, 21), col(8, 2.5, 5), col(16, 2.5, 5)],
  },

  {
    slug: "token", category: "ai", subcategory: "token",
    name: "Token", description: "A token, the unit of text a language model actually reads and counts — a word piece or a symbol",
    tags: ["subword", "unit", "text"], family: "capsule",
    keywords: ["subword", "tokenizer", "bpe", "context length"],
    // A capsule that will not close: a token is a fragment of something longer, and the
    // gap says so without a second element. Wider and with a smaller share of its top edge
    // missing than the first version, which took half the top away and read as a letter C.
    shapes: [frame(2, 4, 13, 6, 3, { gap: 0 }), frame(9, 14, 13, 6, 3, { gap: 0 })],
  },

  {
    slug: "prompt", category: "ai", subcategory: "prompt",
    name: "Prompt", description: "A prompt — the instruction, question or input you write for a language model to answer",
    tags: ["input", "instruction", "query"], family: "window",
    aliases: ["input"], keywords: ["instruction", "system prompt", "query"],
    // A field, a caret and one line of text. Rounded rather than chamfered: this is
    // something a person types into, not a machine.
    shapes: [panel(), col(7.5, 10, 14), row(12, 11, 17)],
  },

  /* ── Instruments ──────────────────────────────────────────────────────────────── */

  {
    slug: "search", category: "interface", subcategory: "action",
    name: "Search", description: "Search — find something by name or keyword with a magnifying-glass lookup",
    tags: ["find", "magnifier", "lookup"], family: "magnifier",
    aliases: ["find"], keywords: ["magnifier", "lookup", "query"],
    // The lens carries the hollow, not the canvas centre — which is why a mark placed on
    // the canvas centre poked out of its right rim in the set before this one. The gap
    // sits opposite the handle, so the two breaks balance rather than stack.
    shapes: [openDisc(10, 10, 7, 44), poly([[15, 15], [21, 21]])],
  },

  {
    slug: "clock", category: "interface", subcategory: "time",
    name: "Clock", description: "A clock showing the current time — timing, hours, schedules and anything measured in minutes",
    tags: ["time", "hour", "watch"], family: "orbit",
    aliases: ["time"], keywords: ["hour", "watch", "latency"],
    // The hands run from the centre, not from the rim. Cut back to the rim they became two
    // tick marks, and a dial with tick marks is a dial — it stops being a clock.
    shapes: [ring(), col(12, 6.5, 12), row(12, 12, 16.5)],
  },

  {
    slug: "filter", category: "data", subcategory: "transform",
    name: "Filter", description: "A filter funnel that keeps only what matches — narrow a list, a query or a stream of results",
    tags: ["funnel", "narrow", "query"], family: "funnel",
    aliases: ["funnel"], keywords: ["narrow", "where", "refine"],
    // The mouth has to be drawn. Letting the gap eat the whole top edge left two
    // diagonals and a stem — a tuning fork, not a funnel. The gap takes the middle of the
    // mouth instead, which is the part a funnel is open at anyway.
    shapes: [body(poly([
      [9, 5], [3, 5], [10, 12], [10, 19], [14, 19], [14, 12], [21, 5], [15, 5],
    ]))],
  },

  {
    slug: "parameters", category: "ai", subcategory: "inference",
    name: "Parameters", description: "Parameters — the knobs and settings you set before a model or a job runs",
    tags: ["settings", "tuning", "controls"], family: "rails",
    aliases: [], keywords: ["temperature", "top-p", "tuning", "sliders", "controls", "settings"],
    // Two rails and two knobs, and the knobs are on different rails at different heights.
    // Level knobs read as a table; offset knobs read as something that was adjusted.
    shapes: [col(8, 4, 20), col(16, 4, 20), row(9, 5.5, 10.5), row(15, 13.5, 18.5)],
  },

  /* ── Movement ─────────────────────────────────────────────────────────────────── */

  {
    slug: "upload", category: "interface", subcategory: "arrow",
    name: "Upload", description: "Upload — send a file or data away from here up to a server, a cloud bucket or a model",
    tags: ["send", "push", "export"], family: "tray",
    aliases: ["export"], keywords: ["send", "push", "share"],
    // The tray is the open shape: its mouth faces up, which is where this language breaks
    // anyway, so the arrow leaves through the gap rather than over a wall.
    shapes: [
      tray(),
      col(12, 7, 15),
      poly([[8, 11], [12, 7], [16, 11]]),
    ],
  },

  {
    slug: "download", category: "interface", subcategory: "arrow",
    name: "Download", description: "Download — bring a file, a model or a dataset from somewhere else onto this machine",
    tags: ["receive", "pull", "import"], family: "tray",
    aliases: ["import"], keywords: ["receive", "pull", "save"],
    // The same tray, the same mouth, the arrow going the other way. Two icons that differ
    // by one shape's direction have to be built from one drawing, or they drift.
    shapes: [
      tray(),
      col(12, 5, 13),
      poly([[8, 9], [12, 13], [16, 9]]),
    ],
  },

  {
    slug: "check", category: "interface", subcategory: "state",
    name: "Check", description: "A check mark meaning it worked — success, done, confirmed or passed",
    tags: ["done", "success", "tick"], family: "mark",
    aliases: ["done"], keywords: ["tick", "success", "ok", "complete"],
    // One run. A tick inside a ring is a different icon, and the set will have it — this
    // is the mark itself, which is what goes next to a line of text.
    shapes: [poly([[4, 12], [9.5, 17.5], [20, 7]])],
  },

  {
    slug: "bookmark", category: "interface", subcategory: "action",
    name: "Bookmark", description: "A bookmark that keeps something where you can find it again — save a page, a prompt or a result",
    tags: ["save", "flag", "pin"], family: "ribbon",
    aliases: [], keywords: ["flag", "save", "favourite", "favorite"],
    // A ribbon already has a notch cut into it. Putting the gap at the top rather than
    // adding a second cut keeps it one shape and one silhouette.
    shapes: [bookmark()],
  },

  {
    slug: "user", category: "interface", subcategory: "identity",
    name: "User", description: "A user — a person and the account, profile and permissions that belong to them",
    tags: ["person", "profile", "account"], family: "figure",
    aliases: ["person", "user-round", "circle-user-round"], keywords: ["profile", "account", "avatar", "human"],
    // The shoulders are an arc, so the figure is open at the sides by construction. A head
    // with a gap cut in it reads as damage rather than as language.
    shapes: [disc(12, 8, 3), body(arc(12, 21, 7, 180, 360))],
  },
];
