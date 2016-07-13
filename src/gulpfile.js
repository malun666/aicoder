const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');

gulp.task('default',['minify-css','html_minify','script'],function () {
  console.log('gulp running');
});

//copy 命令
gulp.task('copy', function() {
  return gulp.src('../src/**/*',{base:'../src'})
    .pipe(gulp.dest('../dist/'));
});
//压缩CSS
gulp.task('minify-css',['copy'], function() {
  return gulp.src('www/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('../dist/www/css'));
});

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 css 任务
    gulp.watch('www/css/*.css', ['minify-css']);
});

//html压缩工具
gulp.task('html_minify',['copy'], function() {
    return gulp.src('www/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('../dist/www'));
    // gulp.src(['views/**/*.xtpl','views/*.xtpl'])
    // .pipe(htmlmin({collapseWhitespace: true}))
    // .pipe(gulp.dest('../dist/views'));
});

// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('script',['copy'], function() {
    gulp.src('*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../dist/'));
        
    gulp.src('datamodel/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../dist/datamodel'));

    gulp.src('controller/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../dist/controller'));

    gulp.src('common/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../dist/common'));

    gulp.src('routes/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../dist/routes'));

    return gulp.src('www/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../dist/www/js'));
});
