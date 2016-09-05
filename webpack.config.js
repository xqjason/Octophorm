var path = require('path');
var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const SplitByPathPlugin = require('webpack-split-by-path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  	devtool: 'inline-source-map',  
  	entry: {
    	javascript : './src/main.js'
  	},
  	output: { 
		path: path.join(__dirname, "build"), 
		filename: 'bundle.js' 
  	},
    
  	module: {
	    loaders: [
	      {
	        test: /\.jsx?$/,
	        loader: 'babel-loader',
	        exclude: /node_modules/,
	        query: {
	          presets: ["es2015", "react", "stage-0"]
	        }
	      },
	      {
	        test: /.json$/,
	        loaders: [
	          'json'
	        ]
	      },
	      {
	        test: /\.(css|scss)$/,
	        loaders: [
	          'style',
	          'css',
	          'sass',
	          'postcss'
	        ]
	      },
	      {
	        test: /\.js$/,
	        exclude: /node_modules/,
	        loaders: ['babel']
	      }
	    ]
  	},	
  	resolveLoader: {
    	root: path.resolve(__dirname, 'node_modules')
  	},
  	plugins: [
	    new webpack.optimize.OccurrenceOrderPlugin(),
	    new webpack.NoErrorsPlugin(),
	    new HtmlWebpackPlugin({
	      template: './index.html',
	      inject: true
	    }),
	    new webpack.DefinePlugin({
	      'process.env.NODE_ENV': '"production"'
	    }),
	    new webpack.optimize.UglifyJsPlugin({
	      compress: {unused: true, dead_code: true} // eslint-disable-line camelcase
	    }),
	    new SplitByPathPlugin([{
	      name: 'vendor',
	      path: path.join(__dirname, '../node_modules')
	    }]),
	    new ExtractTextPlugin('/index-[contenthash].css')
	]
};