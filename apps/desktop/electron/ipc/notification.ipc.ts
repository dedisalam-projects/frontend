import { ipcMain } from 'electron';

export function registerNotificationHandlers() {
  // Placeholder for native notification IPC handlers
  ipcMain.handle('notification:dummy', async () => {
    return 'Notification IPC works';
  });
}
