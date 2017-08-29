const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.[hash:8].js',
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
  devtool: "sourc-map",
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      ecma: 8,
      sourceMap: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.js",
      minChunks: module => module.context && module.context.indexOf("node_modules") !== -1
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}