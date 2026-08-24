# Deferred icons

Concepts that reached review and were held back, with the measured reason. Held is not
the same as failed: shipping a weak icon costs more than shipping nothing, because every
weak icon drags the whole set down and someone has to notice it later.

| Slug | Batch | Why | What would unblock it |
|---|---|---|---|
| `tool-calling` | spike | Four slugs compete for the same visual space: `tool-calling`, `function-call`, `mcp-tool-call`, `tool-registry`. 12 candidates, none clean. | Decide the taxonomy boundary first. If `tool-calling` and `function-call` are the same concept, one becomes an alias. |
| `hallucination` | 04 | Bubble + mark cannot clear 0.050 against `prompt` — measured 0.040 and 0.048 across two rounds. The bubble silhouette dominates. | A different outer shape, or a metaphor that is not "a bubble with something in it". |
| `mcp` | 04 | The protocol itself, not a thing in it. Two boxes read as a dumbbell; a chain link collides with `link`. | A mark for "protocol" that is not a generic connector. |
| `planner` | 05 | Three candidates, three collisions: two read as the letter E, the third is the standard `share` glyph. The concept is "the thing that produces a plan", which is a role, not an object. | A mark for "produces" that composes with `plan`, or accept `plan` covers both. |
| `rag-pipeline` | 04 | A composite of four stages; every candidate either oversimplified to a generic arrow or crowded past 16px legibility. | Possibly not a 24px concept at all — may belong as an illustration rather than an icon. |

Two of these are taxonomy problems wearing a drawing problem's clothes. Drawing harder
would not have helped.
