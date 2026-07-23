import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NxWelcome } from './nx-welcome';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('AppComponent', () => {
  let mockHttpClient: { get: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mockHttpClient = {
      get: vi.fn().mockReturnValue(of({ message: 'Hello World', services: { user: 'ok' } })),
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent, NxWelcome],
      providers: [{ provide: HttpClient, useValue: mockHttpClient }],
    }).compileComponents();
  });

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
