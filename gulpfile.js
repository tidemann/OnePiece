var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    server = lr();

gulp.task('default', ['clean'], function() {
    gulp.run('styles');
});
gulp.task('styles', function() {
    return gulp.src('src/styles/main.scss')
        .pipe(sass({
            style: 'expanded'
        }))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(livereload(server))
        .pipe(notify({
            message: 'Syles task complete'
        }));
});
gulp.task('clean', function() {
    return gulp.src(['dist/assets/css'], {
        read: false
    })
        .pipe(clean());
});

gulp.task('watch', function() {
    server.listen(35729, function(err) {
        if (err) {
            return console.log(err)
        };
        gulp.watch('src/styles/**/*.scss', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.run('styles');
        });
    });

});