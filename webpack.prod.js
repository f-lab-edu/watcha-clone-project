const path = require("path");
const { merge } = require("webpack-merge");
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: path.resolve(__dirname, "dist"), // 빌드 후 폴더명
    filename: "bundle.js", // 파일명
    clean: true, // 빌드 시 기존 파일 제거여부
  },
  plugins: [
    new Dotenv({
      path: './.env.production'
    }), // env 파일을 로드하여 process.env.xxx 형태로 사용 가능하게,
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ]
  
});