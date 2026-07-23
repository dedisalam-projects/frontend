import 'package:fpdart/fpdart.dart';
import 'package:injectable/injectable.dart';
import '../entities/hello_message.dart';
import '../repositories/hello_repository.dart';

@lazySingleton
class GetHelloMessage {
  final HelloRepository repository;

  GetHelloMessage(this.repository);

  Future<Either<String, HelloMessage>> call() async {
    return await repository.getHelloMessage();
  }
}
