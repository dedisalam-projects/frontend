import { Route } from '@angular/router';
import { AppLayout } from './layouts/main-layout/app.layout';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/hello-world.component').then((m) => m.HelloWorldComponent),
      },
    ],
  },
];
