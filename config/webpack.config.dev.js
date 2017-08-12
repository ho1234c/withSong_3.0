const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js',
  },
  devServer: {
    filename: 'bundle.js',
    port: 8080,
    // publicPath: path.resolve('public'),
    contentBase: path.resolve('public'),
    proxy: {
      "/api": "http://localhost:8000"
    },
    watchOptions: {
      ignore: path.resolve("src/server/*.js")
    }
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          failOnWarning: true,
          failOnError: true,
          configFile: require.resolve('./.eslintrc'),
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["env", "react"]
        }
      },
      // {
      //   test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      //   loader: 'file-loader?name=fonts/[name].[ext]'
      // },
    ]
  },
  devtool: "eval",
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: '../public/index.html',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   ecma: 8,
    //   sourceMap: true,
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor",
    //   filename: "vendor.js",
    //   minChunks: module => module.context && module.context.indexOf("node_modules") !== -1
    // })
  ]
}