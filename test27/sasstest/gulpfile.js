var gulp = require('gulp');
    sass = require('gulp-sass');
    cssmin = require('gulp-minify-css');
    rev = require('gulp-rev');
    revCollector = require('gulp-rev-collector');


gulp.task('testSass', function () {
    gulp.src('./app/sass/*.scss')
        .pipe(sass())
        .pipe(cssmin()) 
        .pipe(rev())
        .pipe(gulp.dest('build/stylesheets'))
        .pipe(rev.manifest()) 
        .pipe(gulp.dest('./rev')); 
});
gulp.task('sassrev', function() {
    gulp.src(['rev/*.json','build/stylesheets/*.css']) 
        .pipe(revCollector())             
        .pipe(gulp.dest('build/stylesheets')); 
});
gulp.task('rev', function() {
    gulp.src(['rev/*.json','index.html']) 
        .pipe(revCollector())             
        .pipe(gulp.dest('build')); 
});
gulp.task('testWatch', function () {
    gulp.watch('app/sass/index.scss', ['sass']); 
});

gulp.task('default',['testSass','sassrev','rev','testWatch'],function(){
	console.log('release over');
});