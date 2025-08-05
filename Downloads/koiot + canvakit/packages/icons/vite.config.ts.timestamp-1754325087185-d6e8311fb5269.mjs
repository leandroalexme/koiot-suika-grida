// vite.config.ts
import typescript from "file:///Users/leandroalex/Downloads/koiot%20+%20canvakit/node_modules/.pnpm/@rollup+plugin-typescript@11.1.6_rollup@4.45.1_tslib@2.8.1_typescript@5.7.2/node_modules/@rollup/plugin-typescript/dist/es/index.js";
import react from "file:///Users/leandroalex/Downloads/koiot%20+%20canvakit/node_modules/.pnpm/@vitejs+plugin-react-swc@3.11.0_vite@5.4.19_@types+node@20.19.8_less@4.4.0_sass@1.89.2_terser@5.43.1_/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { defineConfig } from "file:///Users/leandroalex/Downloads/koiot%20+%20canvakit/node_modules/.pnpm/vite@5.4.19_@types+node@20.19.8_less@4.4.0_sass@1.89.2_terser@5.43.1/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "/Users/leandroalex/Downloads/koiot + canvakit/packages/icons";
var resolvePath = (str) => path.resolve(__vite_injected_original_dirname, str);
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "icons",
      fileName: (format) => `icons.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "react-dom/client"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      },
      plugins: [
        typescript({
          target: "esnext",
          rootDir: resolvePath("src"),
          declaration: true,
          declarationDir: resolvePath("dist"),
          exclude: resolvePath("node_modules/**"),
          allowSyntheticDefaultImports: true
        })
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbGVhbmRyb2FsZXgvRG93bmxvYWRzL2tvaW90ICsgY2FudmFraXQvcGFja2FnZXMvaWNvbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9sZWFuZHJvYWxleC9Eb3dubG9hZHMva29pb3QgKyBjYW52YWtpdC9wYWNrYWdlcy9pY29ucy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbGVhbmRyb2FsZXgvRG93bmxvYWRzL2tvaW90JTIwKyUyMGNhbnZha2l0L3BhY2thZ2VzL2ljb25zL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHR5cGVzY3JpcHQgZnJvbSAnQHJvbGx1cC9wbHVnaW4tdHlwZXNjcmlwdCc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5cbmNvbnN0IHJlc29sdmVQYXRoID0gKHN0cjogc3RyaW5nKSA9PiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBzdHIpO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6ICdzcmMvaW5kZXgudHMnLFxuICAgICAgbmFtZTogJ2ljb25zJyxcbiAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgaWNvbnMuJHtmb3JtYXR9LmpzYCxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC9qc3gtcnVudGltZScsICdyZWFjdC1kb20vY2xpZW50J10sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHJlYWN0OiAnUmVhY3QnLFxuICAgICAgICAgICdyZWFjdC1kb20nOiAnUmVhY3RET00nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgdHlwZXNjcmlwdCh7XG4gICAgICAgICAgdGFyZ2V0OiAnZXNuZXh0JyxcbiAgICAgICAgICByb290RGlyOiByZXNvbHZlUGF0aCgnc3JjJyksXG4gICAgICAgICAgZGVjbGFyYXRpb246IHRydWUsXG4gICAgICAgICAgZGVjbGFyYXRpb25EaXI6IHJlc29sdmVQYXRoKCdkaXN0JyksXG4gICAgICAgICAgZXhjbHVkZTogcmVzb2x2ZVBhdGgoJ25vZGVfbW9kdWxlcy8qKicpLFxuICAgICAgICAgIGFsbG93U3ludGhldGljRGVmYXVsdEltcG9ydHM6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBXLE9BQU8sZ0JBQWdCO0FBQ2pZLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyxvQkFBb0I7QUFIN0IsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTSxjQUFjLENBQUMsUUFBZ0IsS0FBSyxRQUFRLGtDQUFXLEdBQUc7QUFHaEUsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFVBQVUsQ0FBQyxXQUFXLFNBQVMsTUFBTTtBQUFBLElBQ3ZDO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsU0FBUyxhQUFhLHFCQUFxQixrQkFBa0I7QUFBQSxNQUN4RSxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxhQUFhO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLFdBQVc7QUFBQSxVQUNULFFBQVE7QUFBQSxVQUNSLFNBQVMsWUFBWSxLQUFLO0FBQUEsVUFDMUIsYUFBYTtBQUFBLFVBQ2IsZ0JBQWdCLFlBQVksTUFBTTtBQUFBLFVBQ2xDLFNBQVMsWUFBWSxpQkFBaUI7QUFBQSxVQUN0Qyw4QkFBOEI7QUFBQSxRQUNoQyxDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
