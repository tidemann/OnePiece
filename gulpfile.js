var gulp = require('gulp'),
    sass = require('gulp-sass'),
    bourbon = require('node-bourbon').includePaths,
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    connect = require('connect'),
    http = require('http'),
    path = require('path'),
    clean = require('gulp-clean'),
    ect = require('gulp-ect'),
    server = lr();

gulp.task('default', ['clean', 'styles', 'markup', 'webserver', 'watch']);

gulp.task('markup', function() {
    return gulp.src('./src/*.ect')
        .pipe(ect())
        .pipe(gulp.dest('./dist'))
        .pipe(livereload(server));
});
gulp.task('webserver', function() {
    var port = 3000,
        hostname = null,
        base = path.resolve('./dist'),
        directory = path.resolve('./dist'),
        app = connect().use(connect["static"](base)).use(connect.directory(directory));
    return http.createServer(app).listen(port, hostname);
});

gulp.task('styles', function() {
    return gulp.src('src/assets/styles/main.scss')
        .pipe(sass({
            errLogToConsole: true,
            style: 'expanded',
            includePaths: bourbon //'node_modules/node-bourbon/assets/stylesheets'
        }))
        .pipe(gulp.dest('dist/assets/styles'))
        .pipe(livereload(server));
});

gulp.task('clean', function() {
    return gulp.src(['dist/assets/styles', 'dist', ], {
        read: false
    })
        .pipe(clean());
});

gulp.task('watch', function() {
    server.listen(35729, function(err) {
        if (err) {
            return console.log(err)
        };
    });
    gulp.watch('src/assets/styles/**/*.scss', ['styles']);
    gulp.watch('src/**/*.ect', ['markup']);
});