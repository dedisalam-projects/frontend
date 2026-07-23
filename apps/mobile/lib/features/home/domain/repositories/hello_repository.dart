import 'package:fpdart/fpdart.dart';
import '../entities/hello_message.dart';

abstract class HelloRepository {
  Future<Either<String, HelloMessage>> getHelloMessage();
}
