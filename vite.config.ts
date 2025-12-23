import { defineConfig } from 'vite';
// import dts from 'vite-plugin-dts';
import solidPlugin from 'vite-plugin-solid';
import path from 'node:path';
import url from 'node:url';
import pkg from './package.json';
import tsconfig from './tsconfig.json';

const createPath = (p: string) => url.fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  plugins: [
    // dts({
    //   rollupTypes: true,
    //   outDir: path.resolve(__dirname, './dist/types'),
    // }),
    solidPlugin(),
  ],
  build: {
    target: tsconfig.compilerOptions.target,
    minify: false,
    sourcemap: true,
    lib: {
      entry: {
        '': createPath('./src/modal/index.ts'),
      },
      name: pkg.name,
      formats: ['es'],
      fileName: (_, entryName) => {
        return path.format({
          dir: entryName,
          base: 'index.js',
        });
      },
    },
    rollupOptions: {
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
