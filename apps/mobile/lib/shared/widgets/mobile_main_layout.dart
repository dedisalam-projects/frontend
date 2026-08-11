import 'package:flutter/material.dart';

class MobileMainLayout extends StatelessWidget {
  final Widget child;
  final String title;

  const MobileMainLayout({
    super.key,
    required this.child,
    required this.title,
  });

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
        actions: [
          IconButton(
            icon: const Icon(Icons.person_outline),
            onPressed: () {},
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1.0),
          child: Container(
            color: const Color(0xFFf0f0f0), // Divider color NG-ALAIN
            height: 1.0,
          ),
        ),
      ),
      drawer: Drawer(
        backgroundColor: Colors.white,
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: const BoxDecoration(
                color: Color(0xFFf8fafc),
                border: Border(
                  bottom: BorderSide(color: Color(0xFFf0f0f0)),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  const Icon(Icons.auto_awesome_mosaic, color: Color(0xFF1890ff), size: 48),
                  const SizedBox(height: 8),
                  Text(
                    'Sakai App',
                    style: TextStyle(
                      color: colorScheme.onSurface,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8.0),
              child: ListTile(
                leading: const Icon(Icons.home_outlined),
                title: const Text('Dashboard'),
                selected: true,
                selectedColor: const Color(0xFF1890ff),
                selectedTileColor: const Color(0xFFe6f4ff),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2.0)),
                onTap: () {
                  Navigator.pop(context);
                },
              ),
            ),
          ],
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: child,
      ),
    );
  }
}
