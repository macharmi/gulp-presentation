var gulp = require('gulp');

// Création de task
gulp.task('say_hello', function() {
  console.log('Hello Webforge! You are the best!');
});

//Sass
var sass = require('gulp-sass');
gulp.task('sass_demo', function(){
  return gulp.src('app/scss/*')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('app/css'))
});

// Watch
gulp.task('watch_demo', function(){
  gulp.watch('app/scss/*', ['sass']);
  // Other watchers
})

// browserSync
var browserSync = require('browser-sync').create();
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

// useref
var useref = require('gulp-useref');
gulp.task('useref_demo', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

// uglify js code
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');

gulp.task('uglify_demo', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});

// clean the build
var del = require('del');
gulp.task('clean:dist', function() {
  return del.sync('dist');
})

// -------------
var cssnano = require('gulp-cssnano');

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch',['browserSync', 'sass', 'useref'], function(){
  gulp.watch('app/scss/*', ['sass']);
  gulp.watch('app/js/*', ['useref']);
  gulp.watch('app/js/lib/*', ['useref']);
  // Other watchers
})
