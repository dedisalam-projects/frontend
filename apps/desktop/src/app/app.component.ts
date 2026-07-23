import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ElectronService } from './desktop/services/electron.service';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  protected title = 'desktop';
  private electronService = inject(ElectronService);

  async ngOnInit(): Promise<void> {
    console.log('[Angular Desktop App] Component initialized with Aura Theme.');
    if (this.electronService.isElectron) {
      try {
        const res = await this.electronService.checkBridge('Hello from Angular Desktop App!');
        console.log(`[Angular Desktop App] Bridge Response: ${res}`);
      } catch (err) {
        console.error('[Angular Desktop App] Failed to call bridge:', err);
      }
    }
  }
}
