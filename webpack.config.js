const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

const APP = 'app';
const DIST = 'dist';
const ENV = process.env.NODE_ENV || 'development';
const pathTo = (paths = []) => path.resolve(__dirname, ...paths);

module.exports = {
  context: pathTo([APP]),

  entry: {
    js: './scripts/app.js',
    css: './styles/app.scss',
    html: './index.html',
  },

  output: {
    path: pathTo([DIST]),
    filename: 'bundle.js',
    chunkFilename: '[name].chunk-[hash].js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: pathTo([APP, 'scripts']),
  },

  devServer: {
    outputPath: pathTo([DIST]),
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
    new CleanWebpackPlugin([DIST]),
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new webpack.DefinePlugin({ '__ENV__': JSON.stringify(ENV) }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: pathTo([APP, 'img']), to: pathTo([DIST, 'img']) },
      { from: pathTo([APP, 'fonts']), to: pathTo([DIST, 'fonts']) },
    ]),
  ],
}
