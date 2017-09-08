const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-map',
plugins: [
     new webpack.HotModuleReplacementPlugin(),
     new BrowserSyncPlugin({
       host: 'localhost',
       port: 8080,
       server: { baseDir: ['public'] }
     })
   ],
  output: {
    path: __dirname + '/public/js',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: ['babel-loader']
      }
    ]
  }
}
