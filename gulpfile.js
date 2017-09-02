const gulp = require('gulp');
const del = require('del');
const sequence = require('gulp-sequence');
const pug = require('gulp-pug');
const css = require('gulp-css');
const run = require('gulp-run');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const gls = require('gulp-live-server');

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

gulp.task('build', function() {
  return gulp.src('./src/index.js')
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest('./public/js/'))
});

gulp.task('babel', function() {
  return gulp.src('./server/app.js')
  .pipe(babel({
    presets: ["react", "es2015", "stage-2"]
  }))
  .pipe(gulp.dest('./server'))
})

gulp.task('serve', function() {
  // gulp.watch(['./**/*.{css, js, html}'], ['sort']);

  //start the server
  var server = gls('./server/app.js');
  server.start()

  //reload server when backend files change
  gulp.watch(['./server/**/*.js'], function functionName() {
    server.start.bind(server)();
  });

  //notify server when frontend files change
  gulp.watch(['/.public/**/*.{css, js, html}'], function(file) {
    server.notify(file)
  })

});

gulp.task('start', function() {
  return sequence('babel', 'serve')();
})

gulp.task('sort', function() {
  return sequence('clean:public','html', 'css','build')()
});

gulp.task('default', ['sort']);
