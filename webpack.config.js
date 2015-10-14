module.exports = {
  context: __dirname + '/src',
  entry: './main',
  output: {
    path: __dirname + '/dist',
    filename: 'utils.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  }
};
