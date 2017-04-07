var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'client/index.js'),
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
		publicPath: '/public'
	},
	devServer: {
		inline: true,
		contentBase: path.resolve(__dirname, 'public'),
		compress: true,
		port: 3000,
		stats: "errors-only",
		open: true
	},
	module: {
		loaders: [
		{
			test: /\.js$/,
			exclude: /(node_modules)/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react']
			}
		},
		{
			// scss
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		},
		{
			// scss
			test: /\.scss$/,
			loader: 'style-loader!css-loader!sass-loader'
		}
		]
	}
}