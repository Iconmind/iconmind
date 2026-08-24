# 02 — Icon Taxonomy

> Daftar icon konkret ada di [02b — Icon Catalog](./02b-icon-catalog.md). Dokumen ini menjelaskan **strukturnya**.
> Urutan dan nama domain mengikuti [CANON C5](./CANON.md#c5-taksonomi--12-domain-urutan-baku).

---

## 2.1 Kenapa Taksonomi Adalah Aset Utama

Taksonomi menentukan tiga hal yang mahal untuk diubah belakangan: URL kategori, nama file, dan struktur package. Salah di awal berarti breaking change untuk semua pengguna.

Selain itu — ini poin strategis dari [01](./01-product-vision.md#19-long-term-vision-tahun-23) — **daftar nama kanonik untuk konsep AI mungkin lebih bernilai jangka panjang daripada file SVG-nya**. Kalau industri menyepakati bahwa konsep itu bernama `context-window` dan bukan `token-limit`, IconMind yang menetapkannya.

## 2.2 Aturan Struktur

**Kedalaman maksimum 2 tingkat: `domain / sub-kategori`.** Tidak ada tingkat ketiga. Tiga tingkat membuat browsing melelahkan dan URL panjang.
 
**Satu icon = tepat satu domain.** Domain menentukan lokasi file dan URL kategori. Icon yang relevan di banyak tempat ditemukan lewat **tags**, bukan lewat kategori ganda ([07](./07-metadata-system.md)). Ini keputusan penting: kategori ganda berarti file ganda atau symlink, dan keduanya merusak prinsip *source of truth = filesystem*.

**Sub-kategori hanya untuk navigasi, tidak untuk path file.** File tetap di `packages/icons/icons/<domain>/<slug>.svg`. Sub-kategori disimpan di metadata. Alasan: memindahkan icon antar sub-kategori tidak boleh mengubah path file (yang akan memecah import pengguna).

**Domain harus stabil.** Menambah domain baru = keputusan besar (URL baru, section baru di situs). Menambah sub-kategori = keputusan kecil.

## 2.3 Dua Belas Domain

| # | Domain | Slug | Cakupan | Alasan keberadaan |
|---|--------|------|---------|-------------------|
| 1 | **AI & LLM** | `ai` | Model, inference, prompt, token, embedding, training, evaluation, safety | Inti diferensiasi. Kosakata paling kosong di library lain. |
| 2 | **Agents** | `agents` | Agent tunggal & multi, planning, memory, tool use, orkestrasi | Kategori paling cepat tumbuh di 2025–2026. |
| 3 | **MCP** | `mcp` | Server, client, resource, tool, prompt, transport, sampling | Tidak ada satu pun library punya ini. Keunggulan mutlak. |
| 4 | **RAG & Search** | `rag` | Chunking, retrieval, reranking, vector & semantic search, knowledge base | Domain teknis dengan konsep yang sangat spesifik. |
| 5 | **Data Engineering** | `data` | Pipeline, ETL, warehouse, streaming, quality, catalog | Menjembatani audiens AI dan data. |
| 6 | **DevOps** | `devops` | CI/CD, container, orchestration, IaC, observability, incident | Volume pemakaian tinggi, memperluas basis pengguna. |
| 7 | **Cloud** | `cloud` | Compute, storage, network, serverless, edge, region | Pasangan alami DevOps. |
| 8 | **Security** | `security` | Auth, secret, encryption, policy, threat, compliance, AI security | AI security (prompt injection, jailbreak) adalah sub-niche yang benar-benar kosong. |
| 9 | **Automation** | `automation` | Workflow, trigger, condition, schedule, integration, human-in-the-loop | Kosakata bersama no-code/low-code dan agent. |
| 10 | **Analytics** | `analytics` | Chart, metric, dashboard, funnel, experiment, LLM observability | Setiap produk SaaS butuh ini. |
| 11 | **Developer Tools** | `devtools` | Code, terminal, VCS, package, debug, API, testing, editor | Volume pemakaian tertinggi. Pintu masuk pengguna baru. |
| 12 | **Interface** | `interface` | Arrow, action, state, layout, media, file, communication | Bukan diferensiator, tapi **wajib** — set icon tanpa `check` dan `chevron-right` tidak bisa dipakai sendirian. |

**Kenapa `interface` ada padahal Lucide sudah punya?** Karena pengguna yang memasang IconMind untuk icon AI tetap butuh `close` dan `search` di layar yang sama, dan mencampur dua library berarti dua dependency serta dua bahasa visual. Domain ini disengaja **tipis** — hanya primitif yang benar-benar sering dipakai, bukan mengejar kelengkapan Lucide.

## 2.4 Peta Sub-Kategori

Setiap baris menjadi satu section di halaman `/categories/[domain]`.

**`ai`** — model · inference · prompt · token · context · embedding · training · evaluation · safety · multimodal
**`agents`** — agent-core · multi-agent · planning · execution · reflection · memory · tool-use · communication · lifecycle
**`mcp`** — server · client · resource · tool · prompt · transport · sampling · registry
**`rag`** — ingestion · chunking · retrieval · ranking · vector · knowledge · grounding
**`data`** — pipeline · transform · storage · streaming · quality · catalog · orchestration
**`devops`** — ci-cd · container · orchestration · infrastructure · observability · incident · release
**`cloud`** — compute · storage · network · serverless · edge · region · cost
**`security`** — auth · secret · encryption · policy · threat · compliance · ai-security
**`automation`** — workflow · trigger · condition · action · schedule · integration · human-loop
**`analytics`** — chart · metric · dashboard · segment · experiment · llm-observability
**`devtools`** — code · terminal · version-control · package · debug · api · testing · editor
**`interface`** — arrow · action · state · layout · media · file · time · communication

## 2.5 Prinsip Penamaan Icon

Aturan format ada di [CANON C9](./CANON.md#c9-konvensi-penamaan). Aturan *pemilihan kata*:

| Aturan | Ya | Tidak |
|--------|-----|-------|
| Pakai istilah domain yang sesungguhnya | `reranker` | `sort-smart` |
| Konkret sebelum abstrak | `vector-database` | `data-thing` |
| Tanpa singkatan kecuali sudah standar industri | `llm`, `api`, `ci-cd`, `mcp` | `ctx`, `emb`, `agt` |
| Kata benda, bukan kalimat | `tool-calling` | `agent-calls-a-tool` |
| Modifier di belakang | `agent-memory` | `memory-agent` |
| Tanpa nama brand | `vector-database` | `pinecone` |
| Tanpa nomor versi | `model` | `model-v2` |

**Pola varian**: `<base>-<modifier>`. Modifier baku: `-add`, `-remove`, `-check`, `-alert`, `-off`, `-lock`, `-search`, `-sync`.
Contoh: `agent`, `agent-add`, `agent-check`, `agent-alert`, `agent-off`.

Konsistensi modifier ini penting untuk *predictability*: pengguna yang tahu `agent-add` ada akan menebak `workflow-add` juga ada — dan tebakannya harus benar.

## 2.6 Roadmap Coverage per Domain

Target *shipped* mengikuti [CANON C6](./CANON.md#c6-angka-target-dipakai-di-doc-01-16-17).
**Semua angka bersifat kumulatif** — kolom `s/d M6` berarti total icon yang sudah terbit pada akhir bulan ke-6, bukan tambahan di kuartal itu.

| Domain | s/d M3 | s/d M6 | s/d M9 | s/d M12 |
|--------|--------|--------|--------|---------|
| `ai` | 20 | 45 | 75 | 150 |
| `agents` | 16 | 40 | 65 | 130 |
| `mcp` | 10 | 25 | 40 | 70 |
| `rag` | 10 | 28 | 45 | 90 |
| `data` | 6 | 22 | 40 | 85 |
| `devops` | 6 | 24 | 42 | 90 |
| `cloud` | 4 | 18 | 33 | 75 |
| `security` | 4 | 18 | 33 | 75 |
| `automation` | 4 | 18 | 30 | 65 |
| `analytics` | 4 | 15 | 27 | 60 |
| `devtools` | 6 | 24 | 40 | 60 |
| `interface` | 10 | 23 | 30 | 50 |
| **Total** | **100** | **300** | **500** | **1000** |

Empat domain teratas (`ai`, `agents`, `mcp`, `rag`) mengambil **44%** dari total — itu disengaja dan mencerminkan positioning di [01](./01-product-vision.md#14-kenapa-library-yang-ada-tidak-cukup).

## 2.7 Aturan Prioritas

Ketika harus memilih icon mana yang dikerjakan lebih dulu, urutannya:

1. **Icon yang diminta pengguna** (GitHub issue dengan ≥3 👍) — bukti permintaan nyata mengalahkan tebakan.
2. **Icon yang melengkapi set** — kalau `agent-add` ada tapi `agent-remove` tidak, set itu terasa rusak.
3. **Icon dari domain diferensiasi** (`ai`, `agents`, `mcp`, `rag`).
4. **Icon dengan search volume tinggi** — dari query kosong-hasil di analitik situs ([08](./08-website.md)).
5. **Sisanya sesuai backlog.**

Query yang tidak menghasilkan apa-apa di situs adalah sumber roadmap terbaik yang kita punya, karena itu permintaan yang terekam otomatis tanpa pengguna perlu membuka issue.
