import 'package:flutter/material.dart';

class CardListView<T> extends StatelessWidget {
  final List<T> items;
  final Widget Function(BuildContext context, T item) itemBuilder;
  final Widget? emptyState;

  const CardListView({
    super.key,
    required this.items,
    required this.itemBuilder,
    this.emptyState,
  });

  @override
  Widget build(BuildContext context) {
    if (items.isEmpty) {
      return emptyState ?? const Center(child: Text('No Data'));
    }

    return ListView.separated(
      padding: const EdgeInsets.all(16.0),
      itemCount: items.length,
      separatorBuilder: (context, index) => const SizedBox(height: 12),
      itemBuilder: (context, index) {
        return Card(
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8.0),
            side: const BorderSide(color: Color(0xFFe2e8f0)),
          ),
          margin: EdgeInsets.zero,
          child: itemBuilder(context, items[index]),
        );
      },
    );
  }
}
