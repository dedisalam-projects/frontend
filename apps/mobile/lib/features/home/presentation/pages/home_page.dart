import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../l10n/generated/app_localizations.dart';
import '../../../../shared/widgets/admin_layout.dart';
import '../bloc/hello_bloc.dart';
import '../bloc/hello_event.dart';
import '../bloc/hello_state.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return AdminLayout(
      title: AppLocalizations.of(context)?.appTitle ?? 'Dashboard',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            AppLocalizations.of(context)?.helloWorld ?? 'Hello World',
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w600,
              color: Color(0xFF1e293b),
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 32),
          BlocBuilder<HelloBloc, HelloState>(
            builder: (context, state) {
              if (state is HelloInitial) {
                return const Text('Press the button to fetch data from API Gateway', textAlign: TextAlign.center);
              } else if (state is HelloLoading) {
                return const Center(child: CircularProgressIndicator());
              } else if (state is HelloSuccess) {
                return Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0xFFdcfce7), // Emerald 50
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: const Color(0xFF86efac)), // Emerald 300
                  ),
                  child: Text(
                    state.message.message,
                    style: TextStyle(
                      color: Theme.of(context).colorScheme.primary,
                      fontWeight: FontWeight.w600,
                      fontSize: 16,
                    ),
                    textAlign: TextAlign.center,
                  ),
                );
              } else if (state is HelloError) {
                return Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0xFFfee2e2), // Red 50
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: const Color(0xFFfca5a5)), // Red 300
                  ),
                  child: Text(
                    state.message,
                    style: const TextStyle(color: Color(0xFFef4444)),
                    textAlign: TextAlign.center,
                  ),
                );
              }
              return const SizedBox.shrink();
            },
          ),
          const SizedBox(height: 32),
          ElevatedButton(
            onPressed: () {
              context.read<HelloBloc>().add(const FetchRequested());
            },
            child: Text(AppLocalizations.of(context)?.fetchData ?? 'Fetch API Data'),
          ),
        ],
      ),
    );
  }
}
