/// One drawn element of an icon.
///
/// Icons are stored as SVG path data and painted by [IconMind]. Geometry is
/// weight-invariant across the set — the generator proves it on every build —
/// so a weight is a stroke width here, not a second copy of the drawing.
class N {
  /// SVG path data, on the 24×24 grid.
  final String d;

  /// A duotone tint layer: painted as a fill at 20% opacity, no stroke.
  final bool tint;

  /// A duotone halo: an echo of the stroke behind an open drawing, painted at
  /// 20% opacity with a width of (stroke weight + 3).
  final bool halo;

  const N(this.d) : tint = false, halo = false;
  const N.tint(this.d) : tint = true, halo = false;
  const N.halo(this.d) : tint = false, halo = true;
}

/// One icon: its slug and its two variants.
class IconMindData {
  final String slug;

  /// The outline drawing, in paint order.
  final List<N> outline;

  /// The duotone drawing — tint layers first, then the strokes — in paint order.
  final List<N> duotone;

  const IconMindData(this.slug, this.outline, this.duotone);
}
