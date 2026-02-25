import { build } from 'vite';
import dts from 'vite-plugin-dts';
import solidPlugin from 'vite-plugin-solid';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const resolvePath = (p) => fileURLToPath(new URL(p, import.meta.url));

const libraries = [
  {
    entry: resolvePath('../src/modal/index.ts'),
    fileName: 'index',
  },
];

libraries.forEach(async (lib) => {
  await build({
    plugins: [
      solidPlugin(),
      dts({
        include: dirname(lib.entry),
        tsconfigPath: resolvePath('../tsconfig.json'),
        rollupTypes: true,
      }),
    ],
    build: {
      outDir: resolvePath('../dist'),
      lib: {
        ...lib,
        formats: ['es'],
      },
      emptyOutDir: true,
    },
  });
});
