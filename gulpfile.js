const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

function compileSass() {
    return gulp.src('./src/styles/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist')); 
}

function copyHtml() {
    return gulp.src('./index.html').pipe(gulp.dest('./dist'));
}

function copyJs() {
    return gulp.src('./src/scripts/main.js').pipe(gulp.dest('./dist'));
}

function watchFiles() {
    gulp.watch('./src/styles/**/*.scss', compileSass);
    gulp.watch('./index.html', copyHtml);
    gulp.watch('./src/scripts/main.js', copyJs);
}

gulp.task('build', gulp.series(copyHtml, copyJs, compileSass));
gulp.task('default', gulp.series('build', watchFiles));
