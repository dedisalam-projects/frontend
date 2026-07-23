// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Indonesian (`id`).
class AppLocalizationsId extends AppLocalizations {
  AppLocalizationsId([String locale = 'id']) : super(locale);

  @override
  String get appTitle => 'Aplikasi Hello World';

  @override
  String get helloWorld => 'Halo Dunia';

  @override
  String get fetchData => 'Ambil Data';

  @override
  String get loading => 'Memuat...';

  @override
  String get error => 'Terjadi kesalahan';
}
