var babel = require('babel');
var merge = require('lodash/object/merge');
var path = require('path');


var webpackConfig = require('./webpack.config.js');

delete webpackConfig.entry;

webpackConfig.module.preLoaders.push([{
  test: /\.jsx?$/,
  include: path.resolve('src/'),
  exclude: /\.test\.jsx?$/,
  loader: 'isparta'
}]);

var karmaConfig = {
  // ... normal karma configuration
  frameworks: ['jasmine', 'sinon'],
  files: [
    './lib/test-bootstrap.js',
    './node_modules/phantomjs-polyfill/bind-polyfill.js',
    'src/**/*.test.js',
    'node_modules/angular-mocks/angular-mocks.js'
  ],
  preprocessors: {
    './lib/test-bootstrap.js': ['webpack'],
    'src/**/*.test.js': ['webpack'],
    'src/main.js': ['webpack']
  },
  reporters: ['dots', 'coverage'],
  coverageReporter: {
    type: 'html',
    dir: 'build/coverage/'
  },
  webpack: webpackConfig,
  webpackMiddleware: {
    // webpack-dev-middleware configuration
    // i. e.
    // noInfo: true
  },
  browsers: ['PhantomJS'],
  plugins: [
    require('karma-webpack'),
    require('karma-spec-reporter'),
    require('karma-coverage'),
    require('karma-phantomjs-launcher'),
    require('karma-jasmine'),
    require('karma-sinon'),
    require('karma-chrome-launcher'),
    require('isparta-loader'),
    require('karma-junit-reporter')
  ]
};

module.exports = function (config) {
  config.set(karmaConfig);
};
