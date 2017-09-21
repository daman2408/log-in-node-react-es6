const gulp = require('gulp');
const del = require('del');
const sequence = require('gulp-sequence');
const pug = require('gulp-pug');
const css = require('gulp-css');
const run = require('gulp-run');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');

//"p" stands for paths
const p = {
  public: './public',
  pugFiles: './server/views/*.pug',
  bootstrapJs: './node_modules/bootstrap/dist/js/*.min.js',
  cssFiles: './src/styles/*.css'
}

// //clean out the build folder before running any gulp tasks
//
gulp.task('clean:public', function() {
  return del([p.public])
});

//compile view engine files to html and place inside ./public


gulp.task('html', function() {
  return gulp.src(p.pugFiles)
  .pipe(pug())
  .pipe(gulp.dest(p.public));
});


//move all css files inside ./src into ./public/styles


gulp.task('css', function() {
  return gulp.src(p.cssFiles)
  .pipe(css())
  .pipe(gulp.dest('./public/styles'))
});

//get bootstrap js file and place in ./public/js


gulp.task('bootstrap-js', function() {
  return gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
  .pipe(gulp.dest('./public/js'))
});

//get jquery and place in .public/js

gulp.task('jquery', function() {
  return gulp.src('./node_modules/jquery/dist/jquery.min.js')
  .pipe(gulp.dest('./public/js'))
});


//bundle react files into ./public/js using webpack plugin, 'webpack-stream'


gulp.task('build', function() {
  return gulp.src('./src/index.js')
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest('./public/js/'))
});


//using sequence(), set an order for commands to be called in


gulp.task('sort', function() {
  return sequence('clean:public', 'css', 'jquery', 'bootstrap-js','build')()
});

gulp.task('default', ['sort']);
