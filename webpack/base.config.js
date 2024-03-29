const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const { publicPath } = require('./common');

module.exports = {
  entry: './source/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: resolve(__dirname, '..', 'tsconfig.json')
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath
            }
          }
        ]
      }
    ]
  },
  output: {
    path: resolve(__dirname, '..', 'docs'),
    publicPath
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './source/index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  }
};
