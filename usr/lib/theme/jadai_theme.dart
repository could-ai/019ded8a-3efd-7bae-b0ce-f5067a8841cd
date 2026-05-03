import 'package:flutter/material.dart';

class JadaiTheme {
  static const Color creamBackground = Color(0xFFFFF8F0);
  static const Color orangeAccent = Color(0xFFE8834A);
  
  static ThemeData get elderlyTheme {
    return ThemeData(
      scaffoldBackgroundColor: creamBackground,
      colorScheme: ColorScheme.fromSeed(
        seedColor: orangeAccent,
        background: creamBackground,
        primary: orangeAccent,
      ),
      textTheme: const TextTheme(
        displayLarge: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.black87),
        bodyLarge: TextStyle(fontSize: 22, color: Colors.black87),
      ),
      useMaterial3: true,
    );
  }

  static ThemeData get childTheme {
    return ThemeData(
      colorScheme: ColorScheme.fromSeed(seedColor: Colors.blueAccent),
      useMaterial3: true,
    );
  }
}
