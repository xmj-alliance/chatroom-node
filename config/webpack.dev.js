const path = require('path');

const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const clientpath = path.join(__dirname, "../src/client");
const appPath = path.resolve(clientpath, 'app');
const globalscss = [
  path.resolve(clientpath, 'style.scss')
]


module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  
  module: {
    rules: [
      {
        /* Scoped scss */
        test: /\.scss$/,
        exclude: globalscss, // exclude global scss
        use: [
          {
            loader: "to-string-loader" // Angular needs to-string instead of style-loader
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        /* Global scss */
        test: /\.scss$/,
        exclude: appPath, // exclude scoped styles
        use: [
          {
            loader: "style-loader" // global styles needs to get injected to <style></style>
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:4199/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});