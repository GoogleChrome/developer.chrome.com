// A Rollup plugin which locates modules using the Node resolution algorithm,
// for using third party modules in node_modules
import {nodeResolve} from '@rollup/plugin-node-resolve';

// A Rollup plugin to convert CommonJS modules to ES6, so they can be included
// in a Rollup bundle
import commonjs from '@rollup/plugin-commonjs';
import svg from 'rollup-plugin-svg';

// A Rollup plugin to minify generated ES bundles. Uses terser under the hood.
import {terser} from 'rollup-plugin-terser';

// A Rollup plugin for copying files.
import copy from 'rollup-plugin-copy';

// A Rollup plugin for reading JSON files.
import json from '@rollup/plugin-json';

const devConfig = {
  input: [
    'site/_js/main.js',
    // Scripts used on /100 page
    'site/_js/100.js',
    'site/_js/events.js',
    'site/_js/styleguide.js',
    'site/_js/fugu-showcase.js',
  ],
  output: {
    dir: 'dist/js',
    format: 'esm',
  },
  watch: {
    // By default rollup clears the console on every build. This disables that.
    clearScreen: false,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    svg(),
    json(),
    copy({
      // Legacy docs, like those at /docs/native-client/, rely on the old
      // prettify.js code for syntax highlighting.
      targets: [
        {src: 'site/_js/prettify.js', dest: 'dist/js'},
        {src: 'site/_js/slider.js', dest: 'dist/js'},
      ],
    }),
  ],
};

const productionConfig = {
  input: [
    'site/_js/main.js',
    'site/_js/100.js',
    'site/_js/events.js',
    'site/_js/styleguide.js',
    'site/_js/fugu-showcase.js',
  ],
  output: {
    dir: 'dist/js',
    format: 'esm',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    svg(),
    json(),
    terser({
      format: {
        // Remove all comments, including @license comments,
        // otherwise LHCI complains at us.
        comments: false,
      },
    }),
    copy({
      targets: [
        {src: 'site/_js/prettify.js', dest: 'dist/js'},
        {src: 'site/_js/slider.js', dest: 'dist/js'},
      ],
    }),
  ],
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
