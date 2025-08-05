import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  base: './',
  resolve: {
    alias: {
      '@suika/theme': path.resolve(__dirname, '../../packages/theme'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${path.resolve(
          __dirname,
          '../../packages/theme/src/index.scss',
        )}";`,
      },
    },
  },
  server: {
    port: 6167,
    host: true,
    // 🚀 Configuração para servir arquivos WASM corretamente
    fs: {
      allow: ['..', '../../node_modules']
    }
  },
  // 🔧 Configurações específicas para CanvasKit WASM
  assetsInclude: ['**/*.wasm'],
  optimizeDeps: {
    exclude: ['canvaskit-wasm']
  },
  build: {
    outDir: 'build',
    cssCodeSplit: false,
    // 🎯 Configurar para copiar arquivos WASM
    rollupOptions: {
      external: ['fs', 'path']
    }
  },
});
