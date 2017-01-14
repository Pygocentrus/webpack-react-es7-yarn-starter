const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

const ENV = process.env.NODE_ENV || 'development';
const PRODUCTION = ENV === 'production';

module.exports = {
  context: __dirname + "/app",

  entry: {
    js: './scripts/app.js',
    css: './styles/app.scss',
    html: './index.html',
  },

  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].chunk-[hash].js',
    path: __dirname + '/dist',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: path.resolve(__dirname, './app/scripts'),
  },

  devServer: {
    outputPath: __dirname + '/dist',
    hot: true,
    port: 3000,
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname),
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!postcss!sass'),
      },
      { test: /\.html$/, loader: 'file?name=[name].[ext]' },
      { test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.woff(2)?(\?v=[\d]\.[\d]\.[\d])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot)(\?v=[\d]\.[\d]\.[\d])?$/, loader: 'file-loader' },
      { test: /\.svg$/, loader: 'svg-inline' },
      { test: /\.json$/, loader: 'json' },
    ]
  },

  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(ENV) } }),
  ],
}
