// Import the dependencies 
var gulp = require('gulp'),
  less = require('gulp-less'),
  minifyCSS = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync').create();



gulp.task('sass', function () {

  return gulp.src(['src/assets/styles/*.scss']).
  pipe(scss()).
  pipe(minifyCSS({})).
  pipe(gulp.dest('dist/css'));
});

gulp.task('js', function () {
  return gulp.src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'src/assets/js/**/*.js'
    ])
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist/js'));
});



// Watch on less and js
gulp.task('watch', function (done) {
  gulp.watch('src/styles/sass/**/*.scss', gulp.parallel('sass'));
  gulp.watch('src/assets/js/**/*.js', gulp.parallel('js'));
});


// Browsersync server
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });

  gulp.watch('src/styles/scss/**/*.sccs', gulp.parallel('sass'));
  gulp.watch('src/assets/js/**/*.js', gulp.parallel('js'));
  gulp.watch("*.html").on('change', browserSync.reload);
});