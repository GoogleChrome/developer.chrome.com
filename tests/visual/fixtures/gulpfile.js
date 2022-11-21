const {parallel} = require('gulp');

// Pull in each task
const sassTask = require('../../../gulp-tasks/sass');

// The default (if someone just runs `gulp`) is to run each task in parrallel
exports.default = parallel(sassTask);
