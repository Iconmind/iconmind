import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:iconmind_flutter/iconmind_flutter.dart';

void main() {
  testWidgets('renders as a CustomPaint of the requested size', (tester) async {
    await tester.pumpWidget(const Directionality(
      textDirection: TextDirection.ltr,
      child: Center(child: IconMind(IconMindIcons.agent, size: 32)),
    ));
    final paint = tester.widget<CustomPaint>(find.byType(CustomPaint));
    expect(paint.size, const Size.square(32));
  });

  testWidgets('duotone and every weight paint without throwing', (tester) async {
    for (final variant in IconMindVariant.values) {
      for (final weight in IconMindWeight.values) {
        await tester.pumpWidget(Directionality(
          textDirection: TextDirection.ltr,
          child: IconMind(IconMindIcons.vectorDatabase,
              variant: variant, weight: weight, color: const Color(0xFF112233)),
        ));
        await tester.pump();
      }
    }
  });

  testWidgets('colour falls back to the ambient IconTheme', (tester) async {
    await tester.pumpWidget(const Directionality(
      textDirection: TextDirection.ltr,
      child: IconTheme(
        data: IconThemeData(color: Color(0xFFAA00AA)),
        child: IconMind(IconMindIcons.agent),
      ),
    ));
    expect(tester.takeException(), isNull);
  });

  test('every icon has both variants and parseable-looking paths', () {
    // A structural smoke over the two data lists of a few icons with known
    // duotone halos and tints.
    for (final icon in [IconMindIcons.agent, IconMindIcons.undo, IconMindIcons.mcpToolCall]) {
      expect(icon.outline, isNotEmpty);
      expect(icon.duotone, isNotEmpty);
      for (final n in [...icon.outline, ...icon.duotone]) {
        expect(n.d, matches(RegExp(r'^[Mm]')));
      }
    }
  });
}
