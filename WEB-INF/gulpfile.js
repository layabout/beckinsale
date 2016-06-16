var gulp = require('gulp');
var replace = require('gulp-replace-task');
var WebpackAssets = require('./webpack.assets.js');

gulp.task('default', function() {
  console.log(Object.keys(WebpackAssets));
  //todo 使用keys循环替换所有资源路径
});

gulp.task('replace', function(){
  gulp.src('templates/**/*.html')
    .pipe(replace({
      patterns: [
        {
          match: /js\/vendors-(.*?)\.js/g,
          replacement: function() {
            return WebpackAssets['vendors'].js;
          }
        }
      ]
    }))
    .pipe(replace({
      patterns: [
        {
          match: /js\/home-(.*?)\.js/g,
          replacement: function() {
            return WebpackAssets['home'].js;
          }
        }
      ]
    }))
    .pipe(gulp.dest('templates'));
});
