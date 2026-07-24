import { Route } from '@angular/router';
import { AppLayout } from '@dedisalam/shared/ui';

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
