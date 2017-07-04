const path = require('path');
const HhtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const commonConfig = {
  entry: {
    app: PATHS.app,
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  plugins: [
    new HhtmlWebpackPlugin({
      title: 'Webpack Demo',
    })
  ]
}

module.exports = (env) => {
  console.log('env:', env);
  return commonConfig;
}