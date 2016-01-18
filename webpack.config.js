const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const cssLoader = 'css?sourceMap&modules&importLoaders=1&localIdentName=[local]';

module.exports = {
	devtool: 'source-map',
	entry: [
		'webpack-hot-middleware/client',
		'./demo/index',
	],
	output: {
		path: path.join(__dirname, 'static'),
		filename: 'bundle.js',
		publicPath: '/static/',
	},
	plugins: [
		new ExtractTextPlugin('styles.css', { allChunks: true }),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(NODE_ENV),
			},
		}),
	],
	module: {
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
			{
				test: /\.(scss|css)$/,
				loader: ExtractTextPlugin.extract('style', [cssLoader, 'postcss', 'sass?sourceMap']),
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('style', [cssLoader, 'postcss', 'less?sourceMap']),
			},
			{
				test: /\.(ttf|eot|svg|woff(2)?)$/,
				loader: 'file-loader',
			},
		],
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.json', '.css', '.scss', '.less'],
		modulesDirectories: ['node_modules', 'demo', 'src'],
		alias: {
			'dev/raphael.core.js': './dev/raphael.core.js',
			'raphael.core': './raphael.core.js',
			'raphael.svg': './dev/raphael.svg.js',
			'raphael.vml': './dev/raphael.vml.js',
		},
	},
	postcss: [autoprefixer],
};
