# 13 — MCP Server

> `@iconmind/mcp` · Node 24 · TypeScript · `@modelcontextprotocol/sdk` ([CANON C2](./CANON.md#c2-toolchain-pinned), [C3](./CANON.md#c3-package-yang-di-publish)).

---

## 13.1 Kenapa Ini Ada

Ini adalah **diferensiator paling tajam yang dimiliki IconMind** ([01 §1.5](./01-product-vision.md#15-ai-era-opportunity)). Tidak ada icon library besar yang punya MCP server.

Alasannya bukan sekadar kebaruan. Ada perubahan nyata dalam cara UI ditulis: makin banyak developer meminta AI coding assistant men-generate komponen. Ketika itu terjadi, AI harus memilih icon. Tanpa MCP, AI menebak dari ingatannya — dan biasanya menyebut nama Lucide. Dengan MCP server terpasang, AI bisa **mencari icon yang benar-benar ada** dan menyisipkan kode yang benar.

Sebuah icon library yang bisa ditanyai AI akan dipakai AI. Itu kanal distribusi yang belum diperebutkan siapa pun.

Bonus praktis: MCP server juga menjadi demo hidup untuk 45 icon domain `mcp` — kami memakai apa yang kami gambarkan.

## 13.2 Prinsip

1. **Zero config.** `npx -y @iconmind/mcp` langsung jalan. Tanpa API key, tanpa akun.
2. **Offline.** Metadata dibundel di dalam package. Tidak ada permintaan jaringan, tidak ada latensi, tidak ada kegagalan.
3. **Kecil.** Package < 2 MB termasuk seluruh metadata dan SVG.
4. **Jawaban siap tempel.** Tool tidak mengembalikan data mentah saja, tapi kode yang bisa langsung dipakai. AI yang harus merangkai JSX dari data akan sering salah.

## 13.3 Instalasi

```jsonc
// Claude Desktop / Claude Code
{
  "mcpServers": {
    "iconmind": { "command": "npx", "args": ["-y", "@iconmind/mcp"] }
  }
}
```

```bash
claude mcp add iconmind -- npx -y @iconmind/mcp
```

Transport: **stdio**. Sederhana, universal, tanpa port, tanpa masalah izin jaringan.

## 13.4 Resources

| URI | Isi | MIME |
|-----|-----|------|
| `icon://{slug}` | SVG mentah satu icon | `image/svg+xml` |
| `icon://{slug}/meta` | Metadata lengkap satu icon | `application/json` |
| `category://{category}` | Semua icon dalam satu domain | `application/json` |
| `category://index` | 12 domain + jumlah + sub-kategori | `application/json` |
| `metadata://all` | Seluruh metadata ([07 §7.6](./07-metadata-system.md#76-agregat-metadatajson)) | `application/json` |
| `metadata://stats` | Jumlah, versi, cakupan per phase | `application/json` |

`metadata://all` sengaja tidak dicantumkan sebagai resource yang direkomendasikan di deskripsi server — 700 KB akan memenuhi context window tanpa manfaat. Ia ada untuk kasus di mana klien memang ingin memuat semuanya.

## 13.5 Tools

### `search_icon`

```jsonc
{
  "name": "search_icon",
  "description": "Search IconMind icons by keyword, concept, or description. Use this before writing any UI code that needs an icon.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query":    { "type": "string", "description": "Keyword or concept, e.g. 'vector database', 'agent memory'" },
      "category": { "type": "string", "enum": ["ai","agents","mcp","rag","data","devops","cloud","security","automation","analytics","devtools","interface"] },
      "limit":    { "type": "integer", "default": 10, "maximum": 50 },
      "format":   { "type": "string", "enum": ["react","vue","svg","name"], "default": "react" }
    },
    "required": ["query"]
  }
}
```

Keluaran:

```jsonc
{
  "query": "vector database",
  "count": 3,
  "results": [
    {
      "slug": "vector-database",
      "name": "Vector Database",
      "category": "rag",
      "description": "Database for storing and searching vectors",
      "score": 1000,
      "import": "import { VectorDatabase } from '@iconmind/react';",
      "usage": "<VectorDatabase size={24} />"
    }
  ]
}
```

Peringkat memakai algoritma yang sama dengan situs ([09 §9.6](./09-search-system.md#96-algoritma-peringkat)) — implementasinya berbagi kode di `packages/shared`, sehingga hasil pencarian di situs dan lewat AI tidak pernah berbeda.

### `get_icon`

```jsonc
{
  "name": "get_icon",
  "description": "Fetch one icon by its exact slug: SVG, React/Vue code, and metadata.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "slug":   { "type": "string" },
      "format": { "type": "string", "enum": ["all","svg","react","vue"], "default": "all" },
      "size":   { "type": "integer", "default": 24 }
    },
    "required": ["slug"]
  }
}
```

Kalau slug tidak ditemukan, keluarannya **bukan error**, melainkan saran:

```jsonc
{
  "found": false,
  "slug": "vector-db",
  "suggestions": ["vector-database", "vector-index", "vector-query"],
  "hint": "Slug not found. Use search_icon for a free-text search."
}
```

Ini penting: AI yang menerima error cenderung berhenti atau berhalusinasi nama lain. AI yang menerima saran akan memilih yang benar.

### `list_category`

```jsonc
{
  "name": "list_category",
  "description": "List icons in a category, optionally filtered by subcategory. With no arguments, returns the 12 categories.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "category":    { "type": "string" },
      "subcategory": { "type": "string" },
      "limit":       { "type": "integer", "default": 50, "maximum": 200 }
    }
  }
}
```

### `get_icon_code`

```jsonc
{
  "name": "get_icon_code",
  "description": "Generate paste-ready code for several icons at once in one framework.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "slugs":     { "type": "array", "items": { "type": "string" }, "maxItems": 20 },
      "framework": { "type": "string", "enum": ["react","vue","svg","html"], "default": "react" }
    },
    "required": ["slugs"]
  }
}
```

Mengembalikan satu blok impor gabungan plus contoh pemakaian:

```tsx
import { AgentMemory, McpServer, VectorDatabase } from '@iconmind/react';
```

Tool ini ada karena pola nyata pemakaian: AI membangun satu komponen yang butuh 5 icon sekaligus. Lima panggilan `get_icon` boros dan menghasilkan lima blok impor terpisah yang harus digabung sendiri.

## 13.6 Prompts

### `recommend_icons`

```jsonc
{
  "name": "recommend_icons",
  "description": "Recommend icons for a feature or UI screen",
  "arguments": [
    { "name": "description", "description": "The feature or screen being built", "required": true },
    { "name": "framework",   "description": "react | vue | svg", "required": false }
  ]
}
```

Template yang dikembalikan:

```
I am building: {description}

Use the search_icon tool to find the right IconMind icon for every UI
element that needs one. For each recommendation, state:
1. Which UI element it is for
2. The icon slug you chose
3. Why that icon is semantically right, not merely visually similar

Do not invent icon names. If search_icon finds nothing suitable, say so
and suggest the closest icon that actually exists.

Framework: {framework}
```

Baris "jangan mengarang nama icon" ada karena itu mode kegagalan yang paling sering terjadi tanpa instruksi eksplisit.

### `ai_workflow_icons`

```jsonc
{
  "name": "ai_workflow_icons",
  "description": "Map icons onto each stage of an AI, agent, or RAG pipeline",
  "arguments": [
    { "name": "workflow", "description": "The pipeline to map, e.g. 'RAG with reranking'", "required": true }
  ]
}
```

Template:

```
Pipeline to visualize: {workflow}

1. Break this pipeline into its distinct stages.
2. For each stage, use search_icon (prefer the ai, agents, mcp, and rag
   categories) to find the most semantically accurate icon.
3. Return a table: Stage | Icon slug | Why.
4. Finally, produce one combined import block via get_icon_code.

Favour meaning over visual uniformity — an icon with the wrong meaning
costs more than one that merely looks slightly out of place.
```

Prompt ini adalah **etalase paling langsung untuk nilai IconMind**: ia menunjukkan bahwa untuk alur RAG ada icon `chunk`, `retriever`, `reranker`, `vector-search`, dan `grounding` — sesuatu yang tidak bisa dilakukan library lain mana pun.

## 13.7 Implementasi

```ts
// packages/mcp/src/index.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerResources } from "./resources.js";
import { registerTools } from "./tools.js";
import { registerPrompts } from "./prompts.js";

const server = new Server(
  { name: "iconmind", version: process.env.npm_package_version ?? "0.0.0" },
  { capabilities: { resources: {}, tools: {}, prompts: {} } },
);

registerResources(server);
registerTools(server);
registerPrompts(server);

await server.connect(new StdioServerTransport());
```

```ts
// packages/mcp/src/data.ts — dimuat sekali, disimpan di memori
import metadata from "@iconmind/icons/metadata.json" with { type: "json" };
import { buildSearchIndex, search } from "@iconmind/shared/search";

const index = buildSearchIndex(metadata.icons);   // ~15 ms sekali saat start
export const findIcons = (q: string, opts?: SearchOpts) => search(index, q, opts);
export const bySlug = new Map(metadata.icons.map(i => [i.slug, i]));
```

Metadata dibundel sebagai JSON di dalam package. Tidak ada I/O runtime selain membaca file yang sudah ada di disk saat instalasi.

## 13.8 Anggaran Performa

| Operasi | Target |
|---------|--------|
| Start sampai siap | < 300 ms |
| `search_icon` | < 10 ms |
| `get_icon` | < 2 ms |
| `list_category` | < 5 ms |
| Memori | < 60 MB |
| Ukuran package | < 2 MB |

Server MCP yang lambat saat start terasa menyebalkan karena dijalankan setiap klien dibuka. 300 ms adalah ambang di mana pengguna tidak menyadarinya.

## 13.9 Kualitas Deskripsi Tool

Deskripsi tool adalah **prompt engineering, bukan dokumentasi.** AI memutuskan memanggil tool berdasarkan deskripsinya.

| Buruk | Baik |
|-------|------|
| `"Searches icons"` | `"Search IconMind icons by keyword, concept, or description. Use this before writing any UI code that needs an icon."` |
| `"Gets an icon"` | `"Fetch one icon by its exact slug: SVG, React/Vue code, and metadata."` |

Kalimat *"Use this before writing any UI code that needs an icon"* adalah bagian paling berpengaruh dari seluruh server — ia mengubah tool dari sesuatu yang bisa dipanggil menjadi sesuatu yang seharusnya dipanggil.

Deskripsi tool diperlakukan sebagai artefak yang diuji dan diiterasi, bukan komentar.

## 13.10 Pengujian

| Uji | Cara |
|-----|------|
| Kepatuhan protokol | MCP Inspector, semua metode dijawab benar |
| Ketepatan tool | Daftar (kueri → slug yang diharapkan), sama seperti [09 §9.12](./09-search-system.md#912-pengujian) |
| Slug tak dikenal | Mengembalikan saran, bukan error |
| Performa start | Diukur di CI, gagal kalau > 300 ms |
| Ukuran package | `size-limit` pada tarball |
| **Uji ujung-ke-ujung dengan klien nyata** | Skenario manual per rilis: "buatlah panel status agent" → periksa apakah icon yang dipilih benar-benar ada dan tepat |

Uji terakhir tidak bisa diotomasi tapi tidak boleh dilewati — ia satu-satunya yang mengukur apakah server ini benar-benar berguna, bukan sekadar benar.
