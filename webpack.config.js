var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack');

//bundling react index.js into a file named bundle.js and placing it in ./public/js
//this will return a file readable by browsers by compiling all the code into straight javascript (no .jsx)


module.exports = {
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-map',
  // plugins: [
  //   // new webpack.HotModuleReplacementPlugin(),
  //   new BrowserSyncPlugin({
  //     host: 'localhost',
  //     port: 8080,
  //     server: { baseDir: ['public'] }
  //   })
  // ],
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
};
