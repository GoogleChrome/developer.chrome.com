/**
 * @fileoverview Provides a gulp task which copies static assets, ones which are not rewritten or
 * modified as part of output, to the dist folder.
 */

const {dest, src} = require('gulp');
const misc = () => {
  return src('./site/_static/**/*').pipe(dest('dist/'));
};

module.exports = misc;
