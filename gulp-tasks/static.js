/**
 * @fileoverview Provides a gulp task which copies static assets, ones which are not rewritten or
 * modified as part of output, to the dist folder.
 */

const {dest, src} = require('gulp');
const merge = require('merge-stream');

const misc = () => {
  const task = src('./site/_static/**/*').pipe(dest('dist/'));
  const dccTask = src('./site/static/**/*').pipe(dest('dist/static/'));

  return merge([task, dccTask]);
};

module.exports = misc;
