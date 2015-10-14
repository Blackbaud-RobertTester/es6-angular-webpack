var appRoot = require('app-root-path').path;
var path = require('path');

module.exports = function (paths, plugins) {

  var karmaServer = plugins.karma.Server;

  console.log(appRoot);

  gulp.task('karma', function (cb) {
    new karmaServer({
      configFile: appRoot + '/karma.conf.js'
    }, cb).start();
  });

  gulp.task('karma:ci', function (cb) {
    new karmaServer({
      configFile: appRoot + '/karma.conf.js',
      singleRun: true,
      reporters: ['progress', 'junit', 'coverage'],
      junitReporter: {
        outputDir: process.env.CIRCLE_TEST_REPORTS,
        outputFile: 'karma/junit.xml',
        suite: 'karma'
      },
      coverageReporter: {
        type: 'html',
        dir: path.join(process.env.CIRCLE_ARTIFACTS, 'coverage')
      }
    }, cb).start();
  });
};
