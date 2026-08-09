import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { APIGatewayService } from '../api/gateway.service.service';
import type {
  User,
  AuthResponse,
  ProfileResponse,
  LoginDto,
  RegisterDto,
  RefreshTokenDto,
  UpdateProfileDto,
  AuthResponseData,
} from '../api/model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(APIGatewayService);
  private router = inject(Router);

  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  // Internal writable signal
  private _currentUser = signal<User | null>(null);

  // Public readonly signals
  public currentUser = computed(() => this._currentUser());
  public isLoggedIn = computed(() => !!this._currentUser());

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        this._currentUser.set(JSON.parse(userJson));
      } catch (e) {
        this._currentUser.set(null);
      }
    }
  }

  get accessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  get refreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  login(credentials: LoginDto): Observable<AuthResponse> {
    return this.api.authLogin(credentials).pipe(
      tap((res) => {
        if (res.data) {
          this.setSession(res.data);
        }
      }),
    );
  }

  register(data: RegisterDto): Observable<void> {
    return this.api.authRegister(data);
  }

  logout(): void {
    const refresh = this.refreshToken;
    if (refresh) {
      this.api
        .authLogout({ refreshToken: refresh })
        .pipe(
          catchError(() => {
            this.clearSession();
            return throwError(() => new Error('Logout failed on server'));
          }),
        )
        .subscribe({
          next: () => this.clearSession(),
          error: () => this.clearSession(),
        });
    } else {
      this.clearSession();
    }
  }

  refreshAccessToken(): Observable<AuthResponse> {
    const refresh = this.refreshToken;
    if (!refresh) {
      return throwError(() => new Error('No refresh token available'));
    }
    return this.api.authRefresh({ refreshToken: refresh }).pipe(
      tap((res) => {
        if (res.data) {
          this.setSession(res.data);
        }
      }),
    );
  }

  getProfile(): Observable<ProfileResponse> {
    return this.api.usersMeGet().pipe(
      tap((res) => {
        if (res.data) {
          localStorage.setItem('user', JSON.stringify(res.data));
          this._currentUser.set(res.data as User);
        }
      }),
    );
  }

  updateProfile(data: UpdateProfileDto): Observable<ProfileResponse> {
    return this.api.usersMePatch(data).pipe(
      tap((res) => {
        if (res.data) {
          localStorage.setItem('user', JSON.stringify(res.data));
          this._currentUser.set(res.data as User);
        }
      }),
    );
  }

  private setSession(authData: AuthResponseData): void {
    if (authData.accessToken) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, authData.accessToken);
    }
    if (authData.refreshToken) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, authData.refreshToken);
    }
    if (authData.user) {
      localStorage.setItem('user', JSON.stringify(authData.user));
      this._currentUser.set(authData.user);
    }
  }

  clearSession(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem('user');
    this._currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
