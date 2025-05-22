import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': './src',
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: './index.html', // Adjust this if your entry HTML is elsewhere
    },
  },
  server: {
    host: '0.0.0.0',
  },
  preview: {
    allowedHosts: ['pesona-web.onrender.com'],
  },
});
