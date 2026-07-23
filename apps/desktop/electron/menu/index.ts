import { Menu, BrowserWindow, MenuItemConstructorOptions } from 'electron';

export function setupNativeMenu(_window: BrowserWindow) {
  // Placeholder to set up Native Menu options
  const template: MenuItemConstructorOptions[] = [
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
