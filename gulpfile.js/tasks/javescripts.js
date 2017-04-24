"use strict"

var gulp = require('gulp'),
  config = require('../config.json'),
  path = require('path'),
  pug = require('gulp-pug'),
  data = require('gulp-data'),
  browserSync = require('browser-sync');

var paths = {
  "src": path.join(config.tasks.js.src, '**/*.{' + config.tasks.js.extensions + '}'),
  "dest": config.tasks.js.dest
}

var jsTask = function () {
  gulp.src(paths.src)
    .pipe(gulp.dest(paths.dest))
    .on('end', browserSync.reload)
}

gulp.task('js', jsTask);
