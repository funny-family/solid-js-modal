import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import dts from 'vite-plugin-dts';
import path from 'node:path';

export default defineConfig({
  plugins: [
    solidPlugin({
      include: 'lib/**/*',
      extensions: ['jsx', 'tsx', 'js', 'ts'],
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
      input: {
        entry: path.resolve(__dirname, './lib/modal/index.ts'),
      },
      external: ['solid-js'],
      output: {
        exports: 'named',
        globals: {
          'solid-js': 'solidJs',
        },
      },
    },
    emptyOutDir: false,
  },
});
