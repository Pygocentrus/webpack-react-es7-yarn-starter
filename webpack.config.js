const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pkg = require('./package.json');

const APP = 'app';
const DIST = 'dist';
const ENV = process.env.NODE_ENV || 'development';
const PRODUCTION = ENV === 'production';
const dependencies = Object.keys(pkg.dependencies) || [];
const pathTo = (paths = []) => path.resolve(__dirname, ...paths);

const plugins = [
  new CleanWebpackPlugin([DIST]),
  new ExtractTextPlugin('app.css', { allChunks: true }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(ENV) } }),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
  new CopyWebpackPlugin([
    { from: pathTo([APP, 'img']), to: pathTo([DIST, 'img']) },
    { from: pathTo([APP, 'fonts']), to: pathTo([DIST, 'fonts']) },
  ]),
];

if (PRODUCTION) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({ comments: false, sourceMap: true, warnings: false }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.DedupePlugin()
  );
}

module.exports = {
  stats: { warnings: !PRODUCTION },

  devtool: PRODUCTION ? 'cheap-module-source-map': 'cheap-module-eval-source-map',

  devServer: {
    outputPath: pathTo([DIST]),
    hot: true,
    port: 3000,
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: pathTo([APP, 'scripts']),
  },

  context: pathTo([APP]),

  entry: {
    vendor: dependencies,
    js: './scripts/app.js',
    css: './styles/app.scss',
    html: './index.html',
  },

  output: {
    path: pathTo([DIST]),
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash].js',
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
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!postcss!sass') },
      { test: /\.html$/, loader: 'file?name=[name].[ext]' },
      { test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.woff(2)?(\?v=[\d]\.[\d]\.[\d])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot)(\?v=[\d]\.[\d]\.[\d])?$/, loader: 'file-loader' },
      { test: /\.svg$/, loader: 'svg-inline' },
      { test: /\.json$/, loader: 'json' },
    ]
  },

  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],

  plugins,
}
