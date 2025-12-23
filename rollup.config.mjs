import withSolid from 'rollup-preset-solid';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-import-css';

export default withSolid([
  {
    input: './src/modal/index.ts',
    targets: ['esm'],
    plugins: [
      resolve({
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
      }),
      css({
        include: './src/modal/modal.styles.css',
      }),
    ],
  },
]);
