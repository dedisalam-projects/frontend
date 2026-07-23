import { ipcMain } from 'electron';
import { registerFileSystemHandlers } from './file-system.ipc';
import { registerNotificationHandlers } from './notification.ipc';

export function registerIpcHandlers() {
  registerFileSystemHandlers();
  registerNotificationHandlers();

  // Register check-bridge IPC handler
  ipcMain.handle('check-bridge', async (event, message: string) => {
    console.log(`[Electron Main Modular] Received check-bridge request: ${message}`);
    return `Hello from Electron Main Process! Received: "${message}"`;
  });
}
