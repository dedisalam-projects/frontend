import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../l10n/generated/app_localizations.dart';
import '../bloc/hello_bloc.dart';
import '../bloc/hello_event.dart';
import '../bloc/hello_state.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(AppLocalizations.of(context)?.appTitle ?? 'Hello World App'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              AppLocalizations.of(context)?.helloWorld ?? 'Hello World',
              style: Theme.of(context).textTheme.headlineMedium,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            BlocBuilder<HelloBloc, HelloState>(
              builder: (context, state) {
                if (state is HelloInitial) {
                  return const Text('Press the button to fetch data', textAlign: TextAlign.center);
                } else if (state is HelloLoading) {
                  return const Center(child: CircularProgressIndicator());
                } else if (state is HelloSuccess) {
                  return Text(
                    state.message.message,
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(color: Theme.of(context).colorScheme.primary),
                    textAlign: TextAlign.center,
                  );
                } else if (state is HelloError) {
                  return Text(
                    state.message,
                    style: const TextStyle(color: Colors.red),
                    textAlign: TextAlign.center,
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
              child: Text(AppLocalizations.of(context)?.fetchData ?? 'Fetch Data'),
            ),
          ],
        ),
      ),
    );
  }
}
