# Anchor set

Twenty frozen icons that define the visual language of IconMind.

Every new icon is reviewed **against these**, not against whatever was drawn last week.
This is the countermeasure to style drift — the failure mode where icon #900 no longer
looks like icon #1 because the person drawing it has changed over nine months.
See doc 04 §4.12 in the master plan.

These are **copies**, deliberately. Editing an icon under `icons/` must not silently
move the reference it is measured against. Replacing an anchor is a conscious act:
delete the old file, copy the new one, and say why in the pull request.

Frozen: 2026-08-23 (week 1, phase 1).

## Changes

**2026-08-23 — `model` replaced.** The original was a hexagon with a ring inside. When
`llm` arrived it also needed to be a hexagon with something inside, and the perceptual
check measured the two at a distance of 0.029 — below the threshold for "renders almost
identically". Rather than contort `llm`, `model` became the bare hexagon: the parent of
the family carries no interior mark, and every specific kind of model adds one. The two
now measure 0.089 apart, and the family reads as a system instead of a collision.
