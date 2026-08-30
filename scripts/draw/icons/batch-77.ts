/**
 * Batch 77 — round 1 of the parity plan: the document family.
 *
 * Twenty-five marks on the one page body every document-* icon already uses, at the
 * slot document-add/check/off/alert established (SMALL, centred on 12). The Lucide
 * spellings ride along as aliases so what people type resolves here.
 *
 * Unattended round. Every name checked free before drawing.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { page } from "../bodies.ts";
import { SMALL, remove } from "../marks.ts";
import type { Icon } from "../build.ts";

const HEART = "a heart is one line, not three strokes with visible seams";
const doc = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], marks: Icon["shapes"]): Icon => ({
  slug, category: "interface", subcategory: "file", name, description, tags, family: "page", aliases, keywords,
  shapes: [page(), ...marks],
});

export const BATCH_77: Icon[] = [
  doc("document-remove", "Document remove", "A document with a minus on it — take this file out of the set, drop it from the list",
    ["minus", "drop", "delete"], ["file-minus"], ["remove file", "delete document", "drop file"], remove(SMALL)),
  doc("document-search", "Document search", "A document with a magnifying glass on it — find text inside this file, search its contents",
    ["find", "lookup", "inside"], ["file-search"], ["search file", "find in document", "grep"],
    [disc(11.5, 11.5, 3), poly([[13.5, 13.5], [16, 16]])]),
  doc("document-lock", "Document lock", "A document with a padlock on it — this file is locked, read-only or encrypted at rest",
    ["locked", "private", "encrypted"], ["file-lock"], ["locked file", "protected document", "read only"],
    [poly([[9, 12], [15, 12], [15, 17.5], [9, 17.5]], true), arc(12, 12, 2, 180, 360)]),
  doc("document-json", "Document JSON", "A document with braces on it — a JSON file, structured data written as text",
    ["braces", "data", "structured"], ["file-json", "file-braces"], ["json file", "config file", "structured document"],
    [arc(10, 12, 2.5, 90, 270), arc(14, 12, 2.5, 270, 90)]),
  doc("document-image", "Document image", "A document with a picture on it — an image file, a photo or graphic saved to disk",
    ["picture", "photo", "graphic"], ["file-image"], ["image file", "photo file", "png", "jpeg"],
    [disc(10, 10, 1), poly([[9, 15.5], [11, 13.5], [13, 15.5], [15, 13.5]])]),
  doc("document-audio", "Document audio", "A document with sound bars on it — an audio file, a recording or a track saved to disk",
    ["sound", "recording", "track"], ["file-audio", "file-music", "file-volume"], ["audio file", "mp3", "wav", "recording file"],
    [col(9, 10.5, 13.5), col(12, 9, 15), col(15, 10.5, 13.5)]),
  doc("document-archive", "Document archive", "A document with a box on it — an archive file, a bundle zipped up for storage or transfer",
    ["zip", "bundle", "compressed"], ["file-archive"], ["zip file", "archive file", "tarball", "compressed file"],
    [poly([[9, 10], [15, 10], [15, 17], [9, 17]], true), row(13.5, 9, 15)]),
  doc("document-spreadsheet", "Document spreadsheet", "A document with a grid on it — a spreadsheet file, rows and columns of cells",
    ["table", "cells", "sheet"], ["file-spreadsheet"], ["spreadsheet file", "csv", "xlsx", "sheet file"],
    [row(11, 9, 15), row(14.5, 9, 15), col(12, 9, 17.5)]),
  doc("document-chart", "Document chart", "A document with bars on it — a report file, numbers already charted on the page",
    ["report", "bars", "figures"], ["file-bar-chart", "file-chart-column", "file-line-chart", "file-pie-chart"], ["report file", "chart document", "data report"],
    [col(10, 12, 16.5), col(14, 9, 16.5), row(16.5, 8.5, 15.5)]),
  doc("document-edit", "Document edit", "A document with a pencil on it — open this file for editing and change what it says",
    ["pencil", "write", "modify"], ["file-pen", "file-pen-line", "file-edit"], ["edit file", "modify document", "write file"],
    [poly([[9, 16.5], [9, 14], [13.5, 9.5], [16, 12], [11.5, 16.5]], true)]),
  doc("document-clock", "Document clock", "A document with a clock on it — a file's history, when it changed or when it expires",
    ["history", "modified", "expires"], ["file-clock"], ["file history", "modified date", "document expiry", "recent file"],
    [disc(12, 12.5, 3.5), poly([[12, 9.5], [12, 12.5], [14.5, 12.5]])]),
  doc("document-config", "Document config", "A document with sliders on it — a configuration file, the settings that shape a program",
    ["settings", "sliders", "options"], ["file-cog", "file-sliders"], ["config file", "settings file", "dotfile", "yaml"],
    [row(10.5, 9, 15), col(13.5, 8.5, 12.5), row(14.5, 9, 15), col(10.5, 12.5, 16.5)]),
  doc("document-input", "Document input", "A document with an arrow going in — a file taken as input, read by a program or a step",
    ["read", "into", "source"], ["file-input"], ["input file", "read file", "source document"],
    [row(12, 3, 11), poly([[8.5, 9.5], [11, 12], [8.5, 14.5]])]),
  doc("document-output", "Document output", "A document with an arrow pointing right inside it — a file produced as output, written by a program or a step",
    ["write", "result", "produced"], ["file-output"], ["output file", "written file", "result document"],
    [row(12, 9, 14), poly([[12.5, 9.5], [15, 12], [12.5, 14.5]])]),
  doc("document-up", "Document up", "A document with an arrow pointing up on it — upload this file, send it upstream",
    ["upload", "send", "upstream"], ["file-up"], ["upload file", "send document", "push file"],
    [col(12, 9, 16), poly([[9.5, 11.5], [12, 9], [14.5, 11.5]])]),
  doc("document-down", "Document down", "A document with an arrow pointing down on it — download this file, fetch it to disk",
    ["download", "fetch", "save"], ["file-down"], ["download file", "fetch document", "save file"],
    [col(12, 9, 16), poly([[9.5, 13.5], [12, 16], [14.5, 13.5]])]),
  doc("document-user", "Document user", "A document with a person on it — a file that belongs to someone, a profile or personal record",
    ["owner", "profile", "personal"], ["file-user"], ["personal file", "user document", "profile record", "owner"],
    [disc(12, 10.5, 2), arc(12, 17, 4, 180, 360)]),
  doc("document-question", "Document question", "A document with a question mark on it — an unknown file, its type or contents not yet known",
    ["unknown", "help", "unrecognised"], ["file-question", "file-question-mark"], ["unknown file", "unrecognised document", "file help"],
    [arc(12, 11.5, 2.5, 180, 90), disc(12, 16.5, 1)]),
  doc("document-type", "Document type", "A document with a T on it — a typography or font file, the letterforms text is set in",
    ["font", "typography", "letter"], ["file-type"], ["font file", "typeface file", "ttf", "type document"],
    [row(9.5, 9, 15), col(12, 9.5, 16)]),
  doc("document-terminal", "Document terminal", "A document with a prompt on it — a script file, commands to run from the shell",
    ["script", "shell", "prompt"], ["file-terminal"], ["script file", "shell script", "bash file", "executable"],
    [poly([[9, 10], [11.5, 12.5], [9, 15]]), row(15, 12.5, 15.5)]),
  doc("document-scan", "Document scan", "A document with a scan line across it — scan this file, read it through for what it holds",
    ["read", "inspect", "ocr"], ["file-scan"], ["scan document", "ocr file", "inspect file", "scanned page"],
    [row(12, 3, 21)]),
  doc("document-badge", "Document badge", "A document with a rosette on it — a certified file, an award or an official record",
    ["certified", "award", "official"], ["file-badge", "file-badge-2"], ["certified document", "award file", "official record", "certificate"],
    [disc(12, 10.5, 2), poly([[10, 12.5], [10, 17.5], [12, 15.5], [14, 17.5], [14, 12.5]])]),
  doc("document-heart", "Document heart", "A document with a heart on it — a favourite file, one kept close and starred",
    ["favourite", "starred", "liked"], ["file-heart"], ["favourite file", "liked document", "starred file"],
    [raw("M8.5 11A1.75 1.75 0 0 1 12 11A1.75 1.75 0 0 1 15.5 11L12 14.5Z", HEART, true)]),
];
