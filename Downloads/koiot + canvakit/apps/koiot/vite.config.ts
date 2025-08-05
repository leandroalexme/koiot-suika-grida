import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    host: true
  },
  resolve: {
    alias: {
      '@koiot/core': resolve(__dirname, '../../packages_koiot/core/src'),
      '@koiot/common': resolve(__dirname, '../../packages_koiot/common/src'),
      '@koiot/geo': resolve(__dirname, '../../packages_koiot/geo/src')
    }
  },
  optimizeDeps: {
    include: ['canvaskit-wasm']
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          canvaskit: ['canvaskit-wasm']
        }
      }
    }
  }
});