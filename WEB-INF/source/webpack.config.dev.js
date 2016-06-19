var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var EntryUtil = require('./entry-util');

//获取入口文件
var entries = EntryUtil('modules/**/*.entry.js', 'modules/');

var chunks = Object.keys(entries);

//剥离第三方库文件
entries['lib'] = ['jquery'];

//build path
var TARGET = '../templates/assets';

var webpackConfig = {
  entry: entries,
  output: {
    path: path.join(__dirname, TARGET),
    publicPath:'/assets/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].chunk.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') },
      { test: /\.(png|jpg|jpeg)$/, loader: 'url-loader?limit=10240&name=img/[name].[ext]' },
      { test: /\.html$/, loader: "raw-loader" }
    ]
  },
  plugins:[
    new AssetsPlugin({
      filename: 'webpack.assets.js',
      processOutput: function(assets) {
        return 'module.exports = ' + JSON.stringify(assets);
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      chunks: chunks,
      minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'lib'
    }),
    new ExtractTextPlugin( "css/[name].css"),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  devServer: {
    contentBase: '../templates',
    host: 'localhost',
    port: 3000
    // proxy: {
    //   '/api/*': {
    //     target: 'http://localhost:8080',
    //     secure: false
    //   }
    // }
  },
  devtool: 'source-map'
}

module.exports = webpackConfig;
