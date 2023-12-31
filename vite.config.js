import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: "./src",
  base: "./",
  publicDir: path.resolve(__dirname, "./public"),
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "~~": path.resolve(__dirname, "./"),
    },
  },
  // test directory
  test: {
    root: "./tests/unit",
  },
  // vite build config
  build: {
    outDir: path.resolve('./dist'),
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './src/index.html'),
        error404: path.resolve(__dirname, './src/404.html'),
      },
    },
    entryFileNames: `assets/[name].js`,
    chunkFileNames: `assets/[name].js`,
    assetFileNames: `assets/[name].[ext]`,
    emptyOutDir: true,
  },

});

