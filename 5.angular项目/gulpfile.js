var gulp = require('gulp');//首先定义一个模块
var $ = require('gulp-load-plugins')();//方便调用，自动加载插件  http://www.cnblogs.com/bq-med/p/4940009.html
var open = require('open');


// 用于定义路径，申明一个全局变量，用来定义路径
var app = {
    srcPath: 'src/', // 资源路径，开发者路径 //开发目录
    devPath: 'build/', // 用于调试路径 //生产目录
    prdPath: 'dist/'  //发布目录（用于发布）
};

// 把bower_conponents里面的文件同步到build 和 dist 下面的vendor文件下
gulp.task('lib', function() {
    // 读取文件,   // 读取所有的js文件
    gulp.src('bower_components/**/*.js')
    // 路径的产生， 生成路径, 自动生成路径
        .pipe(gulp.dest(app.devPath + 'vendor'))
        .pipe(gulp.dest(app.prdPath + 'vendor'))
        .pipe($.connect.reload())
});

// 同步html  --  `gulp html`
gulp.task('html', function() {
    gulp.src(app.srcPath + '**/*.html')//里面所有的htmlwenjian
        .pipe(gulp.dest(app.devPath))
        .pipe(gulp.dest(app.prdPath))
        .pipe($.connect.reload())
});

// json文件的编译
gulp.task('json', function() {
    gulp.src(app.srcPath + 'data/**/*.json')
        .pipe(gulp.dest(app.devPath + 'data'))
        .pipe(gulp.dest(app.prdPath + 'data'))
        .pipe($.connect.reload())
});


// less文件
gulp.task('less', function() {
    gulp.src(app.srcPath + 'style/index.less')
        .pipe($.less())
        .pipe(gulp.dest(app.devPath + 'css'))
        .pipe($.cssmin())
        .pipe(gulp.dest(app.prdPath + 'css'))
        .pipe($.connect.reload())
});
// 把所有的less都引入到index.less中所以只需要解析index.less

// 合并或者转义js文件
gulp.task('js', function() {
    gulp.src(app.srcPath + 'script/**/*.js')
        .pipe($.concat('index.js')) // 把所有的js合并到index.js
        .pipe(gulp.dest(app.devPath + 'js'))
        .pipe($.uglify())//转义
        .pipe(gulp.dest(app.prdPath + 'js'))
        .pipe($.connect.reload())
});

// 处理和压缩图片
gulp.task('image', function() {
    gulp.src(app.srcPath + 'image/**/*')
        .pipe($.plumber())  // 捕捉任务中的错误
        .pipe(gulp.dest(app.devPath + 'image'))
        .pipe($.imagemin())  // 压缩图片
        .pipe(gulp.dest(app.prdPath + 'image'))
        .pipe($.connect.reload())
});

gulp.task('build', ['lib', 'html', 'less', 'js', 'image', 'json']);

// 清除
gulp.task('clean', function() {
    gulp.src([app.devPath, app.prdPath])
        .pipe($.clean())
});


// 编写一个服务器
gulp.task('serve', ['build'], function() {
    $.connect.server({
        root: [app.devPath],
        livereload: true,
        port: 3000
    });
    open('http://localhost:3000');
    gulp.watch('bower_components/**/*', ['lib']);
    gulp.watch(app.srcPath + '**/*.html', ['html']);
    gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
    gulp.watch(app.srcPath + 'style/**/*.less', ['less']);
    gulp.watch(app.srcPath + 'script/**/*.js', ['js']);
    gulp.watch(app.srcPath + 'image/**/*', ['image'])
});

gulp.task('default', ['serve'])