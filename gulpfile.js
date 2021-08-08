var gulp = require('gulp');
var cssmin = require('gulp-cssmin')
// var rename = require('gulp-rename')
var htmlmin = require('gulp-htmlmin')
var gulpJsmin = require('gulp-uglify')
var gulpBalel = require('gulp-babel')
var outputFileName = 'dist/'
var del = require('del');
var browserSync = require('browser-sync').create()

function statrt() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
    var path = [
        './assets/*/*.*',
        './*.html',
    ]
    for (var i = 0; i < path.length; i++) {
        gulp.watch(path[i]).on('change', browserSync.reload);
    }
}
function clean(cb) {
    return del(['dist'], cb);
}
function html() {
    var options = {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
    };
    return gulp.src('*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest(outputFileName));
}

function lib() {
    gulp.src('assets/img/*.*').pipe(gulp.dest(outputFileName + 'assets/img'))
    return gulp.src(['assets/vendor/*/*/*.*', 'assets/vendor/*/*.*']).pipe(gulp.dest(outputFileName + 'assets/vendor'))
}

function css() {
    return gulp.src('assets/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest(outputFileName + 'assets/css'))
    /*   .pipe(rename({
           suffix: 'min' //rename只是给上一步骤产出的压缩的styles.css重命名为style.min.css
       }))*/
}

function js() {
    return gulp.src('assets/js/*.js').pipe(gulpBalel({presets: ['env']}))
        .pipe(gulpJsmin()).pipe(gulp.dest(outputFileName + 'assets/js'))
}
module.exports.statrt = gulp.series(statrt);
module.exports.default = gulp.series(
    clean,
    lib,
    html,
    css,
    js
)
