import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HelloWorldComponent as SharedHelloWorldComponent } from '@dedisalam/shared/ui';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hello-world',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzCardModule, NzIconModule, SharedHelloWorldComponent],
  template: `
    <div class="flex flex-col gap-6">
      <nz-card>
        <div class="font-semibold text-2xl mb-4">
          Welcome to <span class="text-blue-600 dark:text-blue-400">{{ title }}</span>
        </div>

        <p class="text-slate-600 dark:text-slate-300">
          A modular fullstack application utilizing NestJS backend services, RabbitMQ messaging,
          Redis cache storage, and a responsive frontend web experience powered by NG-ZORRO.
        </p>

        <!-- Reusable Shared Hello World Component -->
        <div class="mt-4 border-t border-slate-200 dark:border-slate-700 pt-4">
          <lib-hello-world
            [baseUrl]="environment.apiUrl"
            [wsUrl]="environment.wsUrl"
          ></lib-hello-world>
        </div>

        <div class="flex gap-4 mt-6">
          <button nz-button nzType="primary" (click)="onExplore()">
            <span nz-icon nzType="thunderbolt"></span> Explore Console
          </button>
          <button nz-button nzType="default">
            <span nz-icon nzType="book"></span> Documentation
          </button>
        </div>
      </nz-card>
    </div>
  `,
})
export class HelloWorldComponent {
  title = 'Antigravity Fullstack App';
  environment = environment;

  onExplore() {
    alert('Welcome to Antigravity web interface powered by Angular & NG-ZORRO!');
  }
}
