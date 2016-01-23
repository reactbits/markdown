const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const webpack = require('webpack');
const config = require('./webpack.config');

const port = 8000;
const app = express();
const compiler = webpack(config);

app.use(morgan('dev'));
app.use(cors());

app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath,
	stats: {
		colors: true,
	},
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(process.cwd()));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, '0.0.0.0', (err) => {
	if (err) {
		console.log(err);
		return;
	}

	console.log('Listening at http://0.0.0.0:%s', port);
});
