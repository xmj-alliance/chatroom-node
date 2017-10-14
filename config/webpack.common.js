const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const helpers = require('./helpers');

const clientpath = path.join(__dirname, "../src/client");
const appPath = path.resolve(clientpath, 'app');
const globalscss = [
  path.resolve(clientpath, 'styles.scss')
];
const themeScssPath = [
  path.resolve(clientpath, 'assets/scss/themes')
]

module.exports = {
  entry: {
    'polyfills': './src/client/polyfills.ts',
    'vendor': './src/client/vendor.ts',
    'app': './src/client/main.ts',
    'styles': './src/client/styles.ts'
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
      },
      {
        /* Scoped scss */
        test: /\.scss$/,
        exclude: globalscss.concat(themeScssPath), // exclude global and theme scss
        use: [
          {
            loader: "to-string-loader" // Angular needs to-string instead of style-loader
          },
          {
            loader: "css-loader?sourceMap" // translates CSS into CommonJS
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
            loader: "css-loader?sourceMap" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
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
      name: ['app', 'vendor', 'polyfills']
    }),

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