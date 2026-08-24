# 02b — Icon Catalog

> **621 icon concept** konkret, siap dieksekusi. Dihasilkan otomatis dari `_data/catalog.py` oleh `_data/gen_catalog.py` — **jangan edit file ini dengan tangan**, edit datanya lalu jalankan ulang.
> Struktur & aturan penamaan: [02 — Icon Taxonomy](./02-icon-taxonomy.md). Target per phase: [CANON C6](./CANON.md#c6-angka-target-dipakai-di-doc-01-16-17).
>
> **Kolom deskripsi berbahasa Inggris** dan prosa di sekitarnya berbahasa Indonesia — itu disengaja. Deskripsi adalah **data yang dikirim ke produk**: ia menjadi field `description` di metadata icon, isi GitHub issue, dan keluaran MCP, jadi tunduk pada [CANON C11](./CANON.md#c11-kebijakan-bahasa). Prosanya catatan kerja internal.

---

## Cara Membaca

| Label | Arti | Waktu |
|-------|------|-------|
| `P1` | Phase 1 — 100 icon | Bulan 0–3 |
| `P2` | Phase 2 — 200 icon berikutnya | Bulan 4–6 |
| `P3` | Phase 3 — 200 icon berikutnya | Bulan 7–9 |
| `P4` | Phase 4 — 121 icon berikutnya | Bulan 10–12 |

Kumulatif: P1 = 100 · P2 = 300 · P3 = 500 · P4 = 621.

**Catatan penting**: target *shipped* bulan ke-12 adalah **1000 icon**, sedangkan katalog ini berisi **621**. Selisih **379** icon sengaja dibiarkan kosong — diisi dari GitHub issue request, query nol-hasil di situs, dan pelengkapan varian modifier (`-add` / `-check` / `-alert` / `-off`) untuk icon yang sudah ada. Mengunci 1000 nama sekarang berarti menebak permintaan yang belum ada datanya.

Semua slug di bawah **unik lintas domain** (dijamin oleh assertion di generator).

## Ringkasan per Domain

| Domain | Concept | P1 | P2 | P3 | P4 |
|--------|---------|----|----|----|----|
| [`ai`](#ai) — AI & LLM | 79 | 20 | 25 | 30 | 4 |
| [`agents`](#agents) — Agents | 70 | 16 | 24 | 25 | 5 |
| [`mcp`](#mcp) — MCP | 45 | 10 | 15 | 15 | 5 |
| [`rag`](#rag) — RAG & Search | 50 | 10 | 18 | 17 | 5 |
| [`data`](#data) — Data Engineering | 47 | 6 | 16 | 18 | 7 |
| [`devops`](#devops) — DevOps | 47 | 6 | 18 | 18 | 5 |
| [`cloud`](#cloud) — Cloud | 44 | 4 | 14 | 15 | 11 |
| [`security`](#security) — Security | 48 | 4 | 14 | 15 | 15 |
| [`automation`](#automation) — Automation | 38 | 4 | 14 | 12 | 8 |
| [`analytics`](#analytics) — Analytics | 39 | 4 | 11 | 12 | 12 |
| [`devtools`](#devtools) — Developer Tools | 54 | 6 | 18 | 16 | 14 |
| [`interface`](#interface) — Interface | 60 | 10 | 13 | 7 | 30 |
| **Total** | **621** | **100** | **200** | **200** | **121** |

---

<a id="ai"></a>

## `ai` — AI & LLM

79 concept · P1 20 · kumulatif P2 45 · kumulatif P3 75

### `model` (15)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `model` | Generic AI model | `P1` |
| `llm` | Large language model | `P1` |
| `model-add` | Add a model | `P2` |
| `model-check` | Model validated | `P2` |
| `model-alert` | Alert raised on a model | `P2` |
| `model-off` | Model disabled | `P2` |
| `model-deploy` | Deploying a model to production | `P2` |
| `foundation-model` | Large-scale foundation model | `P3` |
| `base-model` | Base model before tuning | `P3` |
| `instruct-model` | Instruction-tuned model | `P3` |
| `reasoning-model` | Reasoning model | `P3` |
| `small-language-model` | Small language model | `P3` |
| `llm-chat` | Chat interface to a model | `P3` |
| `model-swap` | Swap one model for another | `P3` |
| `model-download` | Download model weights | `P3` |

### `inference` (8)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `inference` | Running a model to produce output | `P1` |
| `temperature` | Randomness parameter for output | `P1` |
| `streaming-response` | Response streamed token by token | `P2` |
| `latency` | Response latency | `P2` |
| `throughput` | Throughput per second | `P2` |
| `inference-fast` | Low-latency inference | `P3` |
| `inference-batch` | Batched inference | `P3` |
| `cold-start` | Cold start | `P3` |

### `prompt` (9)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `prompt` | Instruction given to a model | `P1` |
| `chain-of-thought` | Step-by-step reasoning | `P1` |
| `system-prompt` | System-level instruction | `P1` |
| `prompt-template` | Parameterised prompt template | `P2` |
| `prompt-chain` | Chain of sequential prompts | `P2` |
| `few-shot` | Prompt that includes examples | `P2` |
| `zero-shot` | Prompt with no examples | `P2` |
| `user-prompt` | Input written by the user | `P2` |
| `prompt-library` | Library of saved prompts | `P3` |

### `token` (5)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `token` | Smallest unit of text | `P1` |
| `tokenizer` | Splits text into tokens | `P1` |
| `token-count` | Token count | `P2` |
| `token-limit` | Token limit | `P2` |
| `token-cost` | Cost per token | `P2` |

### `context` (4)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `context-window` | Span of tokens a model can see | `P1` |
| `context-full` | Context window at capacity | `P2` |
| `context-compress` | Compressing the context | `P2` |
| `context-overflow` | Context window overflowed | `P3` |

### `embedding` (6)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `embedding` | Vector representation of text | `P1` |
| `vector` | Numeric vector | `P1` |
| `embedding-model` | Model that produces embeddings | `P2` |
| `similarity` | Similarity between vectors | `P2` |
| `dimension` | Vector dimensionality | `P3` |
| `cosine-distance` | Cosine distance | `P3` |

### `training` (12)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `training` | Training a model | `P1` |
| `fine-tuning` | Adapting a model to a domain | `P1` |
| `dataset` | Collection of training data | `P1` |
| `checkpoint` | Training checkpoint | `P2` |
| `epoch` | One training epoch | `P2` |
| `loss-curve` | Training loss curve | `P2` |
| `quantization` | Reducing model weight precision | `P2` |
| `lora` | Lightweight training adapter | `P2` |
| `training-data` | Training data | `P3` |
| `gradient` | Optimisation gradient | `P3` |
| `distillation` | Distilling a model into a smaller one | `P3` |
| `pruning` | Pruning model weights | `P3` |

### `evaluation` (7)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `evaluation` | Measuring model quality | `P1` |
| `hallucination` | Confidently wrong model output | `P1` |
| `benchmark` | Performance benchmark | `P1` |
| `eval-suite` | Suite of evaluations | `P3` |
| `score-card` | Scorecard of results | `P3` |
| `human-eval` | Human evaluation | `P3` |
| `drift` | Model behaviour drifting over time | `P3` |

### `safety` (7)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `guardrail` | Constraint placed on model output | `P1` |
| `content-filter` | Content filter | `P3` |
| `safety-check` | Safety check | `P3` |
| `alignment` | Aligning a model to intended values | `P3` |
| `red-team` | Adversarial red-team testing | `P3` |
| `refusal` | Model refusing to answer | `P3` |
| `bias-check` | Bias check | `P3` |

### `multimodal` (6)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `multimodal` | Model spanning several modalities | `P1` |
| `vision-model` | Vision model | `P3` |
| `audio-model` | Audio model | `P4` |
| `image-generation` | Image generation | `P4` |
| `speech-to-text` | Speech to text | `P4` |
| `text-to-speech` | Text to speech | `P4` |

---

<a id="agents"></a>

## `agents` — Agents

70 concept · P1 16 · kumulatif P2 40 · kumulatif P3 65

### `agent-core` (7)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `agent` | Autonomous agent | `P1` |
| `agent-add` | Add an agent | `P2` |
| `agent-remove` | Remove an agent | `P2` |
| `agent-check` | Agent validated | `P2` |
| `agent-alert` | Alert raised on an agent | `P2` |
| `agent-off` | Agent disabled | `P2` |
| `agent-config` | Agent configuration | `P2` |

### `multi-agent` (10)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `multi-agent` | Several agents working together | `P1` |
| `supervisor` | Agent that supervises others | `P1` |
| `orchestrator` | Coordinator of multiple agents | `P2` |
| `agent-handoff` | Handoff between agents | `P2` |
| `agent-delegate` | Delegating a task | `P2` |
| `agent-team` | Team of agents | `P2` |
| `agent-swarm` | Swarm of agents | `P3` |
| `agent-hierarchy` | Agents arranged in tiers | `P3` |
| `router-agent` | Agent that routes work | `P3` |
| `worker-agent` | Worker agent | `P3` |

### `planning` (8)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `planner` | Component that builds the plan | `P1` |
| `plan` | Plan of work | `P1` |
| `goal` | Goal an agent works toward | `P1` |
| `subtask` | Subtask | `P1` |
| `task-graph` | Graph of task dependencies | `P2` |
| `decompose` | Breaking a task into parts | `P2` |
| `strategy` | Strategy for solving a task | `P3` |
| `objective` | Measurable objective | `P3` |

### `execution` (9)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `executor` | Component that carries out steps | `P1` |
| `action-step` | Action step | `P2` |
| `retry` | Retry | `P2` |
| `fallback` | Fallback path | `P2` |
| `loop-step` | Looping step | `P3` |
| `branch-step` | Branching step | `P3` |
| `timeout` | Step timeout | `P3` |
| `execute` | Executing a step | `P4` |
| `agent-sandbox` | Isolated environment for an agent | `P4` |

### `reflection` (5)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `reflection` | Agent evaluating its own output | `P1` |
| `self-critique` | Agent critiquing its own work | `P3` |
| `self-correct` | Agent correcting itself | `P3` |
| `verify-step` | Verifying a step | `P3` |
| `evaluate-step` | Scoring a step | `P4` |

### `memory` (9)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `memory` | Memory an agent writes to and reads back | `P1` |
| `memory-short-term` | Short-term memory | `P2` |
| `memory-long-term` | Long-term memory | `P2` |
| `memory-episodic` | Episodic memory | `P3` |
| `memory-semantic` | Semantic memory | `P3` |
| `memory-write` | Write to memory | `P3` |
| `memory-read` | Read from memory | `P3` |
| `memory-clear` | Clear memory | `P3` |
| `scratchpad` | Temporary working notes | `P3` |

### `tool-use` (6)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `tool-calling` | Invoking a tool | `P1` |
| `tool-registry` | Registry of available tools | `P2` |
| `tool-result` | Result returned by a tool | `P3` |
| `tool-error` | Tool call error | `P3` |
| `function-call` | Structured function invocation | `P3` |
| `tool-permission` | Permission to use a tool | `P3` |

### `communication` (6)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `human-approval` | Human approval | `P1` |
| `agent-message` | Message between agents | `P3` |
| `agent-broadcast` | Broadcast to every agent | `P3` |
| `agent-inbox` | Agent inbox | `P3` |
| `agent-protocol` | Protocol between agents | `P4` |
| `agent-negotiation` | Negotiation between agents | `P4` |

### `lifecycle` (10)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `agent-run` | Start an agent | `P1` |
| `agent-stop` | Stop an agent | `P1` |
| `agent-thinking` | Agent is thinking | `P1` |
| `agent-log` | Log of agent activity | `P1` |
| `agent-pause` | Pause an agent | `P2` |
| `agent-state` | Agent state | `P2` |
| `agent-idle` | Agent is idle | `P2` |
| `agent-working` | Agent is working | `P2` |
| `agent-blocked` | Agent is blocked | `P2` |
| `agent-done` | Agent has finished | `P2` |

---

<a id="mcp"></a>

## `mcp` — MCP

45 concept · P1 10 · kumulatif P2 25 · kumulatif P3 40

### `server` (6)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `mcp` | Model Context Protocol | `P1` |
| `mcp-server` | MCP server | `P1` |
| `mcp-server-add` | Add an MCP server | `P2` |
| `mcp-server-check` | MCP server validated | `P2` |
| `mcp-server-alert` | Alert on an MCP server | `P2` |
| `mcp-server-off` | MCP server disabled | `P2` |

### `client` (3)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `mcp-client` | MCP client | `P1` |
| `mcp-connection` | MCP connection | `P1` |
| `mcp-handshake` | Protocol handshake | `P2` |

### `resource` (7)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `mcp-resource` | Data an MCP server exposes | `P1` |
| `mcp-resource-list` | List of resources | `P2` |
| `mcp-resource-read` | Read a resource | `P2` |
| `mcp-resource-add` | Add a resource | `P2` |
| `mcp-root` | Exposed root directory | `P3` |
| `mcp-resource-template` | Resource URI template | `P3` |
| `mcp-resource-subscribe` | Subscription to changes | `P3` |

### `tool` (7)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `mcp-tool` | Capability an MCP server exposes | `P1` |
| `mcp-tool-call` | Calling an MCP tool | `P1` |
| `mcp-tool-result` | Result from an MCP tool | `P2` |
| `mcp-tool-error` | MCP tool error | `P2` |
| `mcp-tool-schema` | Tool input schema | `P2` |
| `mcp-tool-add` | Add a tool | `P3` |
| `mcp-tool-permission` | Tool permission | `P3` |

### `prompt` (4)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `mcp-prompt` | Prompt template an MCP server exposes | `P1` |
| `mcp-prompt-list` | List of prompts | `P2` |
| `mcp-prompt-add` | Add a prompt | `P3` |
| `mcp-prompt-argument` | Prompt argument | `P4` |

### `transport` (9)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `mcp-capability` | Negotiated capability | `P1` |
| `mcp-transport` | Transport layer | `P2` |
| `mcp-stdio` | Stdio transport | `P2` |
| `mcp-http` | HTTP transport | `P2` |
| `mcp-sse` | Server-sent events transport | `P3` |
| `mcp-websocket` | WebSocket transport | `P3` |
| `mcp-session` | MCP session | `P3` |
| `mcp-initialize` | Session initialisation | `P3` |
| `mcp-notification` | Protocol notification | `P3` |

### `sampling` (5)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `mcp-sampling` | Sampling request sent to the client | `P3` |
| `mcp-completion` | Argument completion | `P3` |
| `mcp-progress` | Operation progress | `P3` |
| `mcp-cancel` | Operation cancelled | `P3` |
| `mcp-logging` | Protocol log | `P4` |

### `registry` (4)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `mcp-config` | MCP configuration | `P1` |
| `mcp-registry` | Directory of MCP servers | `P4` |
| `mcp-manifest` | Server manifest | `P4` |
| `mcp-inspector` | MCP inspection tool | `P4` |

---

<a id="rag"></a>

## `rag` — RAG & Search

50 concept · P1 10 · kumulatif P2 28 · kumulatif P3 45

### `ingestion` (10)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `document` | Source document | `P1` |
| `ingestion` | Ingesting data into the system | `P2` |
| `loader` | Document loader | `P2` |
| `document-parse` | Parsing a document | `P2` |
| `document-split` | Splitting a document | `P2` |
| `crawler` | Content crawler | `P3` |
| `extractor` | Data extractor | `P3` |
| `ocr` | Optical character recognition | `P3` |
| `ingestion-pipeline` | Ingestion pipeline | `P3` |
| `document-add` | Add a document | `P3` |

### `chunking` (7)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `chunk` | Chunk of a document | `P1` |
| `chunk-overlap` | Content shared between consecutive chunks | `P2` |
| `chunk-size` | Chunk size | `P2` |
| `semantic-chunk` | Chunking by meaning | `P2` |
| `chunk-add` | Add a chunk | `P3` |
| `chunk-strategy` | Chunking strategy | `P3` |
| `recursive-split` | Recursive splitting | `P3` |

### `retrieval` (9)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `retriever` | Component that retrieves documents | `P1` |
| `semantic-search` | Semantic search | `P1` |
| `vector-search` | Vector search | `P1` |
| `hybrid-search` | Hybrid keyword and vector search | `P2` |
| `keyword-search` | Keyword search | `P2` |
| `similarity-search` | Similarity search | `P2` |
| `top-k` | Take the top k results | `P2` |
| `recall` | Recall of relevant results | `P3` |
| `precision` | Precision of results | `P3` |

### `ranking` (6)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `reranker` | Model that reorders results by relevance | `P1` |
| `rerank` | Reordering results | `P2` |
| `relevance-score` | Relevance score | `P2` |
| `cross-encoder` | Cross-encoder that ranks pairs | `P3` |
| `mmr` | Maximal marginal relevance | `P3` |
| `filter-result` | Filtering results | `P3` |

### `vector` (7)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `vector-database` | Database for storing and searching vectors | `P1` |
| `vector-index` | Vector index | `P2` |
| `vector-query` | Vector query | `P2` |
| `vector-upsert` | Insert or update a vector | `P2` |
| `hnsw` | Hierarchical navigable small world index | `P3` |
| `namespace` | Vector namespace | `P3` |
| `collection` | Collection of vectors | `P3` |

### `knowledge` (5)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `knowledge-base` | Knowledge base | `P1` |
| `knowledge-graph` | Knowledge graph | `P2` |
| `document-store` | Document store | `P3` |
| `corpus` | Text corpus | `P4` |
| `content-freshness` | How recent the content is | `P4` |

### `grounding` (6)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `rag-pipeline` | End-to-end RAG pipeline | `P1` |
| `source-citation` | Citation of a source | `P1` |
| `grounding` | Grounding an answer in sources | `P2` |
| `citation-link` | Link to a cited source | `P4` |
| `context-injection` | Injecting retrieved context | `P4` |
| `answer-synthesis` | Synthesising an answer from sources | `P4` |

---

<a id="data"></a>

## `data` — Data Engineering

47 concept · P1 6 · kumulatif P2 22 · kumulatif P3 40

### `pipeline` (7)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `pipeline` | Data processing pipeline | `P1` |
| `etl` | Extract, transform, load | `P1` |
| `pipeline-run` | Pipeline run | `P2` |
| `pipeline-fail` | Pipeline failed | `P2` |
| `elt` | Extract, load, transform | `P2` |
| `batch-job` | Batch job | `P2` |
| `stream-job` | Streaming job | `P3` |

### `transform` (9)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `transform` | Data transformation | `P2` |
| `aggregate` | Aggregating data | `P2` |
| `join-data` | Joining data | `P2` |
| `deduplicate` | Removing duplicates | `P2` |
| `map-step` | Map step | `P3` |
| `filter-step` | Filter step | `P3` |
| `normalize` | Normalising data | `P3` |
| `enrich` | Enriching data | `P3` |
| `schema-map` | Schema mapping | `P3` |

### `storage` (9)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `data-warehouse` | Data warehouse | `P1` |
| `data-lake` | Data lake | `P2` |
| `table` | Data table | `P2` |
| `schema` | Data schema | `P2` |
| `lakehouse` | Lakehouse | `P3` |
| `partition` | Table partition | `P3` |
| `column` | Table column | `P3` |
| `row` | Table row | `P3` |
| `index-data` | Data index | `P3` |

### `streaming` (8)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `stream` | Stream of data | `P1` |
| `event-stream` | Event stream | `P2` |
| `message-queue` | Message queue | `P2` |
| `topic` | Message topic | `P3` |
| `producer` | Message producer | `P3` |
| `consumer` | Message consumer | `P3` |
| `offset` | Stream read offset | `P4` |
| `backpressure` | Backpressure in a stream | `P4` |

### `quality` (6)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `data-quality` | Data quality | `P1` |
| `data-validation` | Data validation | `P2` |
| `null-check` | Null check | `P3` |
| `anomaly-data` | Data anomaly | `P3` |
| `freshness-check` | Freshness check | `P3` |
| `data-contract` | Data contract | `P4` |

### `catalog` (6)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `lineage` | Data lineage | `P2` |
| `data-catalog` | Data catalog | `P2` |
| `metadata-store` | Metadata store | `P4` |
| `data-owner` | Data owner | `P4` |
| `data-tag` | Data tag | `P4` |
| `governance` | Data governance | `P4` |

### `orchestration` (2)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `dag` | Directed acyclic graph of tasks | `P1` |
| `task-node` | Task node | `P3` |

---

<a id="devops"></a>

## `devops` — DevOps

47 concept · P1 6 · kumulatif P2 24 · kumulatif P3 42

### `ci-cd` (6)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `build` | Build process | `P1` |
| `deploy` | Deploying an application | `P1` |
| `build-fail` | Build failed | `P2` |
| `build-pass` | Build passed | `P2` |
| `pipeline-ci` | Continuous integration pipeline | `P2` |
| `cache-build` | Build cache | `P3` |

### `container` (8)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `container` | Container | `P1` |
| `container-image` | Container image | `P2` |
| `container-run` | Run a container | `P2` |
| `container-stop` | Stop a container | `P2` |
| `registry-image` | Image registry | `P2` |
| `layer` | Image layer | `P3` |
| `volume` | Data volume | `P3` |
| `container-file` | Container definition file | `P3` |

### `orchestration` (9)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `cluster` | Cluster | `P1` |
| `pod` | Pod | `P2` |
| `replica` | Replica | `P2` |
| `autoscale` | Autoscaling | `P2` |
| `load-balancer` | Load balancer | `P2` |
| `node-cluster` | Cluster node | `P3` |
| `service-mesh` | Service mesh | `P3` |
| `ingress` | Cluster ingress | `P3` |
| `namespace-cluster` | Cluster namespace | `P3` |

### `infrastructure` (5)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `environment` | Deployment environment | `P3` |
| `infrastructure` | Infrastructure | `P3` |
| `infra-plan` | Planned infrastructure change | `P3` |
| `provision` | Provisioning resources | `P3` |
| `config-drift` | Configuration drift | `P3` |

### `observability` (8)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `observability` | System observability | `P1` |
| `log-stream` | Log stream | `P2` |
| `trace-span` | Trace span | `P2` |
| `metric-point` | Metric data point | `P2` |
| `alert-rule` | Alerting rule | `P2` |
| `health-check` | Health check | `P3` |
| `uptime` | Uptime | `P3` |
| `dashboard-ops` | Operations dashboard | `P4` |

### `incident` (6)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `incident` | Production incident | `P1` |
| `on-call` | On-call rotation | `P3` |
| `postmortem` | Post-incident review | `P4` |
| `runbook` | Incident runbook | `P4` |
| `rollback` | Rolling back to a known state | `P4` |
| `sla` | Service level agreement | `P4` |

### `release` (5)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `artifact` | Build artifact | `P2` |
| `deploy-rollback` | Rolling back a deployment | `P2` |
| `release-tag` | Release tag | `P2` |
| `blue-green` | Blue-green release | `P3` |
| `canary` | Canary release | `P3` |

---

<a id="cloud"></a>

## `cloud` — Cloud

44 concept · P1 4 · kumulatif P2 18 · kumulatif P3 33

### `compute` (16)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `cloud` | Cloud | `P1` |
| `gpu` | Graphics processing unit | `P1` |
| `instance` | Compute instance | `P2` |
| `vm` | Virtual machine | `P2` |
| `cpu` | Central processing unit | `P2` |
| `gpu-cluster` | GPU cluster | `P2` |
| `cloud-add` | Add a cloud resource | `P3` |
| `cloud-check` | Cloud resource validated | `P3` |
| `cloud-alert` | Cloud alert | `P3` |
| `cloud-off` | Cloud resource disabled | `P3` |
| `multi-cloud` | Multiple cloud providers | `P3` |
| `hybrid-cloud` | Hybrid cloud | `P3` |
| `private-cloud` | Private cloud | `P3` |
| `bare-metal` | Bare-metal server | `P3` |
| `memory-ram` | Working memory | `P3` |
| `tpu` | Tensor processing unit | `P3` |

### `storage` (8)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `storage-bucket` | Storage bucket | `P1` |
| `object-store` | Object storage | `P2` |
| `block-storage` | Block storage | `P2` |
| `backup` | Backup | `P2` |
| `snapshot` | Volume snapshot | `P2` |
| `cdn` | Content delivery network | `P2` |
| `file-storage` | File storage | `P4` |
| `archive` | Cold archive | `P4` |

### `network` (8)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `network` | Network | `P2` |
| `firewall-cloud` | Network firewall | `P2` |
| `gateway` | Network gateway | `P2` |
| `vpc` | Virtual private cloud | `P4` |
| `subnet` | Subnet | `P4` |
| `dns` | Domain name system | `P4` |
| `private-link` | Private link | `P4` |
| `egress` | Egress traffic | `P4` |

### `serverless` (3)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `serverless` | Serverless | `P1` |
| `function-cloud` | Serverless function | `P2` |
| `cold-boot` | Function cold boot | `P4` |

### `edge` (3)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `edge-node` | Edge node | `P3` |
| `edge-function` | Edge function | `P3` |
| `edge-cache` | Edge cache | `P4` |

### `region` (3)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `region` | Region | `P2` |
| `availability-zone` | Availability zone | `P3` |
| `replication-geo` | Cross-region replication | `P4` |

### `cost` (3)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `cost-cloud` | Cloud cost | `P3` |
| `budget-alert` | Budget alert | `P3` |
| `usage-quota` | Usage quota | `P4` |

---

<a id="security"></a>

## `security` — Security

48 concept · P1 4 · kumulatif P2 18 · kumulatif P3 33

### `auth` (10)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `auth` | Authentication | `P1` |
| `login` | Sign in | `P2` |
| `logout` | Sign out | `P2` |
| `mfa` | Multi-factor authentication | `P2` |
| `api-key` | API key | `P2` |
| `session-token` | Session token | `P2` |
| `sso` | Single sign-on | `P3` |
| `oauth` | Delegated authorisation | `P3` |
| `passkey` | Passkey | `P3` |
| `service-account` | Service account | `P3` |

### `secret` (6)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `secret` | Application secret | `P1` |
| `secret-vault` | Secret vault | `P2` |
| `secret-rotate` | Rotating a secret | `P2` |
| `certificate` | Certificate | `P2` |
| `secret-leak` | Leaked secret | `P3` |
| `credential` | Credential | `P3` |

### `encryption` (8)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `encryption` | Encryption | `P1` |
| `encrypt` | Encrypt | `P2` |
| `decrypt` | Decrypt | `P2` |
| `key-pair` | Key pair | `P3` |
| `hash` | Hash value | `P3` |
| `signature` | Digital signature | `P3` |
| `tls` | Transport layer security | `P4` |
| `end-to-end` | End-to-end encryption | `P4` |

### `policy` (7)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `permission` | Access permission | `P2` |
| `audit-log` | Audit log | `P2` |
| `rbac` | Role-based access control | `P3` |
| `role` | Role | `P3` |
| `access-grant` | Granting access | `P3` |
| `access-deny` | Denying access | `P3` |
| `policy` | Security policy | `P4` |

### `threat` (8)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `vulnerability` | Vulnerability | `P2` |
| `threat` | Threat | `P3` |
| `cve` | Catalogued vulnerability | `P4` |
| `malware` | Malware | `P4` |
| `intrusion` | Intrusion | `P4` |
| `firewall` | Firewall | `P4` |
| `ddos` | Denial-of-service attack | `P4` |
| `patch` | Security patch | `P4` |

### `compliance` (2)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `compliance` | Compliance | `P4` |
| `compliance-report` | Compliance report | `P4` |

### `ai-security` (7)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `prompt-injection` | Prompt injection | `P1` |
| `jailbreak` | Jailbreaking a model's guardrails | `P2` |
| `pii-redaction` | Redacting personal data | `P3` |
| `data-exfiltration` | Data exfiltration | `P4` |
| `model-poisoning` | Poisoning a model's training data | `P4` |
| `output-sanitize` | Sanitising model output | `P4` |
| `llm-firewall` | Firewall for model traffic | `P4` |

---

<a id="automation"></a>

## `automation` — Automation

38 concept · P1 4 · kumulatif P2 18 · kumulatif P3 30

### `workflow` (7)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `workflow` | Workflow | `P1` |
| `workflow-run` | Run a workflow | `P2` |
| `workflow-add` | Add a workflow | `P2` |
| `workflow-pause` | Pause a workflow | `P2` |
| `workflow-stop` | Stop a workflow | `P2` |
| `workflow-fail` | Workflow run failed | `P2` |
| `workflow-template` | Workflow template | `P3` |

### `trigger` (6)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `trigger` | Trigger | `P1` |
| `trigger-webhook` | Webhook trigger | `P2` |
| `trigger-schedule` | Scheduled trigger | `P2` |
| `trigger-event` | Event trigger | `P2` |
| `trigger-manual` | Manual trigger | `P3` |
| `trigger-file` | File trigger | `P3` |

### `condition` (7)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `condition` | Condition | `P1` |
| `branch` | Branch | `P2` |
| `loop` | Loop | `P2` |
| `delay` | Delay | `P2` |
| `switch-case` | Switch between several paths | `P3` |
| `retry-policy` | Retry policy | `P3` |
| `error-handler` | Error handler | `P3` |

### `action` (6)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `action` | Action | `P1` |
| `action-http` | HTTP request action | `P3` |
| `action-email` | Send email action | `P3` |
| `action-notify` | Notification action | `P3` |
| `action-script` | Run script action | `P4` |
| `action-database` | Database action | `P4` |

### `schedule` (4)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `schedule` | Schedule | `P2` |
| `cron` | Cron schedule | `P3` |
| `recurring` | Recurring | `P4` |
| `calendar-run` | Runs on a calendar | `P4` |

### `integration` (5)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `integration` | Integration | `P2` |
| `connector` | Connector | `P3` |
| `webhook` | Webhook | `P4` |
| `api-bridge` | API bridge | `P4` |
| `sync-two-way` | Two-way sync | `P4` |

### `human-loop` (3)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `human-in-the-loop` | Human in the loop | `P2` |
| `wait-approval` | Waiting for approval | `P3` |
| `approval-step` | Approval step | `P4` |

---

<a id="analytics"></a>

## `analytics` — Analytics

39 concept · P1 4 · kumulatif P2 15 · kumulatif P3 27

### `chart` (8)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `chart-line` | Line chart | `P1` |
| `chart-bar` | Bar chart | `P1` |
| `chart-area` | Area chart | `P2` |
| `chart-pie` | Pie chart | `P2` |
| `chart-funnel` | Funnel chart | `P2` |
| `chart-scatter` | Scatter chart | `P3` |
| `chart-heatmap` | Heatmap | `P3` |
| `sparkline` | Sparkline | `P3` |

### `metric` (8)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `metric` | Metric | `P1` |
| `kpi` | Key performance indicator | `P2` |
| `trend-up` | Upward trend | `P2` |
| `trend-down` | Downward trend | `P2` |
| `counter` | Counter | `P3` |
| `gauge` | Gauge | `P3` |
| `comparison` | Comparison | `P3` |
| `percentile` | Percentile | `P3` |

### `dashboard` (7)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `dashboard` | Dashboard | `P1` |
| `report` | Report | `P2` |
| `widget` | Dashboard widget | `P2` |
| `export-report` | Export a report | `P3` |
| `filter-analytics` | Analytics filter | `P3` |
| `date-range` | Date range | `P3` |
| `drilldown` | Drill down into detail | `P4` |

### `segment` (6)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `segment` | User segment | `P2` |
| `cohort` | Cohort | `P3` |
| `user-journey` | User journey | `P4` |
| `retention` | Retention | `P4` |
| `churn` | Churn | `P4` |
| `conversion` | Conversion | `P4` |

### `experiment` (5)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `experiment` | Experiment | `P2` |
| `ab-test` | A/B test | `P4` |
| `variant` | Test variant | `P4` |
| `significance` | Statistical significance | `P4` |
| `feature-flag` | Feature flag | `P4` |

### `llm-observability` (5)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `llm-trace` | Trace of a model call | `P2` |
| `token-usage` | Token usage | `P3` |
| `cost-per-request` | Cost per request | `P4` |
| `prompt-analytics` | Prompt analytics | `P4` |
| `model-comparison` | Model comparison | `P4` |

---

<a id="devtools"></a>

## `devtools` — Developer Tools

54 concept · P1 6 · kumulatif P2 24 · kumulatif P3 40

### `code` (8)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `code` | Code | `P1` |
| `code-block` | Code block | `P2` |
| `code-diff` | Code diff | `P2` |
| `snippet` | Code snippet | `P2` |
| `format-code` | Code formatting | `P2` |
| `code-review` | Code review | `P3` |
| `refactor` | Refactor | `P3` |
| `syntax` | Syntax | `P3` |

### `terminal` (6)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `terminal` | Terminal | `P1` |
| `command` | Command | `P2` |
| `shell` | Shell | `P2` |
| `script-run` | Run a script | `P3` |
| `process` | Process | `P3` |
| `environment-var` | Environment variable | `P3` |

### `version-control` (8)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `branch-git` | Repository branch | `P1` |
| `commit` | Commit | `P2` |
| `merge` | Merge | `P2` |
| `pull-request` | Pull request | `P2` |
| `tag-git` | Version tag | `P3` |
| `fork` | Fork | `P3` |
| `clone` | Clone a repository | `P3` |
| `conflict` | Merge conflict | `P3` |

### `package` (7)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `package` | Package | `P1` |
| `dependency` | Dependency | `P2` |
| `install` | Install | `P2` |
| `lockfile` | Lockfile | `P3` |
| `version-bump` | Version bump | `P3` |
| `monorepo` | Monorepo | `P3` |
| `workspace` | Workspace | `P3` |

### `debug` (7)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `debug` | Debugger | `P1` |
| `breakpoint` | Breakpoint | `P2` |
| `stack-trace` | Stack trace | `P2` |
| `step-over` | Step over | `P3` |
| `watch-variable` | Watch a variable | `P3` |
| `profiler` | Profiler | `P4` |
| `memory-leak` | Memory leak | `P4` |

### `api` (8)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `api` | Application programming interface | `P1` |
| `endpoint` | API endpoint | `P2` |
| `request` | Request | `P2` |
| `response` | Response | `P2` |
| `status-code` | Status code | `P4` |
| `rate-limit` | Rate limit | `P4` |
| `openapi` | OpenAPI specification | `P4` |
| `graphql-node` | GraphQL node | `P4` |

### `testing` (6)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `test-unit` | Unit test | `P2` |
| `coverage` | Test coverage | `P2` |
| `test-e2e` | End-to-end test | `P4` |
| `assertion` | Assertion | `P4` |
| `mock` | Mock | `P4` |
| `flaky-test` | Flaky test | `P4` |

### `editor` (4)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `editor-tab` | Editor tab | `P4` |
| `editor-split` | Split editor pane | `P4` |
| `autocomplete` | Autocomplete | `P4` |
| `inline-suggestion` | Inline suggestion | `P4` |

---

<a id="interface"></a>

## `interface` — Interface

60 concept · P1 10 · kumulatif P2 23 · kumulatif P3 30

### `arrow` (10)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `chevron-right` | Chevron right | `P1` |
| `chevron-down` | Chevron down | `P1` |
| `arrow-up` | Arrow up | `P2` |
| `arrow-down` | Arrow down | `P2` |
| `arrow-left` | Arrow left | `P2` |
| `arrow-right` | Arrow right | `P2` |
| `chevron-up` | Chevron up | `P2` |
| `chevron-left` | Chevron left | `P2` |
| `arrow-external` | External link | `P4` |
| `arrow-back` | Back | `P4` |

### `action` (18)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `check` | Check | `P1` |
| `close` | Close | `P1` |
| `plus` | Add | `P1` |
| `minus` | Remove | `P1` |
| `search` | Search | `P1` |
| `settings` | Settings | `P1` |
| `edit` | Edit | `P2` |
| `trash` | Delete | `P2` |
| `copy` | Copy | `P2` |
| `download` | Download | `P2` |
| `upload` | Upload | `P2` |
| `filter` | Filter | `P2` |
| `refresh` | Refresh | `P2` |
| `link` | Link | `P4` |
| `share` | Share | `P4` |
| `sort` | Sort | `P4` |
| `more-horizontal` | More options, horizontal | `P4` |
| `more-vertical` | More options, vertical | `P4` |

### `state` (10)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `loading` | Loading | `P1` |
| `warning` | Warning | `P1` |
| `success` | Success | `P3` |
| `error` | Error | `P3` |
| `info` | Information | `P3` |
| `help` | Help | `P4` |
| `lock-ui` | Locked | `P4` |
| `star` | Star | `P4` |
| `bookmark` | Bookmark | `P4` |
| `pin` | Pin | `P4` |

### `layout` (8)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `sidebar` | Sidebar | `P3` |
| `grid-view` | Grid view | `P3` |
| `list-view` | List view | `P3` |
| `panel` | Panel | `P4` |
| `expand` | Expand | `P4` |
| `collapse` | Collapse | `P4` |
| `fullscreen` | Fullscreen | `P4` |
| `drag-handle` | Drag handle | `P4` |

### `media` (3)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `image` | Image | `P4` |
| `video` | Video | `P4` |
| `audio` | Audio | `P4` |

### `file` (3)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `file` | File | `P3` |
| `folder` | Folder | `P4` |
| `file-code` | Code file | `P4` |

### `time` (3)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `calendar` | Calendar | `P4` |
| `clock` | Clock | `P4` |
| `timer` | Timer | `P4` |

### `communication` (5)

| Slug | Deskripsi | Phase |
|------|-----------|-------|
| `user` | User | `P4` |
| `bell` | Notification bell | `P4` |
| `users` | Users | `P4` |
| `mail` | Email | `P4` |
| `message` | Message | `P4` |

---

## Bagaimana Katalog Ini Dipakai

1. **Backlog issue otomatis.** Script `scripts/generate/issues.ts` ([05](./05-repository-architecture.md)) membaca `catalog.py` dan membuat satu GitHub Issue `good first issue` untuk setiap slug yang belum punya file SVG.
2. **Batch prompt AI.** Generator prompt ([04](./04-ai-generation-workflow.md)) mengambil slug + deskripsi + sub-kategori dari sini sebagai input.
3. **Pengecekan cakupan.** CI membandingkan slug di katalog dengan file di `packages/icons/icons/` dan melaporkan progres per phase ke README.
4. **Halaman roadmap.** `/roadmap` di situs ([08](./08-website.md)) di-render dari data yang sama, sehingga progres publik tidak pernah basi.

Satu sumber data, empat konsumen — inilah alasan katalog disimpan sebagai data, bukan sebagai prosa.
