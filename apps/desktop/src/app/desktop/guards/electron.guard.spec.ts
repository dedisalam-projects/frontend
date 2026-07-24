import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ElectronGuard } from './electron.guard';
import { ElectronService } from '../services/electron.service';

describe('ElectronGuard', () => {
  let mockElectronService: Partial<ElectronService>;

  beforeEach(() => {
    mockElectronService = { isElectron: true };

    TestBed.configureTestingModule({
      providers: [{ provide: ElectronService, useValue: mockElectronService }],
    });
  });

  it('should allow navigation if running in electron', () => {
    const guardFn = TestBed.runInInjectionContext(() =>
      ElectronGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    );
    expect(guardFn).toBe(true);
  });

  it('should still allow navigation but log warning if not in electron (browser mode)', () => {
    Object.defineProperty(mockElectronService, 'isElectron', { get: () => false });
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    const guardFn = TestBed.runInInjectionContext(() =>
      ElectronGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    );

    expect(guardFn).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith(
      '[ElectronGuard] Not running in Electron environment. Proceeding in browser mode for development.',
    );
  });
});
