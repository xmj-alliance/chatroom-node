const path = require('path');
const fs = require('fs');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const helpers = require('./helpers');
const serverpath = path.resolve(helpers.root('src'), "./server");
const outputRootPath = helpers.root('dist');
const outputPath = path.join(outputRootPath, "./server");

let nodeModules = {};
fs.readdirSync('node_modules')
.filter(function(x) {
  return ['.bin'].indexOf(x) === -1;
})
.forEach(function(mod) {
  nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = {
  entry: {
    'chatroom-node': './src/server/chatroom-node.ts'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  target: 'node',

  externals: nodeModules,

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [

          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: path.resolve(serverpath, '../tsconfig.json')
            }
          }

        ],
        exclude: /node_modules/
      }

    ]
  },

  plugins: [
    new CleanWebpackPlugin([outputPath], {root: outputRootPath, verbose: false})
  ],

  output: {
    path: outputPath,
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].[hash].chunk.js'
  }


}