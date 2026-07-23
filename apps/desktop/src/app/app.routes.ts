import { Route } from '@angular/router';
import { ElectronGuard } from './desktop/guards/electron.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [ElectronGuard],
    loadComponent: () =>
      import('./features/dashboard.component').then((m) => m.DesktopDashboardComponent),
  },
];
