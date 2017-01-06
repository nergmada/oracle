const dotenvPlugin = require('webpack-dotenv-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

var serverConfig = {
  name: 'delphic-server',
  entry: [
    'babel-polyfill',
    './server/index.js',
  ],
  output: { // Compile into js/build.js
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'index.js',
  },
  module: {
    loaders: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      loaders: ['babel'],
      exclude: /node_modules/,
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }]
  },
  plugins: [
    new dotenvPlugin({
      sample: './.env.example',
      path: './.env'
    })
  ],
  resolve: {
    modules: [
      'node_modules',
      'server',
    ],
    extensions: ['', '.js'],
  },
  devtool: 'eval', // debugging - can be source-map etc
  target: 'node', // Make web variables accessible to webpack, e.g. window

};

var clientConfig = {
  name: 'delphic-client',
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    './app/index',
  ],
  output: { // Compile into js/build.js
    path: path.resolve(__dirname, 'build/public'),
    publicPath: '/',
    filename: 'index.js',
  },
  module: {
    loaders: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      loaders: ['react-hot-loader/webpack', 'babel'],
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&importLoaders=1&localIdentName=[local]__[path][name]__[hash:base64:5]!postcss-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css')
  ],
  resolve: {
    modules: [
      'node_modules',
      'app',
    ],
    extensions: ['', '.js', '.css'],
  },
  postcss: function () {
    return [
      require('autoprefixer'),
      require('precss'),
    ];
  },
  devtool: 'eval', // debugging - can be source-map etc
  target: 'web', // Make web variables accessible to webpack, e.g. window
  devServer: {
    contentBase: './public',
    hot: true,
    noInfo: true,
    historyApiFallback: {
      index: 'index.html'
    }
  },

};

module.exports = [serverConfig, clientConfig]