var open = require('gulp-open');

module.exports = function (paths, plugins) {
  gulp.task('coverage', function () {
    return gulp.src(paths.coverage)
      .pipe(open());
  });
};
