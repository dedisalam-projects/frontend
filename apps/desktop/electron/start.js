const { spawn } = require('child_process');
const http = require('http');

function checkServer() {
  http
    .get('http://localhost:4201', () => {
      console.log('Angular dev server is ready, starting Electron...');
      startElectron();
    })
    .on('error', () => {
      setTimeout(checkServer, 1000);
    });
}

function startElectron() {
  const electronProcess = spawn('npx', ['electron', 'dist/apps/desktop-electron/main.js'], {
    shell: true,
    stdio: 'inherit',
    env: { ...process.env, ELECTRON_IS_DEV: 'true' },
  });

  electronProcess.on('close', (code) => {
    process.exit(code || 0);
  });
}

console.log('Waiting for Angular dev server on port 4201...');
checkServer();
