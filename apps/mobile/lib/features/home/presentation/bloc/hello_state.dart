import 'package:equatable/equatable.dart';
import '../../domain/entities/hello_message.dart';

abstract class HelloState extends Equatable {
  const HelloState();
  
  @override
  List<Object?> get props => [];
}

class HelloInitial extends HelloState {
  const HelloInitial();
}

class HelloLoading extends HelloState {
  const HelloLoading();
}

class HelloSuccess extends HelloState {
  final HelloMessage message;

  const HelloSuccess(this.message);

  @override
  List<Object?> get props => [message];
}

class HelloError extends HelloState {
  final String message;

  const HelloError(this.message);

  @override
  List<Object?> get props => [message];
}
