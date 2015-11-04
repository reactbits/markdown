var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: './demo/index',
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: ['node_modules', 'demo', 'src']
  }
};
