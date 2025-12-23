import { defineConfig } from 'tsup';
import * as preset from 'tsup-preset-solid';
import pkg from './package.json';
import { solidPlugin } from 'esbuild-plugin-solid';

const preset_options: preset.PresetOptions = {
  entries: [
    // default entry (index)
    {
      entry: './src/modal/index.ts',
      // will generate a separate development entry
      dev_entry: false,
    },
  ],
  drop_console: true,
  cjs: false,
};

const CI =
  process.env['CI'] === 'true' ||
  process.env['GITHUB_ACTIONS'] === 'true' ||
  process.env['CI'] === '"1"' ||
  process.env['GITHUB_ACTIONS'] === '"1"';

export default defineConfig(config => {
  const watching = !!config.watch;

  const parsed_options = preset.parsePresetOptions(preset_options, watching);

  // if (!watching && !CI) {
  //   const package_fields = preset.generatePackageExports(parsed_options);

  //   console.log(`package.json: ${JSON.stringify(package_fields, null, 2)}`);

  //   // will update ./package.json with the correct export fields
  //   // preset.writePackageJson(package_fields);
  // }

  const newConfig = preset.generateTsupOptions(parsed_options);
  console.log(JSON.stringify(newConfig, null, 2));

  return Object.assign(newConfig, {
    // external: [/^\.\/[\w-_]+\.css$/],
  });
});

// export default defineConfig([
//   {
//     target: 'esnext',
//     platform: 'browser',
//     format: 'esm',
//     clean: true,
//     dts: true,
//     entry: {
//       index: 'src/modal/index.ts',
//     },
//     outDir: 'dist/',
//     treeshake: {
//       preset: 'safest',
//     },
//     replaceNodeEnv: true,
//     esbuildPlugins: [solidPlugin()],
//   },
// ]);
