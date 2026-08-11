import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { APIGatewayService } from '@dedisalam/shared/data-access';
import { environment } from '../../../environments/environment';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-hello-world',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzCardModule, NzIconModule],
  template: `
    <div class="flex flex-col gap-6 p-6">
      <nz-card [nzTitle]="'Dashboard Hello World E2E'">
        <p class="text-slate-600 dark:text-slate-300 mb-4">
          Halaman ini memvalidasi siklus penuh E2E dari Frontend (Angular) ke Gateway, lalu ke User
          Service (TCP), diteruskan ke Notification Service (RabbitMQ), dan kembali ke Frontend via
          WebSocket (Socket.IO).
        </p>

        <div class="flex gap-4">
          <button nz-button nzType="primary" (click)="kirimSapaan()" [nzLoading]="isLoading">
            <span nz-icon nzType="send"></span> Kirim Sapaan
          </button>
        </div>

        <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded">
          <h4 class="font-semibold mb-2 dark:text-gray-200">Status WebSocket</h4>
          <p
            [class.text-green-600]="isConnected"
            [class.text-red-600]="!isConnected"
            class="font-medium"
          >
            {{ wsStatus }}
          </p>
        </div>
      </nz-card>
    </div>
  `,
})
export class HelloWorldComponent implements OnInit, OnDestroy {
  private apiService = inject(APIGatewayService);
  private message = inject(NzMessageService);

  isLoading = false;
  socket: Socket | null = null;
  isConnected = false;
  wsStatus = 'Menghubungkan ke WebSocket...';

  ngOnInit() {
    this.initWebSocket();
  }

  initWebSocket() {
    try {
      this.socket = io(`${environment.wsUrl}/notifications`, {
        transports: ['websocket'],
      });

      this.socket.on('connect', () => {
        this.isConnected = true;
        this.wsStatus = 'Terhubung ke Socket.IO Gateway (/notifications)';
      });

      this.socket.on('hello', (data: any) => {
        // Tangkap event WebSocket yang masuk, lalu tampilkan Toast/Notification
        this.message.success(`WebSocket Event Diterima: ${data?.message || 'New notification'}`, {
          nzDuration: 5000,
        });
      });

      this.socket.on('disconnect', () => {
        this.isConnected = false;
        this.wsStatus = 'Terputus dari Socket.IO Gateway';
      });

      this.socket.on('connect_error', (err) => {
        this.isConnected = false;
        this.wsStatus = `Error koneksi WebSocket: ${err.message}`;
      });
    } catch (err: any) {
      this.wsStatus = `Gagal menginisialisasi socket: ${err.message}`;
    }
  }

  kirimSapaan() {
    this.isLoading = true;
    this.apiService.getHello().subscribe({
      next: (res: any) => {
        this.message.info(`REST API Berhasil: ${res?.message}`);
        this.isLoading = false;
      },
      error: (err: any) => {
        this.message.error(`REST API Gagal: ${err.message}`);
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
