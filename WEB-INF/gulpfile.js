var gulp = require('gulp');
var replace = require('gulp-replace-task');
var assets = require('webpack.assets');

gulp.task('default', function() {
  console.log("hello,gulp!");
});

gulp.task('replace', function(){
  gulp.src('templates/**/*.html')
    .pipe(replace({
      patterns: [
        {
          match: /vendors-(.*?)\.js/g,
          replacement: function() {
            return assets.window.WEBPACK_ASSETS['vendors'].js;
          }
        }
      ]
    }))
    .pipe(gulp.dest('templates'));
});
