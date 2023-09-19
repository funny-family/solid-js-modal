import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import solidDevtools from 'solid-devtools/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [
    solidDevtools({
      autoname: true,
      locator: {
        targetIDE: 'vscode',
        componentLocation: true,
        jsxLocation: true,
      },
    }),
    solidPlugin({
      include: ['src/**/*', path.resolve(__dirname, '../lib/**/*')],
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
  ],
  build: {
    target: 'esnext',
  },
  server: {
    port: 6783,
    strictPort: true,
  },
});
