module.exports = function (paths, plugins) {
  gulp.task('templates', function () {
    return gulp.src(paths.html)
      .pipe(plugins.templates({
        filename: 'default.js',
        'standalone': true
      }))
      .pipe(gulp.dest(paths.build.templates));
  });
};
