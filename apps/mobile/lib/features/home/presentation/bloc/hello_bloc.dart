import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';
import 'hello_event.dart';
import 'hello_state.dart';
import '../../domain/usecases/get_hello_message.dart';

@injectable
class HelloBloc extends Bloc<HelloEvent, HelloState> {
  final GetHelloMessage getHelloMessage;

  HelloBloc(this.getHelloMessage) : super(const HelloInitial()) {
    on<FetchRequested>((event, emit) async {
      emit(const HelloLoading());
      final result = await getHelloMessage();
      result.fold(
        (failure) => emit(HelloError(failure)),
        (success) => emit(HelloSuccess(success)),
      );
    });
  }
}
