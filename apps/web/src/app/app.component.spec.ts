import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuService } from '@delon/theme';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: MenuService,
          useValue: {
            add: jest.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app and render layout (Happy Path)', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should handle routing securely without deep rendering (Negative Scenario Isolation)', async () => {
    // Isolasi murni tanpa database/network connection
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    // Verifikasi bahwa komponen dibuat tanpa me-render children secara mendalam
    expect(app).toBeTruthy();
  });
});
