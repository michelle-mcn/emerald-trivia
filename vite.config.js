import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: "./src",
  base: "./",
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "~~": path.resolve(__dirname, "./"),
    },
  },

  // vite build config
  build: {
    outDir: path.resolve('./dist'),
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './src/index.html'),
      },
    },
    entryFileNames: `assets/[name].js`,
    chunkFileNames: `assets/[name].js`,
    assetFileNames: `assets/[name].[ext]`,
    emptyOutDir: true,
  },

});

