import { defineConfig } from 'vite';
import solidDevtools from 'solid-devtools/vite';
import solidStart from 'solid-start/vite';
import path from 'node:path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  server: {
    port: 6783,
    strictPort: true,
  },
  plugins: [
    solidDevtools({
      autoname: true,
      locator: {
        targetIDE: 'vscode',
        componentLocation: true,
        jsxLocation: true,
      },
    }),
    solidStart({
      ssr: false,
      hot: true,
      appRoot: path.resolve(__dirname, './playground/src/'),
      rootEntry: path.resolve(__dirname, './playground/src/root.tsx'),
      clientEntry: path.resolve(__dirname, './playground/src/entry-client.tsx'),
      serverEntry: path.resolve(__dirname, './playground/src/entry-server.tsx'),
    }),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, './lib/modal/index.ts'),
      name: 'solid-js-modal',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['solid-js'],
      output: {
        globals: {
          'solid-js': 'solidJs',
        },
      },
    },
    sourcemap: true,
  },
});
