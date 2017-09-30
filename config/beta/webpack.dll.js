const webpack = require('webpack');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputPath = path.resolve(__dirname, '../dll');
const rootPath = path.resolve(path.join(outputPath, ".."));

module.exports = {
  devtool: 'source-map',
  entry: {
    'ngPlatformBrowser': ['@angular/platform-browser'],
    'ngPlatformBrowserDynamic': ['@angular/platform-browser-dynamic'],
    'ngCore': ['@angular/core'],
    'ngCommon': ['@angular/common'],
    'ngHttp': ['@angular/http'],
    'ngRouter': ['@angular/router'],
    'rxjs': ['rxjs']
  },

  output: {
    filename: '[name].dll.js',
    path: outputPath,

    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]'
  },

  plugins: [
    new CleanWebpackPlugin([outputPath], {root: rootPath, verbose: false}),
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: path.resolve(outputPath, './[name]_manifest.json'),
      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]'
    })
  ]

}
