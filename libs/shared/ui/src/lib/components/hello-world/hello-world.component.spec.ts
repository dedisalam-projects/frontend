import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelloWorldComponent } from './hello-world.component';
import { APIGatewayService } from '@dedisalam/shared/data-access';
import { of, throwError } from 'rxjs';

// Mock Socket.IO
jest.mock('socket.io-client', () => {
  return {
    io: jest.fn().mockReturnValue({
      on: jest.fn(),
      disconnect: jest.fn(),
    }),
  };
});

describe('HelloWorldComponent', () => {
  let component: HelloWorldComponent;
  let fixture: ComponentFixture<HelloWorldComponent>;
  let apiGatewayServiceMock: any;

  beforeEach(async () => {
    apiGatewayServiceMock = {
      getHello: jest.fn().mockReturnValue(of({ message: 'Hello World', services: { user: 'ok' } })),
    };

    await TestBed.configureTestingModule({
      imports: [HelloWorldComponent],
      providers: [{ provide: APIGatewayService, useValue: apiGatewayServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HelloWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load data successfully (Happy Path)', () => {
    expect(component).toBeTruthy();
    expect(apiGatewayServiceMock.getHello).toHaveBeenCalled();
    expect(component.apiData()?.message).toBe('Hello World');
    expect(component.loading()).toBeFalsy();
  });

  it('should handle API failure gracefully (Negative Test)', () => {
    // Reset and mock error
    apiGatewayServiceMock.getHello.mockReturnValue(throwError(() => new Error('API Gateway Down')));

    // Reset apiData explicitly before re-fetching
    component.apiData.set(null);
    component.fetchHello();

    expect(component.apiError()).toBe('API Gateway Down');
    expect(component.loading()).toBeFalsy();
    expect(component.apiData()).toBeNull();
  });
});
