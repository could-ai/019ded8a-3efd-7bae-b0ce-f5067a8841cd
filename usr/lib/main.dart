import 'package:flutter/material.dart';
import 'screens/role_selection.dart';
import 'screens/elderly/companion_screen.dart';
import 'screens/child/dashboard_screen.dart';

void main() {
  runApp(const JadaiApp());
}

class JadaiApp extends StatelessWidget {
  const JadaiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'JADAI',
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      routes: {
        '/': (context) => const RoleSelectionScreen(),
        '/elderly': (context) => const CompanionScreen(),
        '/child': (context) => const DashboardScreen(),
      },
    );
  }
}
