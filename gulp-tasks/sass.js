const {dirname} = require('path');
const {mkdirSync, writeFileSync} = require('fs');
const sassProcessor = require('sass');

const entrypoints = [
  {
    src: './site/_scss/layouts/main.scss',
    dest: './dist/css/main.css',
  },
  {
    src: './site/_scss/layouts/chrome-100.scss',
    dest: './dist/css/chrome-main.css',
  },
  {
    src: './site/_scss/layouts/meet-the-team.scss',
    dest: './dist/css/meet-the-team.css',
  },
  {
    src: './site/_scss/layouts/styleguide.scss',
    dest: './dist/css/styleguide.css',
  },
  {
    src: './site/_scss/layouts/home.scss',
    dest: './dist/css/home.css',
  },
  {
    src: './site/_scss/layouts/fugu-showcase.scss',
    dest: './dist/css/fugu-showcase.css',
  },
  {
    src: './site/_scss/layouts/landing.scss',
    dest: './dist/css/landing.css',
  },
  {
    src: './site/_scss/layouts/overview.scss',
    dest: './dist/css/overview.css',
  },
  {
    src: './site/_scss/layouts/single-post.scss',
    dest: './dist/css/single-post.css',
  },
];

// Flags whether we generate sourcemaps
const isProduction = process.env.NODE_ENV === 'production';

// Techincally we're rendering synchronously so we don't need an async function,
// but gulp requires all tasks to return a promise.
const sass = async () => {
  // nb. No need to catch errors because gulp handles that for us and logs them.
  entrypoints.forEach(entrypoint => {
    const result = sassProcessor.renderSync({
      file: entrypoint.src,
      // nb. Sass doesn't actually write to this outFile, the caller must do that
      // themselves.
      // outFile is used to determine the URL used to link from the generated CSS
      // to the source map, and from the source map to the Sass source files.
      outFile: entrypoint.dest,
      sourceMap: !isProduction,
    });

    mkdirSync(dirname(entrypoint.dest), {recursive: true});
    writeFileSync(entrypoint.dest, result.css.toString(), 'utf8');

    // I'm not guarding for result.map here because if we're doing a dev build we
    // expect it to be defined and if it isn't, we want it to blow up.
    if (!isProduction) {
      writeFileSync(entrypoint.dest + '.map', result.map.toString(), 'utf8');
    }
  });
};

module.exports = sass;
