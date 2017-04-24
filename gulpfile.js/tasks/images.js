"use strict"

var config      = require('../config.json')
if(!config.tasks.images) return

var browserSync = require('browser-sync')
var gulp        = require('gulp')
var imagemin    = require('gulp-imagemin')
var path        = require('path')

var paths = {
  "src": path.join(config.tasks.images.src, '**/*.{' + config.tasks.images.extensions + '}'),
  "dest": config.tasks.images.dest
}

var imagesTask = function() {
  return gulp.src(paths.src)
    .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(paths.dest))
    .on('end', browserSync.reload)
}

gulp.task('images', imagesTask)

module.exports = imagesTask