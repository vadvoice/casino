"use strict"

var gulp = require('gulp'),
    config = require('../config.json'),
    path = require('path'),
    sass = require('gulp-sass'),
    data = require('gulp-data'),
    browserSync = require('browser-sync');

var paths = {
  "src": path.join(config.tasks.css.src, '**/*.{' + config.tasks.css.extensions + '}'),
  "dest": config.tasks.css.dest
}

var cssTask = function () {
  gulp.src(paths.src)
    .pipe(sass())
    .pipe(gulp.dest(paths.dest))
    .on('end', browserSync.reload)
}

gulp.task('css', cssTask);
