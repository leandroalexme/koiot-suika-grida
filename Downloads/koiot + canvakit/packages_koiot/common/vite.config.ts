import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'KoiotCommon',
      fileName: 'common'
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  }
});