const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: ['./src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'static'),
    publicPath: "/",
    filename: '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  context: __dirname,
  target: 'web',
  mode: 'development',

  devServer: {
    static: {
      directory: path.join(__dirname, '/'), 
    },
    open: true,
    port: 3007,
    hot: true,
    historyApiFallback: true, 
    headers: {
    //   'Cross-Origin-Embedder-Policy': 'require-corp',
    //   'Cross-Origin-Opener-Policy': 'same-origin'
    'Cache-Control': 'no-store',
    },
  },
  
  plugins: [
    new HtmlWebpackPlugin({
        template: "./index.html",
    }),
  ]
}
