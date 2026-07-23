// GENERATED CODE - DO NOT MODIFY BY HAND
// dart format width=80

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

// ignore_for_file: type=lint
// coverage:ignore-file

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:dio/dio.dart' as _i361;
import 'package:get_it/get_it.dart' as _i174;
import 'package:injectable/injectable.dart' as _i526;

import '../../features/home/data/datasources/hello_remote_data_source.dart'
    as _i348;
import '../../features/home/data/repositories/hello_repository_impl.dart'
    as _i93;
import '../../features/home/domain/repositories/hello_repository.dart' as _i487;
import '../../features/home/domain/usecases/get_hello_message.dart' as _i708;
import '../../features/home/presentation/bloc/hello_bloc.dart' as _i87;
import '../network/dio_client.dart' as _i667;

extension GetItInjectableX on _i174.GetIt {
  // initializes the registration of main-scope dependencies inside of GetIt
  _i174.GetIt init({
    String? environment,
    _i526.EnvironmentFilter? environmentFilter,
  }) {
    final gh = _i526.GetItHelper(this, environment, environmentFilter);
    final dioModule = _$DioModule();
    gh.lazySingleton<_i361.Dio>(() => dioModule.dio);
    gh.lazySingleton<_i348.HelloRemoteDataSource>(
      () => _i348.HelloRemoteDataSourceImpl(gh<_i361.Dio>()),
    );
    gh.lazySingleton<_i487.HelloRepository>(
      () => _i93.HelloRepositoryImpl(gh<_i348.HelloRemoteDataSource>()),
    );
    gh.lazySingleton<_i708.GetHelloMessage>(
      () => _i708.GetHelloMessage(gh<_i487.HelloRepository>()),
    );
    gh.factory<_i87.HelloBloc>(
      () => _i87.HelloBloc(gh<_i708.GetHelloMessage>()),
    );
    return this;
  }
}

class _$DioModule extends _i667.DioModule {}
