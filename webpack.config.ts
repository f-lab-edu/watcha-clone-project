const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

const envPath = `./.env.${process.env.NODE_ENV || 'development'}`;
require('dotenv').config({ path: envPath });

module.exports = {
  mode: "development",
  entry: "./src/Main.tsx", // 번들링 시작점
  devtool: 'inline-source-map', // 개발 모드에서 디버깅 편의를 위해 소스맵 생성
  output: {
    path: path.resolve(__dirname, "dist"), // 빌드 후 폴더명
    filename: "bundle.js", // 파일명
    clean: true, // 빌드 시 기존 파일 제거여부
  },
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
        use: ["style-loader", "css-loader"], // CSS 파일을 JS로 번들링 후 <style> 태그로 삽입
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }), // 해당 템플릿을 기반으로 번들링된 JS 파일을 자동으로 삽입한 HTML 파일 생성하여 dist 폴더에 저장
    new Dotenv({
      path: envPath
    }) // env 파일을 로드하여 process.env.xxx 형태로 사용 가능하게
  ],
  devServer: { // 개발 서버
    proxy: [{ // 로컬에서 tmdb API 호출 시 CORS 문제 해결 위해 프록시 설정
      context: ['/api'], // '/api'로 시작하는 요청 가로챔
      target: process.env.API_BASE_URL, // 실제 API 서버 주소로 프록시
      changeOrigin: true, // 프록시 요청 시 Host 헤더를 타겟 URL로 변경
      pathRewrite: { '^/api': '' }, // '/api' 접두사 제거하여 타겟 서버로 전달
      secure: false // https 인증서 검증 무시 (개발에서만 사용)
    }],
    port: 4000,
    hot: true, // HMR(Hot Module Replacement) 활성화하여 코드 변경 시 전체 페이지 새로고침 없이 변경된 모듈만 업데이트
    open: true, // 개발 서버 시작 시 자동으로 브라우저 열기
    historyApiFallback: {
      index: '/index.html',
    }, // React Router 등 SPA에서 404 대신 index.html 반환
  },
};