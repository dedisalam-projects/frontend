import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { HelloWorldComponent } from '@dedisalam/shared-web';

@Component({
  selector: 'app-desktop-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, HelloWorldComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="content-wrapper" style="padding: 2rem;">
      <p-card>
        <ng-template pTemplate="header">
          <div class="card-hero-header">
            <div
              class="badge"
              style="background: var(--p-primary-color); color: var(--p-primary-contrast-color); padding: 0.25rem 0.5rem; border-radius: 4px; display: inline-block; margin: 1rem;"
            >
              Electron Desktop & Aura Theme
            </div>
          </div>
        </ng-template>

        <h1 class="hero-title text-3xl font-bold mb-4" style="margin: 0 1rem 1rem;">
          Welcome to
          <span class="text-primary" style="color: var(--p-primary-color)"
            >Electron Desktop App</span
          >
        </h1>
        <p class="hero-description mb-6" style="margin: 0 1rem 1.5rem;">
          Cross-platform desktop client powered by Electron, Angular 19, and pure PrimeNG Aura
          Theme.
        </p>

        <!-- Reusable Shared Hello World Component -->
        <lib-hello-world></lib-hello-world>
      </p-card>
    </div>
  `,
})
export class DesktopDashboardComponent {}
