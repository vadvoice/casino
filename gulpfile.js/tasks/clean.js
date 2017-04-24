"use strict"

var gulp = require('gulp'),
    config = require('../config.json'),
    path = require('path'),
    del = require('del'),
    data = require('gulp-data');

var paths = {
  "dest": config.tasks.root.dest
}

var cleanTask = function (cb) {
  del([path.join(paths.dest, '/**')]).then(function (paths) {
    cb()
    console.log("cleaned")
  })
};


gulp.task('clean', cleanTask);
