var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util');

var styleTasks = [];
gulp.task('sass', function () {
    gulp.src('./styles/sass/**/*.scss')
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./styles/build/'));
});
styleTasks.push('sass');

gulp.task('watch-sass', function () {
    gulp.watch(['./styles/sass/**/*.scss', './styles/build/*css'], styleTasks);
});

gulp.task('default', ['sass', 'watch-sass']);
