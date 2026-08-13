import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Mengacu pada standar Ant Design System (NG-ZORRO) - Pixel-Perfect Parity
  static ThemeData get lightTheme {
    final base = ThemeData.light();
    return base.copyWith(
      colorScheme: const ColorScheme.light(
        primary: Color(0xFF1890ff), // NG-ALAIN Daybreak Blue
        secondary: Color(0xFF64748b), // Slate 500
        surface: Colors.white,
        onPrimary: Colors.white,
      ),
      scaffoldBackgroundColor: const Color(0xFFf8fafc), // Slate 50
      textTheme: GoogleFonts.interTextTheme(base.textTheme),
      appBarTheme: AppBarTheme(
        backgroundColor: Colors.white,
        foregroundColor: const Color(0xFF0f172a), // Slate 900
        elevation: 0,
        iconTheme: const IconThemeData(color: Color(0xFF64748b)),
        titleTextStyle: GoogleFonts.inter(
          color: const Color(0xFF0f172a),
          fontSize: 20,
          fontWeight: FontWeight.w600,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xFF1890ff),
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(2.0),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        ),
      ),
      cardTheme: const CardThemeData(
        color: Colors.white,
        elevation: 0,
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(2.0)),
          side: BorderSide(color: Color(0xFFf0f0f0)),
        ),
      ),
    );
  }
}
