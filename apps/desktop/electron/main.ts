import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { registerIpcHandlers } from './ipc';
import { setupNativeMenu } from './menu';
import { setupSystemTray } from './tray';
import { setupAutoUpdater } from './updater';

let mainWindow: BrowserWindow | null = null;

const isDev = process.env['ELECTRON_IS_DEV'] === 'true' || !app.isPackaged;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Batasi navigasi window baru untuk alasan keamanan
  mainWindow.webContents.setWindowOpenHandler(() => {
    return { action: 'deny' };
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:4201');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../desktop/browser/index.html'));
  }

  // Setup Native Menu
  setupNativeMenu(mainWindow);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Register all modular IPC Handlers
registerIpcHandlers();

app.on('ready', () => {
  createWindow();
  setupSystemTray();
  setupAutoUpdater();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
