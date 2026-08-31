## 0.6.2

A hundred and fifty icons across three rounds, and two new subcategories.

**Relational databases and SQL** (`data/relational`) — the vocabulary a person writing
queries has on screen: transactions and savepoints, the four joins, isolation levels and
the two kinds of lock, explain plans, slow queries and the N+1 problem, keys and
constraints, index bloat and covering indexes.

**Data modelling, migrations and warehousing** (`data/modelling`) — what sits between the
source and the dashboard: migrations up and down, star and snowflake schemas, fact and
dimension tables, incremental and full loads, watermarks and late-arriving rows, soft and
hard deletes, time travel, and lineage at both grains.

**Networking and protocols** — what a request meets between one machine and another: mTLS
and certificate rotation, sockets and keep-alive, TCP, UDP, QUIC and HTTP/3, DNS records
and TTLs, NAT, BGP and anycast, proxies forward and reverse, traceroute, MTU and QoS.

2,287 → 2,437 icons, 13,722 → 14,622 cells.

## 0.6.0

Sixteen devices — the hardware people kept asking other icon sets for: mouse, printer,
router, laptop, tablet, speaker, gamepad, headset, USB, SIM and SD cards, ethernet, cable,
motherboard, battery charging and a satellite dish. Twenty-one more names now resolve to
icons that already existed (a smartphone is `phone`, a watch is `smartwatch`, the pointer
arrow is `cursor`, a map pin is `location`). 2,287 icons, 13,722 drawings.

## 0.5.0

The generic layer, family by family — 230 new icons on the bodies the set already had:
documents, folders, people, chats, calendars, clocks, panels, layouts, alignment, lists,
text, arrows, chevrons, corners, git, clipboards, monitors, mail, databases, bells,
shields, clouds and charts. Lucide's names resolve here too: 100-odd of them became
aliases on the icons that already existed (file-plus is document-add, panel-left is
sidebar, cloud-download is download-cloud), so searching by the name you know finds the
drawing. 2,271 icons, 13,626 drawings. Same API.

## 0.4.1

Six icons redrawn so that no two in the set render the same: vote (a ballot going into
the box — it was stash's tray and arrow), agentic-rag (the retrieval loop — it was
agent-search's lens), taint (the alert as a badge on the node — it was model-alert
without the chamfer), semantic (a speech bubble with two waves — it was mcp with one end
rounded), command (the return arrow — it was cli one unit over) and priority (two
chevrons up — it was arrow-up's arrow over more-vertical's column). Same names, same API.

## 0.4.0

One thousand new icons — the set grows from 1,041 to 2,041 (12,246 drawings): the generative
stack, agents at their desks, the furniture of a screen, keys, pins, flags and targets with the
mark that qualifies them. Every icon description is now a full sentence written for search.
Unused icons are still tree-shaken out of release builds.

## 0.3.3

Adds the example app: a small gallery with live variant, weight and size
controls — the whole API on one screen.

## 0.3.2

First release of `iconmind_flutter`: 1,041 icons × outline/duotone × three
weights, as tree-shakeable compile-time constants painted by a small
`CustomPaint` runtime. Version-aligned with the npm packages.
