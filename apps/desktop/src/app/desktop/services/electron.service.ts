import { Injectable } from '@angular/core';

interface ElectronAPI {
  checkBridge(message: string): Promise<string>;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  private electronAPI: ElectronAPI | undefined;

  constructor() {
    if (window.electronAPI) {
      this.electronAPI = window.electronAPI;
    } else {
      console.warn('Electron API not found. If you are running in browser mode, this is normal.');
    }
  }

  get isElectron(): boolean {
    return !!this.electronAPI;
  }

  async checkBridge(message: string): Promise<string> {
    if (this.electronAPI) {
      return await this.electronAPI.checkBridge(message);
    }
    throw new Error('Electron API is not available.');
  }
}
