import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HelloWorldComponent as SharedHelloWorldComponent } from '@dedisalam/shared-web';

@Component({
  selector: 'app-hello-world',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, SharedHelloWorldComponent],
  template: `
    <div class="flex flex-col gap-6">
      <p-card>
        <ng-template pTemplate="title">
          Welcome to <span class="text-blue-600 dark:text-blue-400">{{ title }}</span>
        </ng-template>

        <p class="text-slate-600 dark:text-slate-300">
          A modular fullstack application utilizing NestJS backend services, RabbitMQ messaging,
          Redis cache storage, and a responsive frontend web experience.
        </p>

        <!-- Reusable Shared Hello World Component -->
        <div class="mt-4 border-t border-slate-200 dark:border-slate-700 pt-4">
          <lib-hello-world></lib-hello-world>
        </div>

        <ng-template pTemplate="footer">
          <div class="flex gap-4">
            <p-button icon="pi pi-bolt" (onClick)="onExplore()" label="Explore Console"></p-button>
            <p-button
              icon="pi pi-book"
              label="Documentation"
              severity="secondary"
              variant="outlined"
            ></p-button>
          </div>
        </ng-template>
      </p-card>
    </div>
  `,
})
export class HelloWorldComponent {
  title = 'Antigravity Fullstack App';

  onExplore() {
    alert('Welcome to Antigravity web interface powered by Angular & PrimeNG!');
  }
}
