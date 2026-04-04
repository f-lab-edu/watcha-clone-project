const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/Main.tsx", // 번들링 시작점
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }), // 해당 템플릿을 기반으로 번들링된 JS 파일을 자동으로 삽입한 HTML 파일 생성하여 dist 폴더에 저장
  ].filter(Boolean),
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@useHooks": path.resolve(__dirname, "src/api/hooks"),
      "@api": path.resolve(__dirname, "src/api"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
    plugins: [new TsconfigPathsPlugin()], // tsconfig paths 자동 참조
    extensions: [".tsx", ".ts", ".js"], // import 시 확장자 생략 가능하게 tsx,ts,js 순으로
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader", // Babel을 사용하여 최신 JavaScript 및 TypeScript를 구버전 브라우저에서도 호환되도록 변환
      },
    ],
  },
}