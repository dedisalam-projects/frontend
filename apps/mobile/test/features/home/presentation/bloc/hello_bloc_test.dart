import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:fpdart/fpdart.dart';
import 'package:mocktail/mocktail.dart';
import 'package:mobile/features/home/domain/entities/hello_message.dart';
import 'package:mobile/features/home/domain/usecases/get_hello_message.dart';
import 'package:mobile/features/home/presentation/bloc/hello_bloc.dart';
import 'package:mobile/features/home/presentation/bloc/hello_event.dart';
import 'package:mobile/features/home/presentation/bloc/hello_state.dart';

class MockGetHelloMessage extends Mock implements GetHelloMessage {}

void main() {
  late MockGetHelloMessage mockGetHelloMessage;
  late HelloBloc helloBloc;

  setUp(() {
    mockGetHelloMessage = MockGetHelloMessage();
    helloBloc = HelloBloc(mockGetHelloMessage);
  });

  tearDown(() {
    helloBloc.close();
  });

  group('HelloBloc', () {
    const tHelloMessage = HelloMessage(message: 'Hello World');

    test('initial state should be Initial', () {
      expect(helloBloc.state, const HelloInitial());
    });

    blocTest<HelloBloc, HelloState>(
      'should emit [Loading, Success] when data is gotten successfully',
      build: () {
        when(() => mockGetHelloMessage())
            .thenAnswer((_) async => const Right(tHelloMessage));
        return helloBloc;
      },
      act: (bloc) => bloc.add(const FetchRequested()),
      expect: () => [
        const HelloLoading(),
        const HelloSuccess(tHelloMessage),
      ],
      verify: (_) {
        verify(() => mockGetHelloMessage()).called(1);
      },
    );

    blocTest<HelloBloc, HelloState>(
      'should emit [Loading, Error] when getting data fails',
      build: () {
        when(() => mockGetHelloMessage())
            .thenAnswer((_) async => const Left('Server Failure'));
        return helloBloc;
      },
      act: (bloc) => bloc.add(const FetchRequested()),
      expect: () => [
        const HelloLoading(),
        const HelloError('Server Failure'),
      ],
      verify: (_) {
        verify(() => mockGetHelloMessage()).called(1);
      },
    );
  });
}
