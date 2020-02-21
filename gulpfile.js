const gulp = require("gulp");
const { src, dest } = require("gulp");
const sass = require("gulp-sass");
const minifyCSS = require("gulp-csso");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

function css() {

    return src("sass/*")
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(dest("css"))
    .pipe(browserSync.stream())
};

function miniImg() {

    return src("images/*")
    .pipe(imagemin())
    .pipe(dest("minifiedImg"))
}

function watch(){
    
    browserSync.init({
                     
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./sass/*", css);
    gulp.watch("./images/*").on('change', miniImg);
    gulp.watch("./minifiedImg/*").on("change", browserSync.reload);
    gulp.watch("./*.html").on("change", browserSync.reload);
}

gulp.task('default', gulp.series(miniImg,css,watch))

