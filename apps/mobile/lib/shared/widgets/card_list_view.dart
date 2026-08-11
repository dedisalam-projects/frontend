import 'package:flutter/material.dart';

class CardListView<T> extends StatelessWidget {
  final List<T> items;
  final Widget Function(BuildContext context, T item) itemBuilder;
  final Widget? emptyState;
  final EdgeInsetsGeometry padding;

  const CardListView({
    super.key,
    required this.items,
    required this.itemBuilder,
    this.emptyState,
    this.padding = const EdgeInsets.all(16.0),
  });

  @override
  Widget build(BuildContext context) {
    if (items.isEmpty) {
      return emptyState ?? const SizedBox.shrink();
    }

    return ListView.separated(
      padding: padding,
      itemCount: items.length,
      separatorBuilder: (context, index) => const SizedBox(height: 12.0),
      itemBuilder: (context, index) {
        return Card(
          child: itemBuilder(context, items[index]),
        );
      },
    );
  }
}
