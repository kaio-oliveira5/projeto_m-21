const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

// 1. Compilação do SCSS: src/styles/main.scss -> dist/style.css
function compileSass() {
    return gulp.src('./src/styles/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist')); 
}

// 2. Cópia do HTML: index.html (raiz) -> dist/index.html
function copyHtml() {
    return gulp.src('./index.html').pipe(gulp.dest('./dist'));
}

// 3. Cópia do JavaScript: src/scripts/main.js -> dist/main.js
function copyJs() {
    return gulp.src('./src/scripts/main.js').pipe(gulp.dest('./dist'));
}

// Tarefa WATCH: Monitoramento em tempo real
function watchFiles() {
    gulp.watch('./src/styles/**/*.scss', compileSass);
    gulp.watch('./index.html', copyHtml);
    gulp.watch('./src/scripts/main.js', copyJs);
}

// TAREFA BUILD (DEFINIÇÃO GARANTIDA)
// Usa gulp.series para rodar as tarefas na ordem
gulp.task('build', gulp.series(copyHtml, copyJs, compileSass));

// TAREFA PADRÃO (default): Executa o build e depois o watch
gulp.task('default', gulp.series('build', watchFiles));