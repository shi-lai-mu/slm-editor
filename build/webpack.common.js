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
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: ['babel-loader', 'ts-loader'],
        include: /src/,
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
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