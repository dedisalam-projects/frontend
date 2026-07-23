import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  checkBridge: (message: string) => ipcRenderer.invoke('check-bridge', message),
});
