module.exports = function (paths, plugins) {
  gulp.task('reload', function () {
    setTimeout(function () {
      plugins.browserSync.reload();
    }, 500);
  });
};
