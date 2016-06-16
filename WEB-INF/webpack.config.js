var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var glob = require('glob');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//获取入口文件
var entries = getEntry('modules/**/*.entry.js', 'modules/');

var chunks = Object.keys(entries);

//发布目录
var TARGET = '../public';

var webpackConfig = {
  entry: entries,
  output: {
    path: path.join(__dirname, TARGET),
    filename: 'js/[name]-[hash:9].js',
    chunkFilename: 'js/[id]-[hash:9].chunk.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      }
    ]
  },
  plugins:[
    new AssetsPlugin({
      filename: 'webpack.assets.js',
      processOutput: function(assets) {
        return 'module.exports = ' + JSON.stringify(assets);
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      chunks: chunks,
      minChunks: 3
    }),
    new ExtractTextPlugin( "css/[name].css")
  ]
}

module.exports = webpackConfig;

//扫描入口文件
function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        var filename = basename.split('.')[0];
        if(extname == '.js')
          console.log('==== Find entry file ====>>> ' + entry);
        entries[filename] = ['./' + entry];
    }
    return entries;
}
