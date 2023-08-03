const { join } = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./base.config');
const { publicPath } = require('./common');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    open: [publicPath],
    static: {
      directory: join(__dirname, '..', 'docs'),
      publicPath
    }
  }
});
