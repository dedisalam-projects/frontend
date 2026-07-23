import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { correlationIdInterceptor, baseUrlInterceptor, API_BASE_URL } from '@dedisalam/shared-web';
import Aura from '@primeuix/themes/aura';
import { appRoutes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: API_BASE_URL, useValue: environment.apiUrl },
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([correlationIdInterceptor, baseUrlInterceptor])),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          ripple: true,
        },
      },
    }),
  ],
};
