import { spawn } from 'child_process';
import path from 'path';

console.log('🍅 Starting Full-Stack Food Delivery Platform...');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

// 1. Start Server
const serverProcess = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(process.cwd(), 'server'),
  stdio: 'inherit',
  shell: true
});

// 2. Start Client
const clientProcess = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(process.cwd(), 'client'),
  stdio: 'inherit',
  shell: true
});

const cleanup = () => {
  serverProcess.kill();
  clientProcess.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
