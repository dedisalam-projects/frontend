import 'package:flutter/material.dart';

class StatusLoading extends StatelessWidget {
  final String? message;

  const StatusLoading({
    super.key,
    this.message,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          CircularProgressIndicator(
            valueColor: AlwaysStoppedAnimation<Color>(Theme.of(context).colorScheme.primary),
            strokeWidth: 3.0,
          ),
          if (message != null) ...[
            const SizedBox(height: 16),
            Text(
              message!,
              style: const TextStyle(
                color: Color(0xFF64748b), // Slate 500
                fontSize: 14,
              ),
            ),
          ],
        ],
      ),
    );
  }
}
