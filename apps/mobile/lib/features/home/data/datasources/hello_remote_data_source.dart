import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';
import '../models/hello_model.dart';

abstract class HelloRemoteDataSource {
  Future<HelloModel> getHelloMessage();
}

@LazySingleton(as: HelloRemoteDataSource)
class HelloRemoteDataSourceImpl implements HelloRemoteDataSource {
  final Dio dio;

  HelloRemoteDataSourceImpl(this.dio);

  @override
  Future<HelloModel> getHelloMessage() async {
    final response = await dio.get('/hello');
    return HelloModel.fromJson(response.data);
  }
}
