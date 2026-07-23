import 'package:equatable/equatable.dart';
import '../../domain/entities/hello_message.dart';

class HelloModel extends Equatable {
  final String message;

  const HelloModel({required this.message});

  factory HelloModel.fromJson(Map<String, dynamic> json) {
    return HelloModel(
      message: json['message'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'message': message,
    };
  }

  HelloMessage toEntity() => HelloMessage(message: message);

  @override
  List<Object?> get props => [message];
}
