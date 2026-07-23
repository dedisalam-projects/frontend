import { Injectable, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket | null = null;
  socketMessage = signal<string>('Connecting to websocket...');

  connectNotificationNamespace() {
    if (this.socket) {
      return;
    }

    this.socket = io(`${environment.wsUrl}/notifications`, {
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket namespace /notifications');
      this.socketMessage.set('Connected to gateway! Waiting for event...');
    });

    this.socket.on('hello', (data: { message?: string }) => {
      console.log('Received hello event from WebSocket:', data);
      this.socketMessage.set(data?.message || 'Received notification');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
      this.socketMessage.set('Disconnected from gateway.');
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}
