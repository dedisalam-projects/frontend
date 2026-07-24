import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HelloWorldComponent as SharedHelloWorldComponent } from '@dedisalam/shared/ui';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-desktop-hello-world',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, SharedHelloWorldComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6">
      <div class="card">
        <div class="font-semibold text-2xl mb-4">
          Welcome to <span class="text-blue-600 dark:text-blue-400">{{ title }}</span>
        </div>

        <p class="text-slate-600 dark:text-slate-300">
          Cross-platform desktop client powered by Electron, Angular 21, and the Sakai-NG Admin
          Template.
        </p>

        <!-- Reusable Shared Hello World Component -->
        <div class="mt-4 border-t border-slate-200 dark:border-slate-700 pt-4">
          <lib-hello-world
            [baseUrl]="environment.apiUrl"
            [wsUrl]="environment.wsUrl"
          ></lib-hello-world>
        </div>

        <div class="flex gap-4 mt-6">
          <p-button
            icon="pi pi-bolt"
            (onClick)="onExplore()"
            label="Explore Desktop App"
          ></p-button>
        </div>
      </div>
    </div>
  `,
})
export class DesktopHelloWorldComponent {
  title = 'Desktop Electron Client';
  environment = environment;

  onExplore() {
    alert('Welcome to Antigravity Desktop App powered by Electron & PrimeNG!');
  }
}
