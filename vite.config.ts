import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  ssr: {
    // CommonJS-пакеты с Babel-обёрткой: если оставить их внешними, Node отдаёт
    // { default: Component } и React падает на «element type is invalid».
    // Собираем внутрь SSR-бандла, чтобы интероп разрулил Rollup.
    noExternal: ["react-fast-marquee", "react-countup", "countup.js"],
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
