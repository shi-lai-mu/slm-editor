const path = require('path');


/**
 * webpack 通用配置
 */
module.exports = {
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.svg'],
    alias: {
      '@': path.resolve('src'),
      '@core': path.resolve('src/core'),
      '@conts': path.resolve('src/conts'),
      '@types': path.resolve('src/typings'),
      '@cfg': path.resolve('src/config'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        use: ['babel-loader', 'ts-loader'],
        include: /src/,
        exclude: /node_modules/,
      },
      {
        test: /\.svg/,
        loader: 'file-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
}