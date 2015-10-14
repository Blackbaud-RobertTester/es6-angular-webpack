var gulp = require('gulp');
var glob = require('glob');
var paths = require('./paths');
var plugins = require('gulp-load-plugins')({
  rename: {
    'gulp-angular-templatecache': 'templates'
  }
});

var globArray = glob.sync('tasks/!(index).js', {
  cwd: './gulp'
});

global.gulp = gulp;

plugins.webpack = require('webpack');
plugins.karma = require('karma');

globArray.map(function (itemToLoad) {
  var loadedItem = require('./' + itemToLoad);
  if (typeof loadedItem === 'function') {
    loadedItem(paths, plugins);
  } else {
    throw new Error('Tried to load gulp task ' + itemToLoad + ' but it was not a function. all tasks should export a single function with a function that takes the paths object');
  }
});

