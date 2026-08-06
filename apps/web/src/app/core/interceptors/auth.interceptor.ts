import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '@dedisalam/shared-data-access'; // we will use absolute import or relative

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const token = authService.accessToken;

  let clonedRequest = req;
  if (
    token &&
    !req.url.includes('/auth/login') &&
    !req.url.includes('/auth/register') &&
    !req.url.includes('/auth/refresh')
  ) {
    clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/auth/login')) {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          return authService.refreshAccessToken().pipe(
            switchMap((tokenResponse) => {
              isRefreshing = false;
              refreshTokenSubject.next(tokenResponse.data.accessToken);
              return next(
                req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${tokenResponse.data.accessToken}`,
                  },
                }),
              );
            }),
            catchError((err) => {
              isRefreshing = false;
              authService.clearSession();
              return throwError(() => err);
            }),
          );
        } else {
          return refreshTokenSubject.pipe(
            filter((result) => result !== null),
            take(1),
            switchMap((newToken) =>
              next(
                req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newToken}`,
                  },
                }),
              ),
            ),
          );
        }
      }

      return throwError(() => error);
    }),
  );
};
