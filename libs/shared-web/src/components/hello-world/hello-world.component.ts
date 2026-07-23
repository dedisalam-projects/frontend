import { Component, OnInit, OnDestroy, signal, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { io, Socket } from 'socket.io-client';
import { APIGatewayService } from '../../lib/api/gateway.service.service';
import { HelloResponse } from '../../lib/api/model/helloResponse';

@Component({
  selector: 'lib-hello-world',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hello-world-card p-4 border-round surface-card shadow-2 mb-4">
      <h3 class="text-xl font-bold mb-3">Fullstack Hello World Integration</h3>

      <!-- REST API Section -->
      <div class="rest-status mb-3 p-3 bg-blue-50 border-round">
        <h4 class="font-semibold text-blue-800 m-0 mb-2">REST API Status (/api/v1/hello)</h4>
        @if (loading()) {
          <p class="m-0 text-gray-600">Loading payload from API Gateway...</p>
        } @else if (apiData()) {
          <p class="m-0 text-green-700 font-medium">
            <strong>Message:</strong> {{ apiData()?.message }}
          </p>
          <p class="m-0 text-gray-700">
            <strong>User Service TCP Status:</strong> {{ apiData()?.services?.user }}
          </p>
        } @else if (apiError()) {
          <p class="m-0 text-red-600"><strong>Error:</strong> {{ apiError() }}</p>
        }
      </div>

      <!-- WebSocket Section -->
      <div class="ws-status p-3 bg-purple-50 border-round">
        <h4 class="font-semibold text-purple-800 m-0 mb-2">
          WebSocket Push Event (/notifications)
        </h4>
        <p class="m-0 text-purple-900 font-medium">{{ socketStatus() }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .hello-world-card {
        border: 1px solid var(--surface-border, #dfe7ef);
        border-radius: 8px;
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
    this.apiService.appControllerGetHello().subscribe({
      next: (res) => {
        this.apiData.set(res);
        this.loading.set(false);
      },
      error: (err) => {
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
