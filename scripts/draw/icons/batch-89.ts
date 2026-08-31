/**
 * Batch 89 — round 2 of the second thousand: data modelling, migrations and warehousing.
 *
 * The words on a data engineer's screen between the source and the dashboard: how the model
 * is shaped, how it is loaded, and what is kept about the load. It leans on three bodies the
 * set already speaks — the table slab with dividers, the page for a definition, the folder
 * for a place things are kept — and on arrows for the direction of a load, because almost
 * every idea here is a direction: up or down, in or out, full or incremental.
 *
 * `parquet`, `lineage`, `dimension`, `data-lake` and `data-warehouse` already exist, so this
 * round refines around them rather than drawing them again: the columnar idea becomes
 * `columnar-store` against `row-store`, and lineage gains its two grains.
 *
 * Composition rule, as in batch 88: the drawing fills the frame. Ink centroid under 2.0.
 */
import { col, disc, poly, rect, row } from "../forms.ts";
import type { Icon } from "../build.ts";

const dm = (slug: string, subcategory: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[], family: string, shapes: Icon["shapes"]): Icon =>
  ({ slug, category: "data", subcategory, name, description, tags, family, aliases, keywords, shapes });

/** Two slabs with room between them — the before and after of almost everything here. */
const overUnder = (): Icon["shapes"] => [rect(2, 2, 20, 5, 2.5), rect(2, 17, 20, 5, 2.5)];

export const BATCH_89: Icon[] = [
  /* ── Migrations ───────────────────────────────────────────────────────────────── */

  dm("migration-up", "modelling", "Migration up", "A migration up — the change applied, the schema moved to the next version",
    ["apply", "forward", "version"], ["migrate-up"], ["migration up", "apply migration", "schema up", "forward migration"], "rails",
    [...overUnder(), col(12, 8, 16), poly([[8, 12], [12, 8], [16, 12]])]),

  dm("migration-down", "modelling", "Migration down", "A migration down — the change undone, the schema put back as it was",
    ["revert", "back", "undo"], ["migrate-down"], ["migration down", "rollback migration", "revert schema", "down migration"], "rails",
    [...overUnder(), col(12, 8, 16), poly([[8, 12], [12, 16], [16, 12]])]),

  dm("schema-version", "modelling", "Schema version", "A schema version — which shape of the table this is, and when it became that",
    ["revision", "stamp", "shape"], [], ["schema version", "migration version", "revision", "schema history"], "page",
    [rect(2, 2, 20, 12, 2), row(7, 5, 19), row(11, 5, 14), row(18, 4, 20), row(21, 7, 17)]),

  dm("data-model", "modelling", "Data model", "A data model — the entities and the lines between them, before any of it is a table",
    ["entities", "design", "shape"], [], ["data model", "logical model", "conceptual model", "entity model"], "lattice",
    [rect(2, 3, 8, 7, 2), rect(14, 3, 8, 7, 2), rect(8, 15, 8, 7, 2), poly([[6, 10], [6, 12.5], [18, 12.5], [18, 10]]), col(12, 12.5, 15)]),

  dm("entity-relation", "modelling", "Entity relation", "An entity relation — one row on this side, many on that, written on the line",
    ["cardinality", "erd", "link"], ["erd"], ["entity relationship", "erd", "one to many", "relation"], "chain",
    [rect(2, 7, 6.5, 10, 2), rect(13.5, 3, 8.5, 7, 2), rect(13.5, 14, 8.5, 7, 2), poly([[8.5, 12], [11, 12], [11, 6.5], [13.5, 6.5]]), poly([[11, 12], [11, 17.5], [13.5, 17.5]])]),

  dm("schema-registry", "modelling", "Schema registry", "A schema registry — every version of every schema, kept where producers can check it",
    ["registry", "versions", "contract"], [], ["schema registry", "avro registry", "schema store", "contract registry"], "folder",
    [rect(2, 5, 20, 16, 2), row(10, 2, 22), poly([[4, 6], [4, 2.5], [10, 2.5], [13.5, 6]]), row(14, 5, 19), row(18, 5, 15)]),

  /* ── The warehouse shapes ─────────────────────────────────────────────────────── */

  dm("star-schema", "modelling", "Star schema", "A star schema — one fact table in the middle, its dimensions around it",
    ["fact", "dimensions", "kimball"], [], ["star schema", "kimball", "fact and dimensions", "dimensional model"], "orbit",
    [rect(8, 9, 8, 6.5, 2), disc(12, 4, 2), disc(12, 20, 2), disc(4, 12, 2), disc(20, 12, 2)]),

  dm("snowflake-schema", "modelling", "Snowflake schema", "A snowflake schema — the dimensions of a star, themselves broken into more",
    ["normalised", "branch", "dimensions"], [], ["snowflake schema", "normalized dimensions", "branching dimensions", "dimensional model"], "orbit",
    [rect(8, 10, 8, 5, 2.5), col(12, 5, 10), row(5, 7, 17), col(7, 5, 8), col(17, 5, 8), poly([[7, 20], [12, 15], [17, 20]])]),

  dm("fact-table", "modelling", "Fact table", "A fact table — the measurements, one row per thing that happened",
    ["measures", "events", "centre"], ["fact"], ["fact table", "measures", "grain", "transactions table"], "window",
    [rect(2, 4, 20, 16, 2), row(9, 2, 22), col(9, 9, 20), col(15, 9, 20), disc(5.5, 6.5, 1)]),

  dm("dimension-table", "modelling", "Dimension table", "A dimension table — the labels a fact is described by, and nothing that happened",
    ["labels", "lookup", "attributes"], [], ["dimension table", "lookup table", "attributes", "dim table"], "window",
    [rect(4, 4, 16, 16, 2), row(9, 4, 20), row(13, 7, 17), row(17, 7, 17)]),

  dm("conformed-dimension", "modelling", "Conformed dimension", "A conformed dimension — one dimension meaning the same thing in every mart that uses it",
    ["shared", "consistent", "reuse"], [], ["conformed dimension", "shared dimension", "consistent labels", "master dimension"], "chain",
    [rect(7, 2, 10, 7, 2), col(12, 9, 12), poly([[5, 15], [5, 12], [19, 12], [19, 15]]), rect(2, 15, 6.5, 7, 2), rect(15.5, 15, 6.5, 7, 2)]),

  dm("junk-dimension", "modelling", "Junk dimension", "A junk dimension — the leftover flags gathered into one table so the fact stays clean",
    ["flags", "leftover", "gather"], [], ["junk dimension", "flags table", "leftover attributes", "garbage dimension"], "window",
    [rect(4, 10, 16, 11, 2), disc(8, 15, 1), disc(12, 15, 1), disc(16, 15, 1), poly([[7, 3], [12, 8], [17, 3]])]),

  dm("slowly-changing-dimension", "modelling", "Slowly changing dimension", "A slowly changing dimension — the old row kept when a label changes, so history still reads right",
    ["scd", "history", "versioned"], ["scd"], ["slowly changing dimension", "scd type 2", "dimension history", "versioned labels"], "window",
    [rect(2, 2, 20, 5, 2.5), rect(2, 9.5, 20, 5, 2.5), rect(2, 17, 20, 5, 2.5), disc(6, 4.5, 1), disc(6, 12, 1)]),

  dm("grain-table", "modelling", "Grain", "The grain — what one row of the table means, decided before anything is loaded",
    ["one-row", "level", "definition"], [], ["grain", "table grain", "row meaning", "level of detail"], "window",
    [rect(3, 4, 18, 16, 2), row(10, 3, 21), disc(6.5, 15, 1), row(15, 9, 18)]),

  /* ── Places things are kept ───────────────────────────────────────────────────── */

  dm("data-mart", "modelling", "Data mart", "A data mart — one team's slice of the warehouse, shaped for the questions they ask",
    ["slice", "subject", "team"], [], ["data mart", "subject area", "departmental warehouse", "curated slice"], "window",
    [rect(3, 4, 18, 16, 2), col(9, 4, 20), row(10, 9, 21), row(15, 9, 21)]),

  dm("staging-table", "modelling", "Staging table", "A staging table — where the raw load lands before anything is done to it",
    ["raw", "landing", "temporary"], ["landing-table"], ["staging table", "landing zone", "raw layer", "temp table"], "tray",
    [poly([[3, 4], [3, 15], [21, 15], [21, 4]]), col(12, 17, 21), poly([[8, 8], [12, 12], [16, 8]])]),

  dm("external-table", "modelling", "External table", "An external table — a table the warehouse reads but does not own",
    ["foreign", "outside", "read"], [], ["external table", "foreign table", "external stage", "read only source"], "window",
    [rect(2, 6, 13, 14, 2), row(11, 2, 15), poly([[17, 8], [21, 4], [21, 9]]), poly([[15, 10], [21, 4]])]),

  dm("columnar-store", "modelling", "Columnar store", "A columnar store — the values of one column kept together, so a scan reads only what it needs",
    ["columns", "analytics", "scan"], [], ["columnar storage", "column store", "olap storage", "vectorised scan"], "window",
    [rect(3, 4, 18, 16, 2), col(9, 4, 20), col(15, 4, 20)]),

  dm("row-store", "modelling", "Row store", "A row store — a whole row kept together, which is what a transaction wants",
    ["rows", "oltp", "record"], [], ["row storage", "row oriented", "oltp storage", "record store"], "window",
    [rect(3, 4, 18, 16, 2), row(9, 3, 21), row(15, 3, 21)]),

  dm("wide-table", "modelling", "Wide table", "A wide table — everything flattened into one row so nothing has to be joined",
    ["flat", "denormal", "one-row"], ["one-big-table"], ["wide table", "one big table", "flat table", "denormalised"], "window",
    [rect(2, 7, 20, 10, 2), col(8, 7, 17), col(16, 7, 17), row(12, 2, 22)]),

  /* ── Loading ──────────────────────────────────────────────────────────────────── */

  dm("full-refresh", "modelling", "Full refresh", "A full refresh — the table dropped and rebuilt from the source every time",
    ["rebuild", "replace", "whole"], [], ["full refresh", "truncate and load", "full reload", "rebuild table"], "cycle",
    [rect(2, 13, 20, 8, 2), row(17, 2, 22), poly([[6, 4], [18, 4], [18, 9]]), poly([[18, 9], [15, 6]])]),

  dm("incremental-model", "modelling", "Incremental model", "An incremental model — only the rows that arrived since last time are built",
    ["delta", "append", "since"], [], ["incremental model", "incremental load", "delta load", "append only build"], "window",
    [rect(2, 13, 20, 6, 3), poly([[6, 9], [12, 3], [18, 9]]), col(12, 3, 13), row(21, 7, 17)]),

  dm("idempotent-load", "modelling", "Idempotent load", "An idempotent load — running it twice leaves the table exactly as running it once",
    ["safe-retry", "same", "twice"], [], ["idempotent load", "safe retry", "rerunnable", "exactly once"], "cycle",
    [rect(2, 13, 20, 8, 2), poly([[6, 4], [18, 4], [18, 9]]), poly([[18, 9], [15, 6]]), poly([[8, 17], [11, 20], [16, 15]])]),

  dm("copy-into", "modelling", "Copy into", "Copy into — files picked up from a stage and written into the table",
    ["load", "ingest", "files"], [], ["copy into", "bulk load", "stage to table", "file load"], "tray",
    [rect(6, 2, 12, 7, 2), col(12, 9, 15), poly([[8, 11], [12, 15], [16, 11]]), poly([[3, 16], [3, 21], [21, 21], [21, 16]])]),

  dm("unload-data", "modelling", "Unload", "Unload — the table written back out to files a system outside can read",
    ["export", "out", "files"], ["export-table"], ["unload", "export table", "write to stage", "extract files"], "tray",
    [poly([[3, 3], [3, 8], [21, 8], [21, 3]]), col(12, 9, 15), poly([[8, 13], [12, 9], [16, 13]]), rect(6, 15, 12, 7, 2)]),

  dm("merge-into", "modelling", "Merge into", "Merge into — matched rows updated, new ones inserted, in one statement",
    ["upsert", "match", "combine"], ["merge-statement"], ["merge into", "upsert statement", "when matched", "merge sql"], "chain",
    [rect(2, 2, 8, 7, 2), rect(14, 2, 8, 7, 2), poly([[6, 9], [12, 15], [18, 9]]), rect(6, 15, 12, 7, 2)]),

  dm("watermark-column", "modelling", "Watermark column", "A watermark column — the timestamp a load reads to know where it stopped",
    ["cursor", "since", "timestamp"], ["high-watermark"], ["watermark column", "high watermark", "incremental cursor", "last loaded at"], "window",
    [rect(2, 4, 20, 16, 2), row(12, 2, 22), row(8, 5, 14), disc(18, 8, 1)]),

  dm("late-arriving-data", "modelling", "Late-arriving data", "Late-arriving data — a row for a window that was already closed and counted",
    ["late", "backdated", "reopen"], ["late-data"], ["late arriving data", "late events", "out of order", "backdated rows"], "window",
    [rect(2, 3, 20, 8, 2), row(7, 2, 22), col(12, 12, 18), poly([[8, 14], [12, 18], [16, 14]]), row(21, 6, 18)]),

  dm("partition-prune", "modelling", "Partition pruning", "Partition pruning — the partitions the query cannot need are never opened",
    ["skip", "narrow", "scan"], ["pruning"], ["partition pruning", "partition elimination", "skip partitions", "predicate pushdown"], "window",
    [rect(2, 4, 9, 16, 2), rect(13.5, 4, 8.5, 16, 2), poly([[16, 9], [20, 13]]), poly([[20, 9], [16, 13]])]),

  dm("clustering-key", "modelling", "Clustering key", "A clustering key — the column the rows are physically sorted by, so a scan stays small",
    ["sort", "co-locate", "physical"], [], ["clustering key", "sort key", "cluster by", "physical order"], "window",
    [rect(2, 4, 20, 16, 2), col(9, 4, 20), disc(5.5, 8, 1), disc(5.5, 12, 1), disc(5.5, 16, 1), row(12, 12, 19)]),

  /* ── What is kept about the change ────────────────────────────────────────────── */

  dm("change-log-table", "modelling", "Change log table", "A change log table — one row per change, kept so the state can be rebuilt",
    ["append", "history", "events"], ["changelog-table"], ["change log", "change table", "cdc table", "event log table"], "window",
    [rect(2, 2, 20, 5, 2.5), rect(2, 9.5, 20, 5, 2.5), rect(2, 17, 20, 5, 2.5), disc(6, 4.5, 1), disc(6, 12, 1), disc(6, 19.5, 1)]),

  dm("audit-table", "modelling", "Audit table", "An audit table — who changed what, kept beside the table it watches",
    ["who", "trail", "record"], [], ["audit table", "audit trail", "change history", "who changed what"], "window",
    [rect(3, 4, 18, 16, 2), row(10, 3, 21), disc(6.5, 7, 1), row(14, 6, 18), poly([[14, 16], [16, 18], [19, 15]])]),

  dm("soft-delete", "modelling", "Soft delete", "A soft delete — the row marked gone and kept, so nothing downstream loses its history",
    ["flag", "kept", "hidden"], ["logical-delete"], ["soft delete", "deleted flag", "logical delete", "tombstone row"], "window",
    [rect(2, 6, 20, 12, 2), row(12, 2, 22), row(9, 5, 13), poly([[16, 14], [20, 18]]), poly([[20, 14], [16, 18]])]),

  dm("hard-delete", "modelling", "Hard delete", "A hard delete — the row actually gone, and nothing left to read",
    ["gone", "purge", "removed"], ["physical-delete"], ["hard delete", "physical delete", "purge row", "permanently deleted"], "window",
    [rect(2, 2, 20, 6, 3), rect(2, 16, 20, 6, 3), poly([[10, 10], [14, 14]]), poly([[14, 10], [10, 14]])]),

  dm("bitemporal", "modelling", "Bitemporal", "Bitemporal — when a thing was true, and when the table was told about it",
    ["two-clocks", "valid", "known"], [], ["bitemporal", "valid time", "transaction time", "as of"], "axes",
    [col(4, 3, 20), row(20, 4, 21), poly([[7, 17], [12, 12]]), poly([[12, 12], [18, 6]]), disc(12, 12, 1)]),

  dm("effective-date", "modelling", "Effective date", "An effective date — the day a row starts being the true one",
    ["from", "valid-from", "start"], ["valid-from"], ["effective date", "valid from", "start date", "effective dating"], "window",
    [rect(3, 5, 18, 16, 2), row(10, 3, 21), col(8, 3, 7), col(16, 3, 7), disc(9, 15, 1), row(15, 12, 18)]),

  dm("time-travel-query", "modelling", "Time travel", "Time travel — the table read as it stood at a moment that has passed",
    ["as-of", "history", "rewind"], ["as-of-query"], ["time travel", "as of query", "historical query", "snapshot query"], "clock",
    [rect(2, 4, 20, 16, 2), disc(12, 13, 5), col(12, 9, 13), row(13, 13, 17)]),

  dm("data-vault", "modelling", "Data vault", "A data vault — hubs, links and satellites, so history is added and never edited",
    ["hub", "satellite", "insert-only"], [], ["data vault", "hub link satellite", "data vault 2", "insert only model"], "orbit",
    [disc(12, 12, 3), disc(5, 5, 2), disc(19, 5, 2), disc(5, 19, 2), disc(19, 19, 2), poly([[7, 7], [10, 10]])]),

  /* ── Where a column came from ─────────────────────────────────────────────────── */

  dm("lineage-table", "modelling", "Table lineage", "Table lineage — which tables this one was built from, and which are built from it",
    ["upstream", "downstream", "graph"], [], ["table lineage", "upstream tables", "downstream", "data lineage graph"], "chain",
    [rect(2, 3, 6.5, 7, 2), rect(2, 14, 6.5, 7, 2), rect(13.5, 8.5, 8.5, 7, 2), poly([[8.5, 6.5], [11, 6.5], [11, 12], [13.5, 12]]), poly([[8.5, 17.5], [11, 17.5], [11, 12]])]),

  dm("lineage-column", "modelling", "Column lineage", "Column lineage — which column fed which, through every model between",
    ["field", "trace", "path"], [], ["column lineage", "field level lineage", "column trace", "downstream columns"], "chain",
    [rect(2, 4, 7, 16, 2), rect(15, 4, 7, 16, 2), row(8, 9, 15), row(16, 9, 15), disc(5.5, 8, 1), disc(18.5, 16, 1)]),

  dm("surrogate-map", "modelling", "Surrogate map", "A surrogate map — the table that says which business key became which generated id",
    ["mapping", "key", "lookup"], ["key-map"], ["surrogate key map", "key mapping", "id lookup", "natural to surrogate"], "window",
    [rect(2, 4, 20, 16, 2), col(12, 4, 20), row(9, 2, 22), disc(7, 15, 1), row(15, 14, 20)]),

  /* ── The dbt shape ────────────────────────────────────────────────────────────── */

  dm("dbt-model", "modelling", "Model file", "A model file — the select that becomes a table, and the tests that come with it",
    ["select", "file", "build"], ["transform-model"], ["dbt model", "model file", "sql model", "transformation model"], "page",
    [poly([[13, 3], [6, 3], [6, 21], [18, 21], [18, 8]], true), row(11, 9, 15), row(15, 9, 15), poly([[8, 17], [10, 19], [14, 15]])]),

  dm("denormalise", "modelling", "Denormalise", "Denormalise — the joins done once and stored, so the reader never has to do them",
    ["flatten", "join-once", "widen"], ["denormalize"], ["denormalise", "denormalize", "pre join", "flatten model"], "chain",
    [rect(2, 2, 8, 7, 2), rect(14, 2, 8, 7, 2), poly([[6, 9], [12, 15], [18, 9]]), rect(4, 15, 16, 7, 2)]),

  dm("nested-field", "modelling", "Nested field", "A nested field — a column that holds a shape rather than a value",
    ["struct", "json", "inner"], [], ["nested field", "struct column", "json column", "nested data"], "window",
    [rect(3, 3, 18, 18, 2), rect(8, 10, 9, 7, 2), row(7, 6, 13)]),

  dm("flatten-nested", "modelling", "Flatten", "Flatten — a nested shape opened out into ordinary columns",
    ["unnest", "explode", "open"], ["unnest"], ["flatten", "unnest", "explode column", "flatten json"], "rails",
    [rect(8, 2, 8, 7, 2), col(12, 9, 12), poly([[5, 16], [5, 12], [19, 12], [19, 16]]), row(20, 3, 7), row(20, 10, 14), row(20, 17, 21)]),

  dm("struct-column", "modelling", "Struct column", "A struct column — named fields kept inside one column of the row",
    ["fields", "record", "typed"], [], ["struct column", "record type", "composite type", "named fields"], "window",
    [rect(2, 4, 20, 16, 2), col(9, 4, 20), row(9, 9, 22), row(15, 9, 22), disc(5.5, 12, 1)]),

  dm("file-format", "modelling", "File format", "A file format — how the rows are written on disk, which decides what a read costs",
    ["encoding", "on-disk", "layout"], [], ["file format", "storage format", "parquet or csv", "table format"], "page",
    [poly([[13, 3], [6, 3], [6, 21], [18, 21], [18, 8]], true), col(9, 11, 18), col(12, 11, 18), col(15, 11, 18)]),

  dm("manifest-file", "modelling", "Manifest", "A manifest — the file that lists which files are actually part of the table right now",
    ["listing", "snapshot", "index"], [], ["manifest file", "table manifest", "file list", "snapshot manifest"], "page",
    [poly([[13, 3], [6, 3], [6, 21], [18, 21], [18, 8]], true), disc(9, 12, 1), row(12, 11, 16), disc(9, 16, 1), row(16, 11, 16)]),

  /* ── Reading across systems ───────────────────────────────────────────────────── */

  dm("federated-query", "modelling", "Federated query", "A federated query — one statement answered from more than one system at once",
    ["across", "remote", "union"], [], ["federated query", "cross database query", "query federation", "external query"], "chain",
    [rect(2, 3, 8, 7, 2), rect(14, 3, 8, 7, 2), poly([[6, 10], [6, 12.5], [18, 12.5], [18, 10]]), col(12, 12.5, 15), rect(6, 15, 12, 7, 2)]),

  dm("branch-data", "modelling", "Data branch", "A data branch — a copy of the warehouse to change without touching what is live",
    ["copy", "isolate", "try"], ["zero-copy-clone"], ["data branch", "zero copy clone", "warehouse branch", "isolated copy"], "chain",
    [col(6, 3, 21), disc(6, 8, 2), disc(18, 16, 2), poly([[6, 12], [18, 12], [18, 15]]), disc(6, 20, 1)]),
];
