module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public/js',
    filename: 'bundle.js'
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel-loader'
      }
    ]
  }
}
