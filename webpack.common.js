const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const envPath = `./.env.${process.env.NODE_ENV || 'development'}`;
const isDev = process.env.NODE_ENV === 'development';
require('dotenv').config({ path: envPath });

console.log(envPath);
module.exports = {
  entry: "./src/Main.tsx", // 번들링 시작점
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }), // 해당 템플릿을 기반으로 번들링된 JS 파일을 자동으로 삽입한 HTML 파일 생성하여 dist 폴더에 저장
    new Dotenv({
      path: envPath
    }), // env 파일을 로드하여 process.env.xxx 형태로 사용 가능하게,
    !isDev && new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ].filter(Boolean),
  resolve: {
    extensions: [".tsx", ".ts", ".js"], // import 시 확장자 생략 가능하게 tsx,ts,js 순으로
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader", // Babel을 사용하여 최신 JavaScript 및 TypeScript를 구버전 브라우저에서도 호환되도록 변환
      },
      {
        test: /\.css$/,
        use: [isDev ?"style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
}