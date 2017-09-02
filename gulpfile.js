const gulp = require('gulp');
const del = require('del');
const sequence = require('gulp-sequence');
const pug = require('gulp-pug');
const css = require('gulp-css');
const run = require('gulp-run');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const gls = require('gulp-live-server');
const livereload = require('gulp-livereload');

//"p" stands for paths
const p = {
  public: './public',
  pugFiles: './server/views/*.pug',
  bootstrapJs: './node_modules/bootstrap/dist/js/*.min.js',
  cssFiles: './src/styles/*.css'
}

//clean out the build folder before running any gulp tasks

gulp.task('clean:public', function() {
  return del([p.public])
});

gulp.task('clean:dist', function() {
  return del(['./dist'])
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
  .pipe(livereload())
});

gulp.task('bootstrap-js', function() {
  return gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
  .pipe(gulp.dest('./public/js'))
});

//transpile app.js to es2015

gulp.task('transpile-app', function() {
  return gulp.src('./server/app.js')
  .pipe(babel())
  .pipe(gulp.dest('./dist/server'))
});

gulp.task('transpile-config', function() {
  return gulp.src('./config.js')
  .pipe(babel())
  .pipe(gulp.dest('./dist/'))
});

gulp.task('transpile-mong', function() {
  return gulp.src('./UserSchema.js')
  .pipe(babel())
  .pipe(gulp.dest('./dist'))
});

//watch server/app.js and restart server with any changes

gulp.task('serve', function() {
  gulp.watch(p.cssFiles, [ 'css' ]);

  var server = gls.new('./dist/server/app.js');
  server.start();

  gulp.watch('./server/app.js', function() {
    server.start.bind(server)()
  });

});

gulp.task('watch', function() {
  livereload.listen({
    port: 3000
  });
  gulp.watch('./src/styles/styles.css', [ 'css' ])
});

gulp.task('start', function() {
  return sequence('clean:dist','transpile-app', 'transpile-config', 'transpile-mong', 'serve')()
});

gulp.task('build', function() {
  return gulp.src('./src/index.js')
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest('./public/js/'))
});

gulp.task('sort', function() {
  return sequence('clean:public','html', 'css', 'bootstrap-js','build')()
});

gulp.task('default', ['sort']);
