var path = require('path');
var webpack = require('webpack');

module.exports = {
  	devtool: 'inline-source-map',  
  	entry: {
    	javascript : './main.js'
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
	      }
	    ]
  	}
};