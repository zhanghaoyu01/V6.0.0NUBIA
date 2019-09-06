const gulp = require('gulp');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const path = require('path'); // nodejs自带模块 path
const babel = require('gulp-babel');
var spritesmith = require('gulp.spritesmith');


// 1. 压缩html
gulp.task('htmlmin', function() {
    return gulp.src('./src/html/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist/html0000'));
});

// 2. 压缩css
gulp.task('cssmin', function() {
    return gulp.src('./font_ufs83m5no89/*.css')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/font_ufs83m5no89'));

});



gulp.task('cssrename', function() {
    return gulp.src('./dist/css/*.min.css')
        .pipe(rename('*.css'))
        .pipe(gulp.dest('./dist/css'));
})

// 3. 压缩js
gulp.task('jsmin', function() {
    return gulp.src('./src/jses6/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/js'));
});

// 4. 压缩图片
gulp.task('imagemin', function() {
    return gulp.src('./src/image/*.png')
        .pipe(imagemin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./disk/image'));
});


// 5. 合并JS  减少请求次数
gulp.task('js', function() {
    return gulp.src(['src/js/jquery.js', 'src/js/index.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});




// 编译less
gulp.task('less', function() {
    return gulp.src('./src/css/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./src/css'));
});

// 文件监听
gulp.task('watch', function() {
    gulp.watch(['./src/html/*.html', './src/css/*.css', './src/js/*.js'], gulp.series('htmlmin', 'cssmin', 'js'));
});

gulp.task('sprite', function() {
    return gulp.src('src/image/nav-*')
        .pipe(spritesmith({
            imgName: 'spritenav.png',
            cssName: 'spritenav.css'
        }))
        .pipe(gulp.dest('disk/smith'));
});


gulp.task('babel', function() {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('src/jses6/'));
});


gulp.task('coplib', function() {
    return gulp.src('src/lib/*')
        .pipe(gulp.dest('dist/lib/'));
});


gulp.task('copimages', function() {
    return gulp.src('src/image/*.png')
        .pipe(gulp.dest('dist/image/'));
});

gulp.task('copmd', function() {
    return gulp.src('src/*.md')
        .pipe(gulp.dest('dist/'));
});

gulp.task('copiconfont', function() {
    return gulp.src('')
        .pipe(gulp.dest('dist/'));
});