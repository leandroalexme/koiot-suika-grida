import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'KoiotCore',
      fileName: 'core'
    },
    rollupOptions: {
      external: ['@koiot/common', '@koiot/geo', 'canvaskit-wasm'],
      output: {
        globals: {
          '@koiot/common': 'KoiotCommon',
          '@koiot/geo': 'KoiotGeo',
          'canvaskit-wasm': 'CanvasKit'
        }
      }
    }
  }
});