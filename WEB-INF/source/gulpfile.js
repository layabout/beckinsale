var gulp = require('gulp');
var path = require('path');
var replace = require('gulp-replace-task');
var tap = require('gulp-tap');
var WebpackAssets = require('./webpack.assets.js');

var htmlFileName;

gulp.task('default', function() {
  console.log("default task...");
});

gulp.task('updateAssetsUrl', function() {
  var replaceTasks = [];
  var assetsKeys = Object.keys( WebpackAssets );
  assetsKeys.forEach(function(flag) {
    eval("var pattern = /\\/assets\\/js\\/"+ flag +"(.*?)\\.js/g");
    var conf = {
      match: pattern,
      replacement: function() {
        return WebpackAssets[flag].js;
      }
    }
    replaceTasks.push(conf);
  });

  gulp.src('../templates/**/*.html')
      .pipe(replace({
        patterns: replaceTasks
      }))
      .pipe(gulp.dest('../templates'));
});

gulp.task('inject:assets', function() {
  gulp.src('../templates/**/*.html')
    .pipe(tap(function(file) {
      htmlFileName = (path.basename(file.path)).split('.')[0];
    }))
    .pipe(replace({
      patterns: [
        {
          match: /<!-- inject:js -->[\s\S]*?<!-- endinject -->/g,
          replacement: function() {
            var scripts = '<!-- inject:js -->';

            var assetsKeys = Object.keys( WebpackAssets );
            assetsKeys.forEach(function(identity) {
              if (identity == htmlFileName) {
                if (WebpackAssets['lib'] != undefined) {
                  scripts += '\n  <script type="text/javascript" src="'+ WebpackAssets['lib'].js +'"></script>';
                }

                if (WebpackAssets['vendors'] != undefined) {
                  scripts += '\n  <script type="text/javascript" src="'+ WebpackAssets['vendors'].js +'"></script>';
                }

                if (WebpackAssets[htmlFileName] != undefined) {
                  scripts += '\n  <script type="text/javascript" src="'+ WebpackAssets[htmlFileName].js +'"></script>';
                }
              }
            });

            scripts += '\n  <!-- endinject -->';
            return scripts;
          }
        },
        {
          match: /<!-- inject:css -->[\s\S]*?<!-- endinject -->/g,
          replacement: function() {
            var styles = '<!-- inject:css -->';

            var assetsKeys = Object.keys( WebpackAssets );
            assetsKeys.forEach(function(identity) {
              if (identity == htmlFileName) {
                if (WebpackAssets['vendors'] != undefined) {
                  styles += '\n  <link rel="stylesheet" type="text/css" href="'+ WebpackAssets['vendors'].css +'" />';
                }

                if (WebpackAssets[htmlFileName] != undefined) {
                  styles += '\n  <link rel="stylesheet" type="text/css" href="'+ WebpackAssets[htmlFileName].css +'" />';
                }
              }
            });

            styles += '\n  <!-- endinject -->';
            return styles;
          }
        }
      ]
    }))
    .pipe(gulp.dest('../templates'));
});
