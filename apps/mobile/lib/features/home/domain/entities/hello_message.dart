import 'package:equatable/equatable.dart';

class HelloMessage extends Equatable {
  final String message;

  const HelloMessage({required this.message});

  @override
  List<Object?> get props => [message];
}
