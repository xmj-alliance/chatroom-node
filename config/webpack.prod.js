const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

const outputPath = path.join(helpers.root('dist'), "./client") ;
const rootPath = path.resolve(path.join(outputPath, ".."));
const extractSassMod = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  module:{
    rules: [
      {
        test: /\.scss$/,
        use: ['to-string-loader'].concat(extractSassMod.extract(
          {
            use: [
              {
                loader: "css-loader"
              },
              {
                loader: "sass-loader"
              }
            ],
            fallback: "style-loader"
          }
        )) // to-string-loader is a workaround. issue: https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/397
      }
    ]
  },

  output: {
    path: outputPath,
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new CleanWebpackPlugin([outputPath], {root: rootPath, verbose: false}),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    }),

    extractSassMod
  ]
});