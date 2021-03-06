const path = require('path')
const NODE_ENV = require('./').env.NODE_ENV

const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')


module.exports = {
	entry: './client/index.jsx',
	output: {
		path: path.join(__dirname, '/client/public'),
		filename: 'bundle.js'
	},
	devtool: NODE_ENV !== 'production' && 'source-map',
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
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: '\'' + NODE_ENV + '\'',
				},
			}),
			...NODE_ENV === 'production' ?
				[
					new webpack.optimize.UglifyJsPlugin({
						compress: {
							warnings: false, // Suppress uglification warnings
							unsafe: true,
							unsafe_comps: true,
							screw_ie8: true
						},
						output: {
							comments: false,
						},
						exclude: [/\.min\.js$/gi]
					}),
					new webpack.optimize.AggressiveMergingPlugin(),
					new CompressionPlugin({
						asset: '[path].gz[query]',
						algorithm: 'gzip',
						test: /\.js$|\.css$|\.html$/,
						threshold: 10240,
						minRatio: 0.8
					})
				] :
				[
					new BundleAnalyzerPlugin(),
					new LiveReloadPlugin({appendScriptTag: true})
				]
		]
}
