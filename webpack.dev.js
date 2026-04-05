const { merge } = require("webpack-merge");
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
require('dotenv').config({ path: './.env.development' });

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map', // 개발 모드에서 디버깅 편의를 위해 소스맵 생성
  plugins: [
    new Dotenv({
      path: './.env.development'
    }), // env 파일을 로드하여 process.env.xxx 형태로 사용 가능하게,
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  
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
    historyApiFallback: true
  },
})