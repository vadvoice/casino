"use strict"

var gulp = require('gulp'),
    config = require('../config.json'),
    path = require('path'),
    pug = require('gulp-pug'),
    data = require('gulp-data'),
    browserSync = require('browser-sync');

var paths = {
  "src": path.join(config.tasks.html.src, '**/*.{' + config.tasks.html.extensions + '}'),
  "dest": config.tasks.html.dest
}

var htmlTask = function () {
    gulp.src(paths.src)
    .pipe(pug(config.tasks.html.param))
    .pipe(gulp.dest(paths.dest))
      .on('end', browserSync.reload)
}

gulp.task('html', htmlTask);
