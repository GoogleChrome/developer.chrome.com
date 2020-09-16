const {dest, src} = require('gulp');
const sassProcessor = require('gulp-sass');

// We want to be using canonical Sass, rather than node-sass
sassProcessor.compiler = require('sass');

// Flags whether we generate sourcemaps
const isProduction = process.env.NODE_ENV === 'production';

// The main Sass method grabs all root Sass files,
// processes them, then sends them to the output calculator
const sass = () => {
  return src('./site/_scss/**/*.scss', {sourcemaps: !isProduction})
    .pipe(sassProcessor().on('error', sassProcessor.logError))
    .pipe(dest('./dist/css', {sourcemaps: !isProduction}));
};

module.exports = sass;
