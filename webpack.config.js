const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack Demo',
      }),
    ],
  },
  parts.lintJavaScript({ include: PATHS.app }),
  parts.lintCSS({ include: PATHS.app }),
  parts.loadJavaScript({ include: PATHS.app }),
]);




const productionConfig = merge([
  {
    performance: {
      hints: 'warning',
      maxEntrypointSize: 100000,
      maxAssetSize: 450000,
    },
  },

  parts.extractCSS({
    use: ['css-loader', parts.autoprefix()],
  }),

  parts.loadImages({
    options: {
      limit: 10000,
      name: '[name].[ext]',
    },
  }),

  parts.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),
    },
  ]),

  parts.clean(PATHS.build),
  
  parts.minifyJavaScript(),

  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
      // Run cssnano in safe mode to avoid
      // potentially unsafe transformations.
      safe: true,
    },
  }),

  parts.setFreeVariable(
    'process.env.NODE_ENV',
    'production'
  ),
  parts.attachRevision(),
]);






const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
  parts.loadImages(),
  parts.generateSourceMaps({ type: 'cheap-module-source-map' }),
]);

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
