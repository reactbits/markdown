const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: [
		'webpack-hot-middleware/client',
		'./demo/index',
	],
	output: {
		path: path.join(__dirname, 'demo'),
		filename: 'bundle.js',
		publicPath: '/build/',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
		}),
	],
	module: {
		noParse: [
			/vendor\/*/,
		],
		loaders: [
			{
				test: /\.json$/,
				loader: 'json',
			},
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /(node_modules|vendor)/,
			},
		],
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modulesDirectories: ['node_modules', 'demo', 'src'],
		alias: {
			'dev/raphael.core.js': './dev/raphael.core.js',
			'raphael.core': './raphael.core.js',
			'raphael.svg': './dev/raphael.svg.js',
			'raphael.vml': './dev/raphael.vml.js',
		},
	},
};
