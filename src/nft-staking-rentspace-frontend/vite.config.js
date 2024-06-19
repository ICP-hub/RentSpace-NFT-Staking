import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';
import dotenv from 'dotenv';
import tailwindcss from 'tailwindcss'
import { createHtmlPlugin } from 'vite-plugin-html';

dotenv.config({ path: '../../.env' });

export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  esbuild:{
    include: /\.(mdx|js|jsx|ts|tsx)$/,
    exclude: [],
    loader:"jsx"
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  css:{
    postcss:{
      plugins:[tailwindcss()]
    }
  },
  plugins: [
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    // createHtmlPlugin({
    //   inject: {
    //     data: {
    //       csp: "img-src * 'self' data: https:",
    //     },
    //   },
    // }),
  ],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(
          new URL("../declarations", import.meta.url)
        ),
      },
    ],
  },
});
