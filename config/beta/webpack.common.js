const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const helpers = require('./helpers');

const clientpath = path.join(__dirname, "../src/client");

module.exports = {
  entry: {

    'polyfills': './src/client/polyfills.ts',
    'app': './src/client/main.ts',
    'styles': './src/client/styles.ts',
    vendor: [
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/core',
      '@angular/common',
      '@angular/http',
      '@angular/router',
      'rxjs'
    ]
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: helpers.root('src', 'tsconfig.json')
            }
          },
          {
            loader: 'angular-router-loader',
          },
          {
            loader: 'angular2-template-loader',
          },
          {
            loader: 'tslint-loader',
            options: {
              enforce: 'pre',
              typeCheck: true,
              emitErrors: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        exclude: /static/,
        use: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'client'),
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap' })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'client'),
        use: ['raw-loader']
      }
    ]
  },

  plugins: [

    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src/client'), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      // vendor chunk
      name: 'vendor' // the name of bundle
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),

    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //   }
    // }),

    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['app', 'polyfills']
    // }),

    // load DLL files
    new webpack.DllReferencePlugin({context: __dirname, manifest: require( path.resolve(__dirname, '../dll/ngPlatformBrowser_manifest.json'))}),
    new webpack.DllReferencePlugin({context: __dirname, manifest: require( path.resolve(__dirname, '../dll/ngPlatformBrowserDynamic_manifest.json'))}),
    new webpack.DllReferencePlugin({context: __dirname, manifest: require( path.resolve(__dirname, '../dll/ngCore_manifest.json'))}),
    new webpack.DllReferencePlugin({context: __dirname, manifest: require( path.resolve(__dirname, '../dll/ngCommon_manifest.json'))}),
    new webpack.DllReferencePlugin({context: __dirname, manifest: require( path.resolve(__dirname, '../dll/ngHttp_manifest.json'))}),
    new webpack.DllReferencePlugin({context: __dirname, manifest: require( path.resolve(__dirname, '../dll/ngRouter_manifest.json'))}),
    new webpack.DllReferencePlugin({context: __dirname, manifest: require( path.resolve(__dirname, '../dll/rxjs_manifest.json'))}),

    // make DLL assets available for the app to download
    new AddAssetHtmlPlugin([
      { filepath: require.resolve( path.resolve(__dirname, '../dll/ngPlatformBrowser.dll.js')) },
      { filepath: require.resolve( path.resolve(__dirname, '../dll/ngPlatformBrowserDynamic.dll.js')) },
      { filepath: require.resolve( path.resolve(__dirname, '../dll/ngCore.dll.js')) },
      { filepath: require.resolve( path.resolve(__dirname, '../dll/ngCommon.dll.js')) },
      { filepath: require.resolve( path.resolve(__dirname, '../dll/ngHttp.dll.js')) },
      { filepath: require.resolve( path.resolve(__dirname, '../dll/ngRouter.dll.js')) },
      { filepath: require.resolve( path.resolve(__dirname, '../dll/rxjs.dll.js')) }
    ]),


    new HtmlWebpackPlugin({
      template: 'src/client/index.html'
    }),

    new CopyWebpackPlugin([
      { 
        from: path.resolve(clientpath, "./static"),
        to: 'static',
        ignore: [".gitkeep"]
       },
    ])

  ]
};