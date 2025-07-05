import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: '/', // Добави този ред
  build: {
    outDir: 'build', // Добави този блок
  },
  server: {
    historyApiFallback: true, // Добави този блок
  }
});
