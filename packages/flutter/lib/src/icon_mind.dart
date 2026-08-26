import 'package:flutter/widgets.dart';
import 'package:path_drawing/path_drawing.dart';

import 'data.dart';

/// Which of an icon's two variants to draw.
enum IconMindVariant { outline, duotone }

/// Which weight to draw at. Each weight is a stroke width on the same
/// geometry — the set guarantees the drawings do not change between weights.
enum IconMindWeight { thin, regular, bold }

const _weightStroke = {
  IconMindWeight.thin: 1.5,
  IconMindWeight.regular: 2.0,
  IconMindWeight.bold: 2.5,
};

/// Draws one IconMind icon.
///
/// ```dart
/// IconMind(IconMindIcons.agent)
/// IconMind(IconMindIcons.vectorDatabase,
///     variant: IconMindVariant.duotone,
///     weight: IconMindWeight.bold,
///     size: 32, color: Colors.deepPurple)
/// ```
///
/// Colour defaults to the ambient [IconTheme], so icons follow the theme the
/// way [Icon] does.
class IconMind extends StatelessWidget {
  final IconMindData icon;
  final double size;
  final Color? color;
  final IconMindVariant variant;
  final IconMindWeight weight;

  /// Fine adjustment of the stroke. Picking a [weight] is the intended way to
  /// change how heavy an icon looks; this exists for optical corrections.
  final double? strokeWidth;

  /// When true, the stroke keeps the same on-screen thickness as [size]
  /// changes instead of scaling with the drawing.
  final bool absoluteStrokeWidth;

  final String? semanticLabel;

  const IconMind(
    this.icon, {
    super.key,
    this.size = 24,
    this.color,
    this.variant = IconMindVariant.outline,
    this.weight = IconMindWeight.regular,
    this.strokeWidth,
    this.absoluteStrokeWidth = false,
    this.semanticLabel,
  });

  @override
  Widget build(BuildContext context) {
    final resolved = color ??
        IconTheme.of(context).color ??
        const Color(0xFF000000);
    final nodes = variant == IconMindVariant.duotone ? icon.duotone : icon.outline;
    final base = strokeWidth ?? _weightStroke[weight]!;
    final scale = size / 24.0;
    final stroke = absoluteStrokeWidth && scale != 0 ? base / scale : base;

    return Semantics(
      label: semanticLabel,
      image: semanticLabel != null,
      excludeSemantics: semanticLabel == null,
      child: CustomPaint(
        size: Size.square(size),
        painter: _IconPainter(nodes, resolved, stroke, scale),
      ),
    );
  }
}

/// Parsed path cache. Path data strings are compile-time constants, so the
/// map stays exactly as large as the number of distinct icons actually drawn.
final _paths = <String, Path>{};

Path _pathOf(String d) => _paths[d] ??= parseSvgPathData(d);

class _IconPainter extends CustomPainter {
  final List<N> nodes;
  final Color color;
  final double stroke;
  final double scale;

  const _IconPainter(this.nodes, this.color, this.stroke, this.scale);

  @override
  void paint(Canvas canvas, Size size) {
    canvas.scale(scale);
    for (final n in nodes) {
      final path = _pathOf(n.d);
      final paint = Paint()..color = n.tint || n.halo ? color.withValues(alpha: 0.2) : color;
      if (n.tint) {
        paint.style = PaintingStyle.fill;
      } else {
        paint
          ..style = PaintingStyle.stroke
          ..strokeWidth = n.halo ? stroke + 3 : stroke
          ..strokeCap = StrokeCap.round
          ..strokeJoin = StrokeJoin.round;
      }
      canvas.drawPath(path, paint);
    }
  }

  @override
  bool shouldRepaint(_IconPainter old) =>
      old.nodes != nodes || old.color != color || old.stroke != stroke || old.scale != scale;
}
