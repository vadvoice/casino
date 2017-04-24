"use strict"

var gulp = require('gulp'),
  path = require('path'),
  watch = require('gulp-watch'),
  config = require('../config.json');

var watchTask = function () {
  var watchableTasks = ['html', 'css', 'js'];

  watchableTasks.forEach(function (taskName) {
    var task = config.tasks[taskName];

    if(task) {
      var glob = path.join(task.src + '**/*.{' + task.extensions + '}');

      gulp.watch(glob, [taskName])

    }
  })
}

gulp.task('watch', ['browserSync'], watchTask);

module.exports = watchTask;