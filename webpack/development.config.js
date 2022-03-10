const { join } = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    open: ['/marathon-planner'],
    static: {
      directory: join(__dirname, '..', 'docs'),
      publicPath: '/marathon-planner'
    }
  }
});
