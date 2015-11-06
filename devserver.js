process.env.UV_THREADPOOL_SIZE = 100;

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');

var port = 8000;
var app = express();
app.use(express.static(process.cwd()));

var compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, '0.0.0.0', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://0.0.0.0:%s', port);
});
