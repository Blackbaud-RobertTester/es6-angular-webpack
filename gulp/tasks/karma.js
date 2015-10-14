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
};
