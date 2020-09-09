const {dest, src} = require('gulp');
const fonts = () => {
  return src('./site/_fonts/**/*').pipe(dest('dist/fonts/'));
};

module.exports = fonts;
