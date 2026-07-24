import { Route } from '@angular/router';
import { ElectronGuard } from './desktop/guards/electron.guard';

import { AppLayout } from '@dedisalam/shared/ui';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [ElectronGuard],
    component: AppLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/hello-world.component').then((m) => m.DesktopHelloWorldComponent),
      },
    ],
  },
];
