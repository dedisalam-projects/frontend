import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HelloWorldComponent as SharedHelloWorldComponent } from '@dedisalam/shared/ui';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hello-world',
  standalone: true,
  imports: [NzButtonModule, NzCardModule, NzIconModule, SharedHelloWorldComponent],
  template: `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <nz-card>
        <div style="font-weight: 600; font-size: 1.5rem; margin-bottom: 1rem;">
          Welcome to <span style="color: #2563eb;">{{ title }}</span>
        </div>

        <p style="color: #475569;">
          A modular fullstack application utilizing NestJS backend services, RabbitMQ messaging,
          Redis cache storage, and a responsive frontend web experience powered by NG-ZORRO.
        </p>

        <!-- Reusable Shared Hello World Component -->
        <div style="margin-top: 1rem; border-top: 1px solid #e2e8f0; padding-top: 1rem;">
          <lib-hello-world
            [baseUrl]="environment.apiUrl"
            [wsUrl]="environment.wsUrl"
          ></lib-hello-world>
        </div>

        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
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
