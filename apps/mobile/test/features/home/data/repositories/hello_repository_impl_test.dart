import 'package:flutter_test/flutter_test.dart';
import 'package:fpdart/fpdart.dart';
import 'package:mocktail/mocktail.dart';
import 'package:mobile/features/home/data/datasources/hello_remote_data_source.dart';
import 'package:mobile/features/home/data/models/hello_model.dart';
import 'package:mobile/features/home/data/repositories/hello_repository_impl.dart';
import 'package:mobile/features/home/domain/entities/hello_message.dart';

class MockHelloRemoteDataSource extends Mock implements HelloRemoteDataSource {}

void main() {
  late HelloRepositoryImpl repository;
  late MockHelloRemoteDataSource mockRemoteDataSource;

  setUp(() {
    mockRemoteDataSource = MockHelloRemoteDataSource();
    repository = HelloRepositoryImpl(mockRemoteDataSource);
  });

  group('getHelloMessage', () {
    const tHelloModel = HelloModel(message: 'Hello World');
    const tHelloMessage = HelloMessage(message: 'Hello World');

    test('should return remote data when the call to remote data source is successful', () async {
      // arrange
      when(() => mockRemoteDataSource.getHelloMessage())
          .thenAnswer((_) async => tHelloModel);
      // act
      final result = await repository.getHelloMessage();
      // assert
      verify(() => mockRemoteDataSource.getHelloMessage());
      expect(result, const Right(tHelloMessage));
    });

    test('should return Left with message when call to remote data source fails', () async {
      // arrange
      when(() => mockRemoteDataSource.getHelloMessage())
          .thenThrow(Exception('Failed to connect'));
      // act
      final result = await repository.getHelloMessage();
      // assert
      verify(() => mockRemoteDataSource.getHelloMessage());
      expect(result, const Left('Exception: Failed to connect'));
    });
  });
}
