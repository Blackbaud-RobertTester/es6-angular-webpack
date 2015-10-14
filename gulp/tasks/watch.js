module.exports = function (paths, plugins) {
  return gulp.task('watch', ['serve'], function () {
    gulp.watch(paths.html, ['reload', 'templates']);
    gulp.watch(paths.styles, ['bundle', 'reload']);
    gulp.watch(paths.scripts, ['bundle', 'reload']);
  });
};
