const gulp = require("gulp");
const cssmin = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
const gdel = require("del");
const htmlmin = require("gulp-htmlmin");
const gutil = require("gulp-util");
const sourcemaps = require('gulp-sourcemaps');
const useref = require('gulp-useref');




gulp.task('uglifyjs', function (done) {
    gulp.src(`src/js/**/*.js`)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(`dist/js`));
    done();
})





gulp.task('minifycss', function (done) {
    gulp.src('src/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css'));
    done();
})






gulp.task('image', function (done) {
    gulp.src('src/images/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images'));
    done();
})




gulp.task('fonts', function (done) {
    gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'));
    done();
})




gulp.task("minifyhtml", function (done) {

    const options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false, //不删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false, //不删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };



    gulp.src('src/*.html')
        .pipe(htmlmin(options))
        .pipe(useref())
        .pipe(useref("*.js", babel({
            presets: ['@babel/preset-env']
        })))
        .pipe(useref("*.js", uglify()))
        .pipe(useref("*.css", autoprefixer({
            cascade: false
        })))
        .pipe(useref("*.css", cssmin()))
        .pipe(gulp.dest('dist'));

    gulp.src('src/pages/**/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/pages'));
    done();
});


gulp.task("minifyutil", function (done) {

    gulp.src('src/favicon.ico')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist'));




    gulp.src('src/plugins/**/*.css')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/plugins'));


    gulp.src(`src/plugins/**/*.js`)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(`dist/plugins`));


    gulp.src(['src/plugins/**/*', "!src/plugins/**/*.js", "!src/plugins/**/*.css"])
        .pipe(gulp.dest('dist/plugins/'));



    gulp.src('src/services/**/*.css')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/services'));


    gulp.src(`src/services/**/*.js`)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(`dist/services`));


    gulp.src(['src/services/**/*', "!src/services/**/*.js", "!src/services/**/*.css"])
        .pipe(gulp.dest('dist/services/'));



    gulp.src('src/pages/**/*.css')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/pages'));


    gulp.src(`src/pages/**/*.js`)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(`dist/pages`));


    gulp.src(['src/pages/**/*', "!src/pages/**/*.js", "!src/pages/**/*.css", "!src/pages/**/*.html"])
        .pipe(gulp.dest('dist/pages/'));


    done();
});




gulp.task("cleanDist", () => {
    //如果要同步执行代码必须得把执行部分return出去。
    return gdel("dist", {});
});



gulp.task('default', done => {
    gutil.log(gutil.colors.red("开始执行..."));


    const generateDist = gulp.parallel(["uglifyjs", "minifycss", "image", "fonts", "minifyhtml", "minifyutil"]);
    //先删除dist文件夹，然后重新生成。
    gulp.series("cleanDist", generateDist).call(this);


    // gutil.log(gutil.colors.green('执行完成'));

    done();
})


