var gulp = require('gulp');
var replace = require('gulp-replace-task');
var WebpackAssets = require('./webpack.assets.js');

gulp.task('default', function() {
  console.log("default task...");
});

gulp.task('updateAssetsUrl', function() {
  var replaceTasks = [];
  var assetsKeys = Object.keys( WebpackAssets );
  assetsKeys.forEach(function(flag) {
    eval("var pattern = /public\\/js\\/"+ flag +"-(.*?)\\.js/g");
    var conf = {
      match: pattern,
      replacement: function() {
        return WebpackAssets[flag].js;
      }
    }
    replaceTasks.push(conf);
  });

  gulp.src('templates/**/*.html')
      .pipe(replace({
        patterns: replaceTasks
      }))
      .pipe(gulp.dest('templates'));
});
