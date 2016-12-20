const os = require('os');
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const open = require('gulp-open');

// 需要压缩的js路径
var jsPaths = [
  './src/**/*.js'
];

// 主任务
gulp.task('default', ['minify_css', 'minify_html', 'minify_js', 'auto', 'open'], function () {
  console.log('gulp running');
});

gulp.task('open',['copy'], function () {
  gulp.src('./src/index.js').pipe(open({
    uri: 'http://localhost:8088'
  }));
});
//copy src目录下的所有文件到 dist目录下 命令
gulp.task('copy', function () {
  return gulp.src(['./src/**/*','!./src/www/admin/**/*'], { base: './src' })
    .pipe(gulp.dest('./dist/'));
});

gulp.task('copyxtpl', function () {
  return gulp.src('./src/views/**/*', {base: './src'})
  .pipe(gulp.dest('./dist/'));
});

//压缩CSS
gulp.task('minify_css', ['copy'], function () {
  return gulp.src('./src/**/*.css', { base: './src' })
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./dist/'));
});

//html压缩工具
gulp.task('minify_html', ['copy'], function () {
  return gulp.src(['./src/**/*.html', '!./src/www/admin/**/*.html'], { base: './src' })
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist/'));
});

// 压缩 js 文件
gulp.task('minify_js', ['copy'], function () {
  return gulp.src(['./src/**/*.js', '!./src/typings/**/*.js', '!./src/www/admin/**/*.js'], { base: './src' })
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});


// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', ['copy'], function () {
  // 监听文件修改，当文件被修改则执行 css 任务
  gulp.watch('./src/**/*.css', ['minify_css']).on('change', function (event) {
    console.log('path:' + event.path + ' was changed! task is running');
  });
  gulp.watch('./src/**/*.html', ['minify_html']).on('change', function (event) {
    console.log('path:' + event.path + ' was changed! task is running');
  });
  gulp.watch(jsPaths, ['minify_js']).on('change', function (event) {
    console.log('path:' + event.path + ' was changed! task is running');
  });

  gulp.watch('./src/**/*.xtpl',['copyxtpl']).on('change', function (e) {
    console.log('xtpl is changeing');
  });
});
