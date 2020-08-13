// A Rollup plugin which locates modules using the Node resolution algorithm,
// for using third party modules in node_modules
import {nodeResolve} from '@rollup/plugin-node-resolve';

// A Rollup plugin to minify generated ES bundles. Uses terser under the hood.
import {terser} from 'rollup-plugin-terser';

const devConfig = {
  input: 'site/_js/main.js',
  output: {
    dir: 'dist/js',
    format: 'esm',
  },
  watch: {
    // By default rollup clears the console on every build. This disables that.
    clearScreen: false,
  },
  plugins: [nodeResolve()],
};

const productionConfig = {
  input: 'site/_js/main.js',
  output: {
    dir: 'dist/js',
    format: 'esm',
  },
  plugins: [nodeResolve(), terser()],
};

/**
 * Determine which rollup config to return based on the environment.
 *
 * Note: You can also pass custom command line arguments to rollup if they're
 * prefixed with `config*`.
 *
 * Example: rollup -c --configFoo  # sets commandLineArgs.configFoo to true
 *
 * The commandLineArgs argument gets passed to this function, but we're omitting
 * it here because we don't use it.
 * Learn more @ https://rollupjs.org/guide/en/
 */
export default () => {
  if (process.env.NODE_ENV === 'production') {
    return productionConfig;
  }
  return devConfig;
};
