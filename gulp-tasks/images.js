const {dest, src} = require('gulp');
const images = () => {
  return src('./site/_images/**/*').pipe(dest('dist/images/'));
};

module.exports = images;
