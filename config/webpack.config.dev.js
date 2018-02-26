const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js'
  },
  devServer: {
    filename: 'bundle.js',
    port: 8080,
    contentBase: path.resolve('public'),
    proxy: {
      '/api': 'http://localhost:8000'
    },
    stats: { colors: true },
    open: 'http://localhost:8080',
    watchOptions: {
      ignore: path.resolve('src/server/*.js'),
      aggregateTimeout: 300
    }
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        fix: true,
        failOnWarning: false,
        failOnError: false,
        configFile: require.resolve('../.eslintrc')
      }
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          'node8',
          'react',
          'stage-2'
        ]
      }
    },
    {
      rules: [{
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      }]
    },
    {
      rules: [{
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }]
      }]
    },
    {
      test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader?name=fonts/[name].[ext]'
    }
    ]
  },
  devtool: 'eval',
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};
