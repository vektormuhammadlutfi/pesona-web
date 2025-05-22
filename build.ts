import { execSync } from 'node:child_process';

const buildCommand = 'vite build';

try {
  execSync(buildCommand, { stdio: 'inherit' });
  console.log('Vite build successful!');
} catch (error) {
  console.error('Vite build failed:', error);
  process.exit(1);
}
