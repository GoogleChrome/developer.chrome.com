const {dest, src} = require('gulp');
const misc = () => {
  return src('./site/_misc/**/*').pipe(dest('dist/'));
};

module.exports = misc;
