import { join } from 'path';
import { fileURLToPath } from 'url';

// Declare Bun as a global variable for TypeScript
declare const Bun: any;

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const port = parseInt(process.env.PORT || '3000', 10);
const distDir = join(__dirname, 'dist');

// Assume Bun is available in the Render.com environment
// @ts-ignore: Bun is available globally in the Bun runtime
const serve = Bun.serve; // Assuming Bun is available globally

serve({
  port,
  fetch(req) {
    const filePath = join(distDir, req.url);
    try {
      const file = Bun.file(filePath);
      return new Response(file);
    } catch (err) {
      return new Response('Not Found', { status: 404 });
    }
  },
});
