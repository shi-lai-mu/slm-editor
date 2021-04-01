const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');


/**
 * 开发环境配置
 */
module.exports = merge(commonConfig, {
  entry: path.join(__dirname, '..', 'src', 'index.ts'),
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    contentBase:'./dist',
    compress: false,
    hot: true,
    historyApiFallback: true,
    stats: 'errors-only',
  },
  plugins:[
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [ './dist' ],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});