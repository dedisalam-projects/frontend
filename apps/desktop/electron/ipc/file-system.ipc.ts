import { ipcMain } from 'electron';

export function registerFileSystemHandlers() {
  // Placeholder for file system IPC handlers
  ipcMain.handle('fs:dummy', async () => {
    return 'FileSystem IPC works';
  });
}
