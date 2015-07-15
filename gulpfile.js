console.time('Loading plugins');

var gulp        = require('gulp');
var compass     = require('gulp-compass');
var sourcemaps  = require('gulp-sourcemaps');
var plumber     = require('gulp-plumber');
var rename      = require('gulp-rename');
var path        = require('path');
var del         = require('del');

console.timeEnd('Loading plugins');

var base = "src/";

var paths = {
    sass      : base + 'sass/**/*.scss',
    images    : [ base + 'images/*' ],
    publishDev: [
      base + 'build/main.css',
    ]
}

var dest = {
    sass:       base + 'build/css',
    images:     path.join(__dirname, 'dist/'),
    publishDev: path.join(__dirname, 'dist/'),
}

gulp.task('default', [], function(){
  console.log('hoge!');
});

gulp.task('sass', function () {
  return gulp.src( paths.sass )
  .pipe(plumber({
    errorHandler: function (error) {
      console.log(error.message);
      this.emit('end');
    }
  }))
  .pipe(compass({
    css:   base + 'css',
    sass:  base + 'sass',
    debug: true
  }));
});

gulp.task('copyImages', function () {
    return gulp.src(paths.images)
            .pipe(gulp.dest(dest.images))
});


gulp.task('clean', [], function() {
  del([
    'build/**/*',
    'dist/**/*',
    'src/css/**/*',
    'src/build/**/*',
  ],{
    force: true
  });
});

gulp.task('build', [
  'clean',
  'copyImages',
  ], function () {
    gulp.src(paths.publishDev)
    .pipe(gulp.dest(dest.publishDev))
 });

