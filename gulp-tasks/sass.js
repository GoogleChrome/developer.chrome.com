const {dirname} = require('path');
const {mkdirSync, writeFileSync} = require('fs');
const sassProcessor = require('sass');

const src = './site/_scss/main.scss';
const dest = './dist/css/main.css';

const chromeSrc = './site/_scss/chrome-main.scss';
const chromeDest = './dist/css/chrome-main.css';

// Flags whether we generate sourcemaps
const isProduction = process.env.NODE_ENV === 'production';

// Techincally we're rendering synchronously so we don't need an async function,
// but gulp requires all tasks to return a promise.
const sass = async () => {
  // nb. No need to catch errors because gulp handles that for us and logs them.
  const result = sassProcessor.renderSync({
    file: src,
    chromeFile: chromeSrc,
    // nb. Sass doesn't actually write to this outFile, the caller must do that
    // themselves.
    // outFile is used to determine the URL used to link from the generated CSS
    // to the source map, and from the source map to the Sass source files.
    outFile: dest,
    outChromeFile: chromeDest,
    sourceMap: !isProduction,
  });

  const chromeResult = sassProcessor.renderSync({
    file: chromeSrc,
    // nb. Sass doesn't actually write to this outFile, the caller must do that
    // themselves.
    // outFile is used to determine the URL used to link from the generated CSS
    // to the source map, and from the source map to the Sass source files.
    outFile: chromeDest,
    sourceMap: !isProduction,
  });

  mkdirSync(dirname(dest), {recursive: true});
  writeFileSync(dest, result.css.toString(), 'utf8');

  mkdirSync(dirname(chromeDest), {recursive: true});
  writeFileSync(chromeDest, chromeResult.css.toString(), 'utf8');

  // I'm not guarding for result.map here because if we're doing a dev build we
  // expect it to be defined and if it isn't, we want it to blow up.
  if (!isProduction) {
    writeFileSync(dest + '.map', result.map.toString(), 'utf8');
    writeFileSync(chromeDest + '.map', chromeResult.map.toString(), 'utf8');
  }
};

module.exports = sass;
