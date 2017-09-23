var path = require('path');
var webpack = require('webpack');

var port = process.env.HOT_LOAD_PORT || 9000;

module.exports = {
  devtool: 'eval-source-map',
  entry: [
	'webpack-dev-server/client?http://localhost:'+port+'/',
	'webpack/hot/only-dev-server',
    './src/ui/index.tsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static'
  },
  plugins: [

  ],
  module: {
    loaders: [
        {
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'src')
        },
        {
            test: /\.ts(x?)$/,
            loaders: ['react-hot', 'ts?configFileName=tsconfig.webpack.json'],
            include: path.join(__dirname, 'src')
        },
        {
            test: /\.css$/,
            loaders: [ "style-loader", "css-loader" ]
        },
        {
            test: /\.less$/,
            loaders: [ "style-loader", "css-loader", "less-loader" ]
        }
    ]
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.ts', '.tsx', '.js']
  },

  devServer: {
    contentBase: path.join(__dirname, "static"),
    compress: true,
    port: port
  }
};
