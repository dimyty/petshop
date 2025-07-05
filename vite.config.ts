import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Добави този импорт

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Решава проблем с пътищата
    }
  },
  server: {
    historyApiFallback: true,
  }
});
