const gulp = require('gulp'); // Importa o pacote gulp

const sass = require('gulp-sass')(require('sass')); // Importa o pacote gulp-sass para compilar arquivos Sass utilizando o pacote do Sass

const sourcemaps = require('gulp-sourcemaps'); // Importa o pacote gulp-sourcemaps para criar sourcemaps dos arquivos

const uglify = require('gulp-uglify'); // Importa o pacote gulp-uglify para minificar arquivos JavaScript

const obfuscate = require('gulp-obfuscate'); // Importa o pacote gulp-obfuscate para ofuscar arquivos JavaScript

function comprimeJs() {
    return gulp.src('./source/scripts/*.js') // Seleciona os arquivos JavaScript na pasta source/scripts
        .pipe(uglify()) // Minifica os arquivos JavaScript
        .pipe(obfuscate()) // Ofusca os arquivos JavaScript
        .pipe(gulp.dest('./build/script')); // Salva os arquivos na pasta build/script
}

function compilaSass() {
    return gulp.src('./source/styles/main.scss') // Seleciona o arquivo main.scss na pasta source/styles
        .pipe(sourcemaps.init()) // Inicializa a criação de sourcemaps
        .pipe(sass({
            outputStyle: 'compressed' // Compila o arquivo Sass e comprime o resultado
        }))
        .pipe(sourcemaps.write('./maps')) // Escreve os sourcemaps na pasta maps
        .pipe(gulp.dest('./build/styles')); // Salva o arquivo compilado na pasta build/styles
}

exports.default = gulp.parallel(comprimeJs, compilaSass); // Tarefa padrão que executa em paralelo a compressão de JavaScript e a compilação de Sass

exports.sass = compilaSass; // Tarefa para compilar apenas o Sass

exports.watch = function() {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass)); // Observa mudanças nos arquivos Sass e executa a compilação quando necessário
}

exports.javascript = comprimeJs; // Tarefa para comprimir apenas o JavaScript
