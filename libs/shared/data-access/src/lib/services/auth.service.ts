import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

// API Models (as per contract)
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
  meta?: any;
}

export interface ProfileResponse {
  statusCode: number;
  message: string;
  data: User;
  meta?: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly API_URL = '/api/v1';
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        this.currentUserSubject.next(JSON.parse(userJson));
      } catch (e) {
        this.currentUserSubject.next(null);
      }
    }
  }

  get accessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  get refreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  get isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(tap((res) => this.setSession(res.data)));
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/register`, data);
  }

  logout(): void {
    const refresh = this.refreshToken;
    if (refresh) {
      this.http
        .post(`${this.API_URL}/auth/logout`, { refreshToken: refresh })
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
    return this.http
      .post<AuthResponse>(`${this.API_URL}/auth/refresh`, { refreshToken: refresh })
      .pipe(tap((res) => this.setSession(res.data)));
  }

  getProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(`${this.API_URL}/users/me`).pipe(
      tap((res) => {
        if (res.data) {
          localStorage.setItem('user', JSON.stringify(res.data));
          this.currentUserSubject.next(res.data);
        }
      }),
    );
  }

  updateProfile(data: any): Observable<ProfileResponse> {
    return this.http.patch<ProfileResponse>(`${this.API_URL}/users/me`, data).pipe(
      tap((res) => {
        if (res.data) {
          localStorage.setItem('user', JSON.stringify(res.data));
          this.currentUserSubject.next(res.data);
        }
      }),
    );
  }

  private setSession(authData: { accessToken: string; refreshToken: string; user: User }): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, authData.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, authData.refreshToken);
    localStorage.setItem('user', JSON.stringify(authData.user));
    this.currentUserSubject.next(authData.user);
  }

  clearSession(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
