import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HelloWorldComponent as SharedHelloWorldComponent } from '@dedisalam/shared-web';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hello-world',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, SharedHelloWorldComponent],
  template: `
    <div class="flex flex-col gap-6">
      <div class="card">
        <div class="font-semibold text-2xl mb-4">
          Welcome to <span class="text-blue-600 dark:text-blue-400">{{ title }}</span>
        </div>

        <p class="text-slate-600 dark:text-slate-300">
          A modular fullstack application utilizing NestJS backend services, RabbitMQ messaging,
          Redis cache storage, and a responsive frontend web experience.
        </p>

        <!-- Reusable Shared Hello World Component -->
        <div class="mt-4 border-t border-slate-200 dark:border-slate-700 pt-4">
          <lib-hello-world [baseUrl]="environment.apiUrl" [wsUrl]="environment.wsUrl"></lib-hello-world>
        </div>

        <div class="flex gap-4 mt-6">
          <p-button icon="pi pi-bolt" (onClick)="onExplore()" label="Explore Console"></p-button>
          <p-button
            icon="pi pi-book"
            label="Documentation"
            severity="secondary"
            variant="outlined"
          ></p-button>
        </div>
      </div>
    </div>
  `,
})
export class HelloWorldComponent {
  title = 'Antigravity Fullstack App';
  environment = environment;

  onExplore() {
    alert('Welcome to Antigravity web interface powered by Angular & PrimeNG!');
  }
}
