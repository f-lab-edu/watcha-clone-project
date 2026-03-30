const path = require("path");
const { merge } = require("webpack-merge");
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, "dist"), // 빌드 후 폴더명
    filename: "bundle.js", // 파일명
    clean: true, // 빌드 시 기존 파일 제거여부
  },
});