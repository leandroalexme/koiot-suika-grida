import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'KoiotGeo',
      fileName: 'geo'
    },
    rollupOptions: {
      external: ['@koiot/common'],
      output: {
        globals: {
          '@koiot/common': 'KoiotCommon'
        }
      }
    }
  }
});