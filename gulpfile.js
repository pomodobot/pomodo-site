var gulp = require('gulp');
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

var jsFiles = [
    {
        watch: '_assets/script/*.js',
        output: './assets/js',
        name: 'site.js',
        nameMin: 'site.min.js'
    }
];


gulp.task('watch', function () {
    for (var j in jsFiles) {
        scriptWatch(jsFiles[j]);
    }
});

function scriptWatch(jsData) {
    gulp.src(jsData.watch)
        .pipe(watch(jsData.watch, function() {
            gulp.src(jsData.watch)
                .pipe(concat(jsData.name))
                .pipe(gulp.dest(jsData.output))
                .pipe(uglify({outSourceMap: false}))
                .pipe(rename(jsData.nameMin))
                .pipe(gulp.dest(jsData.output));
        }));
}

gulp.task('default', ['watch']);
