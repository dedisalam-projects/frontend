import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ElectronService } from '../services/electron.service';

export const ElectronGuard: CanActivateFn = () => {
  const electronService = inject(ElectronService);

  if (electronService.isElectron) {
    return true;
  }

  console.warn(
    '[ElectronGuard] Not running in Electron environment. Proceeding in browser mode for development.',
  );
  return true;
};
