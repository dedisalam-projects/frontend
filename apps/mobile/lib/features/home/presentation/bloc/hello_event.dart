import 'package:equatable/equatable.dart';

abstract class HelloEvent extends Equatable {
  const HelloEvent();

  @override
  List<Object?> get props => [];
}

class FetchRequested extends HelloEvent {
  const FetchRequested();
}
