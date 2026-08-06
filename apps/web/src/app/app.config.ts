import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNzI18n, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { correlationIdInterceptor, baseUrlInterceptor, API_BASE_URL } from '@dedisalam/shared/util';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { appRoutes } from './app.routes';
import { environment } from '../environments/environment';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: API_BASE_URL, useValue: environment.apiUrl },
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptors([correlationIdInterceptor, baseUrlInterceptor, authInterceptor]),
    ),
    provideAnimationsAsync(),
    provideNzI18n(en_US),
  ],
};
