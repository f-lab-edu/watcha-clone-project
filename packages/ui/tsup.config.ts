import { defineConfig } from "tsup";

export default defineConfig({
  entry: { Carousel: "src/Carousel/Carousel.tsx" },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  injectStyle: true, // CSS를 JS 번들에 주입 → 소비자는 import만 하면 스타일 자동 적용
});
