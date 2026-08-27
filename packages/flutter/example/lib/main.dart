import 'package:flutter/material.dart';
import 'package:iconmind_flutter/iconmind_flutter.dart';

void main() => runApp(const IconMindExample());

/// A small gallery: a handful of icons under live variant / weight / size
/// controls — the whole API of the package on one screen.
class IconMindExample extends StatefulWidget {
  const IconMindExample({super.key});

  @override
  State<IconMindExample> createState() => _IconMindExampleState();
}

class _IconMindExampleState extends State<IconMindExample> {
  IconMindVariant variant = IconMindVariant.outline;
  IconMindWeight weight = IconMindWeight.regular;
  double size = 32;

  // A spread of the vocabulary: agents, MCP, RAG, and the everyday.
  static const icons = <String, IconMindData>{
    'agent': IconMindIcons.agent,
    'model': IconMindIcons.model,
    'prompt': IconMindIcons.prompt,
    'embedding': IconMindIcons.embedding,
    'vector-database': IconMindIcons.vectorDatabase,
    'mcp-server': IconMindIcons.mcpServer,
    'tool-calling': IconMindIcons.toolCalling,
    'context-window': IconMindIcons.contextWindow,
    'reranker': IconMindIcons.reranker,
    'terminal': IconMindIcons.terminal,
    'database': IconMindIcons.database,
    'search': IconMindIcons.search,
  };

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'IconMind',
      theme: ThemeData(colorSchemeSeed: Colors.deepPurple, useMaterial3: true),
      home: Scaffold(
        appBar: AppBar(title: const Text('iconmind_flutter')),
        body: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: Wrap(
                spacing: 12,
                runSpacing: 12,
                crossAxisAlignment: WrapCrossAlignment.center,
                children: [
                  SegmentedButton<IconMindVariant>(
                    segments: const [
                      ButtonSegment(value: IconMindVariant.outline, label: Text('outline')),
                      ButtonSegment(value: IconMindVariant.duotone, label: Text('duotone')),
                    ],
                    selected: {variant},
                    onSelectionChanged: (s) => setState(() => variant = s.first),
                  ),
                  SegmentedButton<IconMindWeight>(
                    segments: const [
                      ButtonSegment(value: IconMindWeight.thin, label: Text('thin')),
                      ButtonSegment(value: IconMindWeight.regular, label: Text('regular')),
                      ButtonSegment(value: IconMindWeight.bold, label: Text('bold')),
                    ],
                    selected: {weight},
                    onSelectionChanged: (s) => setState(() => weight = s.first),
                  ),
                  SizedBox(
                    width: 200,
                    child: Slider(
                      value: size,
                      min: 16,
                      max: 64,
                      label: '${size.round()}px',
                      onChanged: (v) => setState(() => size = v),
                    ),
                  ),
                ],
              ),
            ),
            const Divider(height: 1),
            Expanded(
              child: GridView.extent(
                padding: const EdgeInsets.all(16),
                maxCrossAxisExtent: 120,
                mainAxisSpacing: 8,
                crossAxisSpacing: 8,
                children: [
                  for (final entry in icons.entries)
                    Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        IconMind(
                          entry.value,
                          size: size,
                          variant: variant,
                          weight: weight,
                          semanticLabel: entry.key,
                        ),
                        const SizedBox(height: 8),
                        Text(entry.key,
                            style: Theme.of(context).textTheme.labelSmall,
                            overflow: TextOverflow.ellipsis),
                      ],
                    ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
