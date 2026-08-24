# Anchor set

The frozen icons that define the visual language of IconMind.

Every new icon is reviewed **against these**, not against whatever was drawn last week.
This is the countermeasure to style drift — the failure mode where icon #900 no longer
looks like icon #1 because the person drawing it has changed over nine months.
See doc 04 §4.12 in the master plan.

These are **copies**, deliberately. Editing an icon under `icons/` must not silently
move the reference it is measured against. Replacing an anchor is a conscious act:
delete the old file, copy the new one, and say why below.

## History

**2026-08-23 — frozen (v1).** The first twenty icons, outline only, sharp polygon
vertices, anchors constrained to 3..21.

**2026-08-23 — refrozen (v2), whole set replaced.** The v1 language was measured against
comparable sets and came up short: our shapes spanned at most 20 units where theirs
reached 22, so every icon read as timid inside the same frame. Three of our own geometry
rules — the 0.5 grid snap, the 3..21 live area, and the hard angle constraint — together
forbade the techniques that make a set look drawn rather than generated.

The replacement language: containers cut their corners at 45° instead of rounding them,
anchors run 2..22, and the angle rule is a warning rather than a block. Stroke stayed at
2 after measurement showed the added presence came from the wider live area, not from a
heavier line — at 2.5 seven of ten icons went past 34% ink coverage and turned to mush
at 16px.

Nothing from v1 survived. The old files are kept in `drafts/v1-archive/`.
