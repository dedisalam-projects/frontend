import 'package:dio/dio.dart';
import 'package:fpdart/fpdart.dart';
import 'package:injectable/injectable.dart';
import '../../domain/entities/hello_message.dart';
import '../../domain/repositories/hello_repository.dart';
import '../datasources/hello_remote_data_source.dart';

@LazySingleton(as: HelloRepository)
class HelloRepositoryImpl implements HelloRepository {
  final HelloRemoteDataSource remoteDataSource;

  HelloRepositoryImpl(this.remoteDataSource);

  @override
  Future<Either<String, HelloMessage>> getHelloMessage() async {
    try {
      final result = await remoteDataSource.getHelloMessage();
      return Right(result.toEntity());
    } on DioException catch (e) {
      return Left(e.message ?? 'Network error occurred');
    } catch (e) {
      return Left(e.toString());
    }
  }
}
