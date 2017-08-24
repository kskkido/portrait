const path = require('path')
const LiveReloadPlugin = require('webpack-livereload-plugin')

module.exports = {
	entry: './client/index.jsx',
	output: {
		path: path.resolve(__dirname, '/client/public'),
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '*']
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader',
			options: {
				presets: ['react', 'es2015']
			}
		},
		{
			test: /\.ts?x$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'awesome-typescript-loader'
		}]
	},
	plugins: [
		new LiveReloadPlugin({appendScriptTag: true})
	]
}
