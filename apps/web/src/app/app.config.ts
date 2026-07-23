import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { correlationIdInterceptor, baseUrlInterceptor } from '@dedisalam/shared-web';
import Aura from '@primeuix/themes/aura';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
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
