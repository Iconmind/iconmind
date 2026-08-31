/**
 * Batch 88 — round 1 of the second thousand: relational databases and SQL.
 *
 * The vocabulary a person writing queries has on screen all day, and which no general set
 * draws: what a transaction is, what a join does, which lock is held, why the planner chose
 * that path. It builds on the relational family this set already has — the full-width table
 * slab with dividers inside it (`table`, `row`, `column`), the two overlapping discs that
 * mean a join, and the key with a shaft and a tooth (`primary-key`, `foreign-key`) — so the
 * fifty read as more of that family rather than a new one.
 *
 * Composition rule for this round, stated because it is what drifted last time: the drawing
 * fills the frame. No heavy body on one side with a thin mark parked beside it — that passes
 * the bounding-box rule while its ink mass sits three units off centre, and in a row of
 * neighbours it leans. Ink centroid under 2.0 here, tighter than the audit's 2.5.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import type { Icon } from "../build.ts";

const db = (slug: string, subcategory: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[], family: string, shapes: Icon["shapes"]): Icon =>
  ({ slug, category: "data", subcategory, name, description, tags, family, aliases, keywords, shapes });

export const BATCH_88: Icon[] = [
  /* ── The unit of work ─────────────────────────────────────────────────────────── */

  db("transaction", "relational", "Transaction", "A transaction — work that either all lands or none of it does",
    ["atomic", "commit", "unit"], ["txn"], ["transaction", "atomic", "begin commit", "all or nothing", "acid"], "bracket",
    [poly([[7, 4], [3, 4], [3, 20], [7, 20]]), poly([[17, 4], [21, 4], [21, 20], [17, 20]]), row(10, 8, 16), row(14, 8, 16)]),

  db("savepoint", "relational", "Savepoint", "A savepoint — a marked place inside a transaction to roll back to",
    ["mark", "partial", "restore"], [], ["savepoint", "nested transaction", "partial rollback", "checkpoint sql"], "bracket",
    [poly([[7, 4], [3, 4], [3, 20], [7, 20]]), poly([[17, 4], [21, 4], [21, 20], [17, 20]]), col(12, 6, 10), disc(12, 14, 2)]),

  db("isolation-level", "relational", "Isolation level", "Isolation level — how much of one transaction another is allowed to see",
    ["visibility", "concurrent", "level"], [], ["isolation level", "read committed", "repeatable read", "serializable"], "window",
    [rect(2, 4, 20, 16, 2), col(12, 4, 20), row(9, 5, 10), row(15, 14, 19)]),

  /* ── What the planner did ─────────────────────────────────────────────────────── */

  db("explain-plan", "relational", "Explain plan", "An explain plan — the tree of steps the planner chose to answer the query",
    ["planner", "tree", "steps"], ["query-plan"], ["explain", "explain analyze", "query plan", "execution plan"], "chain",
    [disc(12, 5, 2), col(12, 7, 10), poly([[6, 13], [6, 10], [18, 10], [18, 13]]), disc(6, 15, 2), disc(18, 15, 2)]),

  db("query-hint", "relational", "Query hint", "A query hint — the directive that tells the planner which path to take",
    ["directive", "force", "planner"], [], ["query hint", "optimizer hint", "force index", "planner directive"], "window",
    [rect(2, 4, 20, 16, 2), row(9, 2, 22), col(12, 13, 17), disc(12, 19, 1)]),

  db("slow-query", "relational", "Slow query", "A slow query — the one over the threshold, found and timed",
    ["latency", "threshold", "profile"], [], ["slow query", "slow log", "long running query", "query latency"], "magnifier",
    [disc(11, 11, 6), poly([[15.5, 15.5], [20, 20]]), col(11, 7, 11), row(11, 11, 14)]),

  db("query-timeout", "relational", "Query timeout", "A query timeout — the statement cancelled because it ran too long",
    ["cancel", "deadline", "abort"], [], ["query timeout", "statement timeout", "cancel query", "deadline exceeded"], "window",
    [rect(2, 3, 20, 7, 2), row(6.5, 5, 19), disc(12, 16.5, 5), col(12, 12.5, 16.5), row(16.5, 12, 16)]),

  db("table-scan", "relational", "Table scan", "A table scan — every row read because no index could be used",
    ["full-scan", "sweep", "read-all"], ["full-scan"], ["full table scan", "seq scan", "sequential scan", "no index"], "window",
    [rect(2, 2, 20, 11, 2), row(7, 2, 22), disc(11, 18, 3), poly([[13, 20], [15, 22]])]),

  db("query-cache", "relational", "Query cache", "A query cache — the answer kept so the same question is not asked twice",
    ["cached", "reuse", "answer"], [], ["query cache", "result cache", "cached query", "plan cache"], "window",
    [rect(2, 3, 20, 7, 2), row(6.5, 5, 19), rect(2, 14, 20, 7, 2), poly([[10, 11], [12, 13], [14, 11]])]),

  /* ── Reading and writing ──────────────────────────────────────────────────────── */

  db("write-ahead-log", "relational", "Write-ahead log", "A write-ahead log — the change written to the log before it touches the page",
    ["wal", "durability", "append"], ["wal"], ["write ahead log", "wal", "redo log", "durability"], "window",
    [rect(2, 2, 20, 6, 3), col(9, 2, 8), col(15, 2, 8), poly([[9, 11], [12, 14], [15, 11]]), rect(2, 15, 20, 7, 2)]),

  db("read-replica", "relational", "Read replica", "A read replica — a copy kept in step that answers reads and takes no writes",
    ["copy", "follower", "read-only"], ["replica-read"], ["read replica", "follower", "standby", "read only copy"], "window",
    [rect(2, 4, 9, 16, 2), row(9, 2, 11), rect(14.5, 8, 7.5, 8, 2), row(12, 11, 14.5)]),

  db("truncate-table", "relational", "Truncate table", "Truncate — every row swept out at once, the table itself left standing",
    ["empty", "clear", "sweep"], [], ["truncate", "empty table", "delete all rows", "clear table"], "window",
    [rect(2, 4, 20, 16, 2), row(9, 2, 22), poly([[9, 13], [15, 19]]), poly([[15, 13], [9, 19]])]),

  db("vacuum-db", "relational", "Vacuum", "Vacuum — dead rows reclaimed and the space handed back",
    ["reclaim", "compact", "dead-rows"], ["autovacuum"], ["vacuum", "autovacuum", "reclaim space", "dead tuples"], "window",
    [row(4, 3, 21), row(8, 3, 21), col(12, 10, 16), poly([[8, 13], [12, 17], [16, 13]]), row(21, 5, 19)]),

  db("seed-data", "relational", "Seed data", "Seed data — the rows a fresh database is planted with",
    ["fixture", "initial", "plant"], ["database-seed"], ["seed data", "database seed", "initial rows", "fixtures"], "window",
    [disc(12, 5, 2), col(12, 7, 10), rect(2, 10, 20, 10, 2), row(15, 2, 22)]),

  /* ── Structure ────────────────────────────────────────────────────────────────── */

  db("materialized-view", "relational", "Materialized view", "A materialized view — a view whose answer is stored rather than recomputed",
    ["stored", "view", "snapshot"], ["matview"], ["materialized view", "matview", "stored view", "precomputed"], "window",
    [rect(2, 3, 15, 14, 2), rect(7, 7, 15, 14, 2)]),

  db("stored-procedure", "relational", "Stored procedure", "A stored procedure — logic that lives in the database and runs there",
    ["routine", "server-side", "run"], ["sproc"], ["stored procedure", "sproc", "routine", "plpgsql"], "window",
    [rect(2, 4, 20, 16, 2), row(9, 2, 22), poly([[10, 12], [14, 16], [10, 20]], true)]),

  db("cte", "relational", "CTE", "A common table expression — a named result the main query then reads",
    ["with", "named", "subquery"], ["with-clause"], ["cte", "common table expression", "with clause", "named subquery"], "window",
    [rect(5, 2, 14, 7, 2), col(12, 9, 13), rect(2, 13, 20, 8, 2)]),

  db("subquery", "relational", "Subquery", "A subquery — a query nested inside the one that uses its answer",
    ["nested", "inner", "inline"], [], ["subquery", "nested query", "inline view", "derived table"], "window",
    [rect(2, 3, 20, 18, 2), rect(7, 11, 10, 7, 2), row(7, 7, 17)]),

  db("partition-table", "relational", "Partitioned table", "A partitioned table — one table stored as ranges that are queried as one",
    ["range", "split", "shard"], ["table-partition"], ["partition", "partitioned table", "range partition", "table partition"], "window",
    [rect(2, 4, 20, 16, 2), col(12, 4, 20), disc(7, 12, 1), disc(17, 12, 1)]),

  db("sequence-db", "relational", "Sequence", "A sequence — the generator that hands out the next number on request",
    ["generator", "next", "counter"], ["nextval"], ["sequence", "nextval", "identity column", "id generator"], "window",
    [rect(2, 7, 20, 10, 2), row(12, 5, 13), poly([[16, 9], [19, 12], [16, 15]])]),

  db("auto-increment", "relational", "Auto increment", "Auto-increment — the column that fills its own id, one higher each time",
    ["identity", "counter", "id"], ["identity-column"], ["auto increment", "serial", "identity", "auto id"], "window",
    [rect(2, 7, 20, 10, 2), row(12, 5, 12), poly([[14, 11], [17, 8], [20, 11]]), col(17, 8, 16)]),

  db("collation", "relational", "Collation", "Collation — the rule that decides how text sorts and compares",
    ["sort", "locale", "compare"], [], ["collation", "sort order", "locale", "case sensitivity"], "text",
    [row(6, 2, 16), row(12, 2, 13), row(18, 2, 10), col(20, 5, 19), poly([[17, 16], [20, 19], [22, 17]])]),

  db("cardinality", "relational", "Cardinality", "Cardinality — how many distinct values a column actually holds",
    ["distinct", "count", "estimate"], [], ["cardinality", "distinct count", "selectivity", "ndv"], "figure",
    [disc(7, 8, 4), disc(16, 14, 3), disc(20, 20, 1)]),

  /* ── Keys and constraints ─────────────────────────────────────────────────────── */

  db("composite-key", "relational", "Composite key", "A composite key — a key made of more than one column together",
    ["multi-column", "compound", "key"], ["compound-key"], ["composite key", "compound key", "multi column key", "composite primary"], "key",
    [disc(5, 11, 3), row(11, 8, 20), col(15, 11, 18), col(19, 11, 18)]),

  db("surrogate-key", "relational", "Surrogate key", "A surrogate key — an id with no meaning of its own, standing in for one",
    ["synthetic", "id", "key"], [], ["surrogate key", "synthetic key", "artificial key", "technical key"], "key",
    [disc(6, 8, 3), poly([[9, 8], [18, 8], [18, 17]]), disc(18, 20, 2)]),

  db("unique-constraint", "relational", "Unique constraint", "A unique constraint — no two rows may carry the same value",
    ["distinct", "no-duplicate", "rule"], [], ["unique constraint", "unique index", "no duplicates", "uniqueness"], "window",
    [rect(2, 4, 20, 16, 2), row(9, 2, 22), col(7, 13, 17), disc(12, 15, 1), poly([[15, 13], [19, 17]])]),

  db("check-constraint", "relational", "Check constraint", "A check constraint — a rule every row has to satisfy to be stored",
    ["rule", "validate", "predicate"], [], ["check constraint", "validation rule", "column check", "predicate"], "window",
    [rect(2, 4, 20, 16, 2), row(12, 2, 22), poly([[8, 15], [11, 18], [16, 13]])]),

  db("not-null-constraint", "relational", "Not null", "Not null — the column that refuses to be left empty",
    ["required", "mandatory", "rule"], ["required-column"], ["not null", "required field", "mandatory column", "null constraint"], "window",
    [rect(2, 4, 20, 16, 2), col(9, 4, 20), col(15, 4, 20), row(12, 10, 14)]),

  db("nullable-column", "relational", "Nullable column", "A nullable column — one that is allowed to hold nothing at all",
    ["optional", "empty", "null"], [], ["nullable", "optional column", "allows null", "nullable field"], "window",
    [rect(2, 4, 20, 16, 2), col(9, 4, 20), col(15, 4, 20), poly([[10, 16], [14, 12]])]),

  db("null-value", "relational", "Null", "Null — the absence of a value, which is not zero and not empty text",
    ["absent", "unknown", "empty"], [], ["null", "nil", "missing value", "unknown value"], "ring",
    [disc(12, 12, 7), poly([[7, 17], [17, 7]])]),

  db("default-value", "relational", "Default value", "A default — the value written when the insert supplies none",
    ["fallback", "preset", "column"], [], ["default value", "column default", "fallback value", "preset"], "window",
    [rect(2, 6, 20, 12, 2), col(12, 6, 18), row(12, 4, 10), disc(17, 12, 1)]),

  db("cascade-delete", "relational", "Cascade delete", "Cascade delete — the children go when the parent does",
    ["children", "propagate", "remove"], ["on-delete-cascade"], ["cascade delete", "on delete cascade", "referential action", "delete children"], "window",
    [rect(2, 2, 20, 6, 3), poly([[9, 3], [13, 7]]), col(12, 9, 14), rect(2, 15, 20, 6, 3)]),

  db("referential-integrity", "relational", "Referential integrity", "Referential integrity — every reference points at a row that exists",
    ["consistent", "reference", "valid"], [], ["referential integrity", "foreign key constraint", "orphan rows", "consistency"], "window",
    [rect(2, 6, 8, 12, 2), rect(14, 6, 8, 12, 2), row(9, 10, 14), row(15, 10, 14)]),

  /* ── Joins ────────────────────────────────────────────────────────────────────── */

  db("inner-join", "relational", "Inner join", "An inner join — only the rows that match on both sides",
    ["match", "both", "intersect"], [], ["inner join", "intersection", "matching rows", "join on"], "orbit",
    [arc(10.5, 12, 8.5, -80, 80), arc(13.5, 12, 8.5, 100, 260)]),

  db("outer-join", "relational", "Outer join", "An outer join — the matches, and the rows that had none, kept anyway",
    ["unmatched", "left-right", "keep"], ["full-outer-join"], ["outer join", "left join", "right join", "full outer join"], "orbit",
    [disc(7.5, 12, 5.5), disc(16.5, 12, 5.5), row(3, 5, 10), row(3, 14, 19)]),

  db("cross-join", "relational", "Cross join", "A cross join — every row on the left paired with every row on the right",
    ["cartesian", "product", "pairs"], ["cartesian-join"], ["cross join", "cartesian product", "every combination", "no join condition"], "orbit",
    [col(5, 4, 20), col(19, 4, 20), poly([[7, 6], [17, 16]]), poly([[17, 6], [7, 16]])]),

  db("self-join", "relational", "Self join", "A self join — a table joined to itself to compare its own rows",
    ["same-table", "loop", "alias"], [], ["self join", "join to itself", "recursive join", "table alias"], "ring",
    [disc(12, 13, 5), arc(12, 13, 8, 200, 340), poly([[17, 6], [20, 6], [20, 9]])]),

  /* ── Shaping the answer ───────────────────────────────────────────────────────── */

  db("group-by", "relational", "Group by", "Group by — rows gathered into buckets so each can be summarised",
    ["bucket", "aggregate", "gather"], [], ["group by", "grouping", "buckets", "aggregate rows"], "bracket",
    [row(5, 2, 10), row(11, 2, 10), row(17, 2, 10), col(12, 5, 17), row(11, 12, 22)]),

  db("order-by", "relational", "Order by", "Order by — the rows handed back in the order the query asked for",
    ["sort", "sequence", "rank"], [], ["order by", "sort rows", "ascending", "descending"], "text",
    [row(5, 3, 21), row(10, 3, 17), row(15, 3, 13), row(20, 3, 9)]),

  db("distinct-rows", "relational", "Distinct", "Distinct — duplicates collapsed so each row appears once",
    ["dedupe", "unique", "collapse"], ["dedupe-rows"], ["distinct", "deduplicate", "unique rows", "select distinct"], "window",
    [rect(2, 3, 8, 5, 2.5), rect(14, 3, 8, 5, 2.5), poly([[6, 8], [12, 14], [18, 8]]), rect(4, 16, 16, 5, 2.5)]),

  db("n-plus-one", "relational", "N+1 queries", "The N+1 problem — one query for the list, then one more for every row in it",
    ["repeat", "loop", "anti-pattern"], ["n-plus-one-query"], ["n+1 query", "n plus one", "select n+1", "query in loop"], "chain",
    [disc(12, 4, 2), col(12, 6, 10), poly([[4, 16], [4, 10], [20, 10], [20, 16]]), col(12, 10, 16), row(18, 2, 22)]),

  db("orm", "relational", "ORM", "An ORM — objects on one side, tables on the other, mapped between",
    ["mapping", "objects", "layer"], ["object-relational-mapping"], ["orm", "object relational mapping", "active record", "data mapper"], "window",
    [rect(2, 5, 8, 14, 2), disc(6, 9, 1), row(13, 4, 8), rect(14, 5, 8, 14, 2), row(10, 15, 21), row(12, 10, 14)]),

  /* ── Locks ────────────────────────────────────────────────────────────────────── */

  db("row-lock", "relational", "Row lock", "A row lock — one row held while the rest of the table stays free",
    ["held", "single", "concurrency"], [], ["row lock", "row level lock", "select for update", "record lock"], "lock",
    [rect(2, 3, 20, 6, 3), rect(8, 13, 8, 7, 2), arc(12, 13, 3, 180, 360)]),

  db("table-lock", "relational", "Table lock", "A table lock — the whole table held, and everyone else waits",
    ["exclusive", "whole", "block"], [], ["table lock", "lock table", "exclusive lock", "table level lock"], "lock",
    [rect(2, 2, 20, 9, 2), row(6.5, 2, 22), rect(7, 15, 10, 6, 3), arc(12, 15, 3.5, 180, 360)]),

  db("optimistic-lock", "relational", "Optimistic lock", "Optimistic locking — write freely, then check the version still matches",
    ["version", "check", "retry"], ["version-check"], ["optimistic locking", "version column", "compare and swap", "optimistic concurrency"], "window",
    [rect(2, 6, 20, 12, 2), row(12, 4, 12), poly([[14, 12], [16, 14], [20, 10]])]),

  db("pessimistic-lock", "relational", "Pessimistic lock", "Pessimistic locking — take the lock first, and nobody else gets in",
    ["upfront", "block", "hold"], [], ["pessimistic locking", "select for update", "lock first", "blocking lock"], "lock",
    [rect(8, 3, 8, 7, 2), arc(12, 3, 3, 180, 360), rect(2, 13, 20, 8, 2), row(17, 2, 22)]),

  db("connection-pool", "relational", "Connection pool", "A connection pool — a handful of connections handed round instead of opened each time",
    ["reuse", "pool", "connections"], [], ["connection pool", "pooling", "pgbouncer", "max connections"], "window",
    [rect(2, 3, 8, 4, 2), rect(2, 10, 8, 4, 2), rect(2, 17, 8, 4, 2), rect(14, 6, 8, 12, 2), row(12, 10, 14)]),

  /* ── Indexes ──────────────────────────────────────────────────────────────────── */

  db("index-covering", "relational", "Covering index", "A covering index — one that answers the query without touching the table",
    ["cover", "index-only", "answer"], ["index-only-scan"], ["covering index", "index only scan", "included columns", "covering"], "window",
    [rect(2, 3, 20, 18, 2), col(7, 3, 21), row(8, 10, 19), row(12, 10, 19), row(16, 10, 19)]),

  db("index-bloat", "relational", "Index bloat", "Index bloat — an index grown far past the data it points at",
    ["swollen", "waste", "rebuild"], [], ["index bloat", "bloated index", "index size", "reindex"], "chart",
    [col(4, 3, 21), row(6, 4, 16), row(10, 4, 21), row(14, 4, 19), row(18, 4, 12)]),

  db("full-text-index", "relational", "Full-text index", "A full-text index — words indexed so a phrase can be looked up, not just a value",
    ["words", "search", "phrase"], ["fts"], ["full text search", "fts", "text index", "tsvector"], "window",
    [rect(2, 3, 20, 18, 2), row(8, 5, 19), row(12, 5, 15), disc(15, 16, 3), poly([[17, 18], [20, 21]])]),
];
