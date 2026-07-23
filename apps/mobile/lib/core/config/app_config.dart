class AppConfig {
  // Menggunakan IP lokal default untuk emulator Android agar bisa mengakses localhost host machine
  // 10.0.2.2 adalah alias loopback host di Android emulator.
  static const String baseUrl = 'http://10.0.2.2:3000';
}
