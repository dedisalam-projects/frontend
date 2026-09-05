import { Component, OnInit, OnDestroy, signal, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { io, Socket } from 'socket.io-client';
import { APIGatewayService, HelloResponse } from '@dedisalam/shared/data-access';

@Component({
  selector: 'lib-hello-world',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hello-world-card" style="padding: 1rem; margin-bottom: 1rem;">
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.75rem;">
        Fullstack Hello World Integration
      </h3>

      <!-- REST API Section -->
      <div
        style="margin-bottom: 0.75rem; padding: 0.75rem; background-color: #eff6ff; border-radius: 0.5rem;"
      >
        <h4 style="font-weight: 600; color: #1e40af; margin: 0 0 0.5rem 0;">
          REST API Status (/api/v1/hello)
        </h4>
        @if (loading()) {
          <p style="margin: 0; color: #4b5563;">Loading payload from API Gateway...</p>
        } @else if (apiData()) {
          <p style="margin: 0; color: #15803d; font-weight: 500;">
            <strong>Message:</strong> {{ apiData()?.message }}
          </p>
          <p style="margin: 0; color: #374151;">
            <strong>User Service TCP Status:</strong> {{ apiData()?.services?.user }}
          </p>
        } @else if (apiError()) {
          <p style="margin: 0; color: #dc2626;"><strong>Error:</strong> {{ apiError() }}</p>
        }
      </div>

      <!-- WebSocket Section -->
      <div style="padding: 0.75rem; background-color: #faf5ff; border-radius: 0.5rem;">
        <h4 style="font-weight: 600; color: #6b21a8; margin: 0 0 0.5rem 0;">
          WebSocket Push Event (/notifications)
        </h4>
        <p style="margin: 0; color: #581c87; font-weight: 500;">{{ socketStatus() }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .hello-world-card {
        border: 1px solid var(--surface-border, #dfe7ef);
        border-radius: 8px;
        box-shadow:
          0 4px 6px -1px rgb(0 0 0 / 0.1),
          0 2px 4px -2px rgb(0 0 0 / 0.1);
      }
    `,
  ],
})
export class HelloWorldComponent implements OnInit, OnDestroy {
  @Input() baseUrl = 'http://localhost:3000';
  @Input() wsUrl = 'http://localhost:3000';

  private apiService = inject(APIGatewayService);
  private socket: Socket | null = null;

  loading = signal<boolean>(true);
  apiData = signal<HelloResponse | null>(null);
  apiError = signal<string | null>(null);
  socketStatus = signal<string>('Initializing WebSocket connection...');

  ngOnInit() {
    this.fetchHello();
    this.initWebSocket();
  }

  fetchHello() {
    this.loading.set(true);
    this.apiService.getHello().subscribe({
      next: (res: HelloResponse) => {
        this.apiData.set(res);
        this.loading.set(false);
      },
      error: (err: any) => {
        this.apiError.set(err.message || 'Failed to connect to Gateway API');
        this.loading.set(false);
      },
    });
  }

  initWebSocket() {
    try {
      this.socket = io(`${this.wsUrl}/notifications`, {
        transports: ['websocket'],
      });

      this.socket.on('connect', () => {
        this.socketStatus.set('Connected to Socket.IO gateway! Waiting for event...');
      });

      this.socket.on('hello', (data: { message?: string }) => {
        this.socketStatus.set(`Received WS event: "${data?.message || 'hello'}"`);
      });

      this.socket.on('disconnect', () => {
        this.socketStatus.set('Disconnected from Socket.IO gateway.');
      });

      this.socket.on('connect_error', (err) => {
        this.socketStatus.set(`WebSocket connection error: ${err.message}`);
      });
    } catch (err: any) {
      this.socketStatus.set(`Failed to initialize socket: ${err.message}`);
    }
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
