const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: ['./src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'static'),
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
    port: 3000,
    hot: true,
    historyApiFallback: false, 
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin'
    }
  },
  
  plugins: [
    new HtmlWebpackPlugin({
        template: "./index.html",
    }),
  ]
}
