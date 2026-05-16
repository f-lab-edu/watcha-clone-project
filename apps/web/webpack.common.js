const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: "./src/Main.tsx",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@watcha/queries$": path.resolve(__dirname, "../../packages/queries/src/index.ts"),
    },
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },
}
