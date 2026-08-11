import { Route } from '@angular/router';
import { LayoutDefaultComponent } from './layouts/default/default.component';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/hello-world.component').then((m) => m.HelloWorldComponent),
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/profile/profile.component').then((m) => m.ProfileComponent),
      },
    ],
  },
];
