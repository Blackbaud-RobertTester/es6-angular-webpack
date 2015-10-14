var config = require('../../webpack.config.js');

module.exports = function (paths, plugins) {
  return gulp.task('bundle', function (cb) {
    const bundler = plugins.webpack(config);
    const verbose = true;

    function bundle(err, stats) {
      if (err) {
        throw new plugins.util.PluginError('webpack', err);
      }
      return cb();
    }

    bundler.run(bundle);
  });
};
