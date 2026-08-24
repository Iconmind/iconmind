# Batch 01 — Spec

Empat icon dengan pengungkit tertinggi: masing-masing menetapkan satu metafora baku di
[03 §3.6](../../docs/masterplan/03-design-system.md) yang akan dipakai puluhan icon berikutnya.
Karena itu keempatnya masuk anchor set — kesalahan di sini merambat ke seluruh set.

```yaml
- slug: model
  domain: ai
  subcategory: model
  concept: "Generic AI model"
  metaphor: "Bentuk bersudut lembut + node terhubung (03 §3.6: kecerdasan/model)"
  must_have: ["kesan sistem terkurung", "kesan pemrosesan"]
  must_not: ["otak", "wajah robot", "papan sirkuit", "bola lampu", "chip berkaki"]
  neighbors: ["llm", "foundation-model", "embedding-model", "inference"]
  menetapkan: metafora KECERDASAN untuk ~150 icon domain ai

- slug: agent
  domain: agents
  subcategory: agent-core
  concept: "Autonomous agent"
  metaphor: "Entitas tunggal yang bertindak sendiri"
  must_have: ["kesan satu entitas", "kesan otonomi"]
  must_not: ["wajah robot", "siluet manusia", "otak"]
  neighbors: ["multi-agent", "worker-agent", "supervisor", "user", "model"]
  menetapkan: bentuk dasar untuk ~130 icon domain agents dan semua varian agent-*

- slug: prompt
  domain: ai
  subcategory: prompt
  concept: "Instruction given to a model"
  metaphor: "Instruksi yang dikirim ke sistem"
  must_have: ["kesan instruksi terarah"]
  must_not: ["papan ketik", "pensil saja", "gelembung obrolan polos"]
  neighbors: ["system-prompt", "user-prompt", "prompt-template", "message", "terminal"]
  menetapkan: bentuk dasar untuk 10 icon sub-kategori prompt

- slug: vector-database
  domain: rag
  subcategory: vector
  concept: "Database for storing and searching vectors"
  metaphor: "Silinder (03 §3.6: data tersimpan) + penanda vektor"
  must_have: ["silinder yang terbaca sebagai basis data", "pembeda dari basis data biasa"]
  must_not: ["logo brand", "server rack"]
  neighbors: ["vector-index", "knowledge-base", "document-store", "data-warehouse"]
  menetapkan: metafora SILINDER untuk data tersimpan di domain rag, data, cloud
```

Setiap konsep dibuat **6 kandidat** dengan pendekatan komposisi yang berbeda
([04 §4.5](../../docs/masterplan/04-ai-generation-workflow.md)), bukan variasi geser dari satu ide.
