const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-Webpack-plugin");

module.exports = {
  entry: './src/entry.jsx',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react']
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
                loader: "css-loader", options: {
                    sourceMap: true
                }
            }, {
                loader: "sass-loader", options: {
                    sourceMap: true
                }
            }]
        })
      },
      {
        test: /\.(jpeg|jpg|png|gif)$/,
        use: [
          'file-loader'
        ]
      },{
        test: /\.(svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 125000
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  plugins: [
    new ExtractTextPlugin('[name].[contenthash].css'),
    new HtmlWebpackPlugin()
  ]
};
