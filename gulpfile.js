// Import the dependencies 
var gulp = require('gulp');
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");
var  minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
  


// Browsersync server
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });

  gulp.watch('src/styles/scss/*.sccs', gulp.parallel('sass'));
  gulp.watch('src/assets/js/**/*.js', gulp.parallel('js'));
  gulp.watch("src/*.html").on('change', browserSync.reload);
});


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


