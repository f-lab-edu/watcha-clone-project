import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tsconfigPaths(), // tsconfig.json의 paths를 자동으로 alias로 등록
    ],
    server: {
      port: 4000,
      open: true,
      proxy: {
        "/api": {
          target: "https://api.themoviedb.org",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
