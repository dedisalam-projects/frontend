import 'package:flutter/material.dart';

class StatusEmpty extends StatelessWidget {
  final String? message;
  final Widget? icon;

  const StatusEmpty({
    super.key,
    this.message,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          icon ?? const Icon(
            Icons.inbox_outlined,
            size: 64,
            color: Color(0xFFcbd5e1), // Slate 300
          ),
          const SizedBox(height: 16),
          Text(
            message ?? 'No Data',
            style: const TextStyle(
              color: Color(0xFF94a3b8), // Slate 400
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }
}
