const gulp = require('gulp');
const pug = require('gulp-pug');
const css = require('gulp-css');

gulp.task('html', function() {
  return gulp.src('./views/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('./public'));
});

gulp.task('css', function() {
  return gulp.src('./public/*.css')
  .pipe(css())
  .pipe(gulp.dest('./build/styles'))
});

gulp.task('bootstrap-css', function() {
  return gulp.src('./node_modules/bootstrap/dist/css/*.min.css')
  .pipe(gulp.dest('./public/styles'))
});

gulp.task('bootstrap-js', function() {
  return gulp.src('./node_modules/bootstrap/dist/js/*.min.js')
  .pipe(gulp.dest('./public/js'))
});

gulp.task('default', ['html', 'css', 'bootstrap-css', 'bootstrap-js']);
