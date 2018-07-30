const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");


const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  mode: 'production',
  entry: {
    app: './src/app.js',
    print: './src/print.js'
  },
  devtool: 'none',
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
          use: [ {loader: 'css-loader', options: {minimize: true, sourceMap: false, url: false }}, 'postcss-loader', {loader: 'sass-loader',options: { url: false, minimize: true}}]
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
    // new MiniCssExtractPlugin({
    //   filename: '[name].min.css',
    //   chunkFilename: "[id].css"
    // })
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};
