const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const path = require("path");

const dotenv = require('dotenv');
dotenv.config({ path: './.env.development' });

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new Dotenv({
      path: './.env.development'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: '/',
  },
  devServer: {
    proxy: [{
      context: ['/api'],
      target: process.env.TMDB_BASE_URL,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
      secure: false
    }],
    port: 4000,
    hot: true,
    open: true,
    historyApiFallback: true
  },
})
