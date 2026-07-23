import { Tray } from 'electron';

// eslint-disable-next-line prefer-const
let tray: Tray | null = null;

export function setupSystemTray() {
  // Placeholder for System Tray setup
  console.log('[Electron Tray] System tray initialized.');
  return tray;
}
