const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: {
    app: './src/app.js',
    print: './src/print.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    allowedHosts: [
      '192.168.0.237',
    ]

  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /(node_modules)/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{loader: 'css-loader',options: { url: false, minimize: true }}, 'postcss-loader', {loader: 'sass-loader',options: { url: false}}]
        })
      }
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    
    // new CleanWebpackPlugin(['dist']),
    // new HtmlWebpackPlugin({
    //   title: 'Development'
    // }),
    new ExtractTextPlugin('style.css')
  ]
};
