// vite.config.js
import { fileURLToPath, URL } from "url";
import react from "file:///mnt/e/QBTech/RentSpace-NFT-Staking/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///mnt/e/QBTech/RentSpace-NFT-Staking/node_modules/vite/dist/node/index.js";
import environment from "file:///mnt/e/QBTech/RentSpace-NFT-Staking/node_modules/vite-plugin-environment/dist/index.js";
import dotenv from "file:///mnt/e/QBTech/RentSpace-NFT-Staking/node_modules/dotenv/lib/main.js";
import tailwindcss from "file:///mnt/e/QBTech/RentSpace-NFT-Staking/node_modules/tailwindcss/lib/index.js";
import { createHtmlPlugin } from "file:///mnt/e/QBTech/RentSpace-NFT-Staking/node_modules/vite-plugin-html/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///mnt/e/QBTech/RentSpace-NFT-Staking/src/nft-staking-rentspace-frontend/vite.config.js";
dotenv.config({ path: "../../.env" });
var vite_config_default = defineConfig({
  build: {
    emptyOutDir: true
  },
  esbuild: {
    include: /\.(mdx|js|jsx|ts|tsx)$/,
    exclude: [],
    loader: "jsx"
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis"
      }
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true
      }
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  },
  plugins: [
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" })
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
          new URL("../declarations", __vite_injected_original_import_meta_url)
        )
      }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2UvUUJUZWNoL1JlbnRTcGFjZS1ORlQtU3Rha2luZy9zcmMvbmZ0LXN0YWtpbmctcmVudHNwYWNlLWZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbW50L2UvUUJUZWNoL1JlbnRTcGFjZS1ORlQtU3Rha2luZy9zcmMvbmZ0LXN0YWtpbmctcmVudHNwYWNlLWZyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9tbnQvZS9RQlRlY2gvUmVudFNwYWNlLU5GVC1TdGFraW5nL3NyYy9uZnQtc3Rha2luZy1yZW50c3BhY2UtZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICd1cmwnO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IGVudmlyb25tZW50IGZyb20gJ3ZpdGUtcGx1Z2luLWVudmlyb25tZW50JztcclxuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xyXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAndGFpbHdpbmRjc3MnXHJcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1odG1sJztcclxuXHJcbmRvdGVudi5jb25maWcoeyBwYXRoOiAnLi4vLi4vLmVudicgfSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJ1aWxkOiB7XHJcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcclxuICB9LFxyXG4gIGVzYnVpbGQ6e1xyXG4gICAgaW5jbHVkZTogL1xcLihtZHh8anN8anN4fHRzfHRzeCkkLyxcclxuICAgIGV4Y2x1ZGU6IFtdLFxyXG4gICAgbG9hZGVyOlwianN4XCJcclxuICB9LFxyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgZXNidWlsZE9wdGlvbnM6IHtcclxuICAgICAgZGVmaW5lOiB7XHJcbiAgICAgICAgZ2xvYmFsOiBcImdsb2JhbFRoaXNcIixcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHByb3h5OiB7XHJcbiAgICAgIFwiL2FwaVwiOiB7XHJcbiAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly8xMjcuMC4wLjE6NDk0M1wiLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjc3M6e1xyXG4gICAgcG9zdGNzczp7XHJcbiAgICAgIHBsdWdpbnM6W3RhaWx3aW5kY3NzKCldXHJcbiAgICB9XHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCh7IGluY2x1ZGU6IC9cXC4obWR4fGpzfGpzeHx0c3x0c3gpJC8gfSksXHJcbiAgICBlbnZpcm9ubWVudChcImFsbFwiLCB7IHByZWZpeDogXCJDQU5JU1RFUl9cIiB9KSxcclxuICAgIGVudmlyb25tZW50KFwiYWxsXCIsIHsgcHJlZml4OiBcIkRGWF9cIiB9KSxcclxuICAgIC8vIGNyZWF0ZUh0bWxQbHVnaW4oe1xyXG4gICAgLy8gICBpbmplY3Q6IHtcclxuICAgIC8vICAgICBkYXRhOiB7XHJcbiAgICAvLyAgICAgICBjc3A6IFwiaW1nLXNyYyAqICdzZWxmJyBkYXRhOiBodHRwczpcIixcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICB9LFxyXG4gICAgLy8gfSksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgZmluZDogXCJkZWNsYXJhdGlvbnNcIixcclxuICAgICAgICByZXBsYWNlbWVudDogZmlsZVVSTFRvUGF0aChcclxuICAgICAgICAgIG5ldyBVUkwoXCIuLi9kZWNsYXJhdGlvbnNcIiwgaW1wb3J0Lm1ldGEudXJsKVxyXG4gICAgICAgICksXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9ZLFNBQVMsZUFBZSxXQUFXO0FBQ3ZhLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLFlBQVk7QUFDbkIsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUyx3QkFBd0I7QUFObU4sSUFBTSwyQ0FBMkM7QUFRclMsT0FBTyxPQUFPLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFcEMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsYUFBYTtBQUFBLEVBQ2Y7QUFBQSxFQUNBLFNBQVE7QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULFNBQVMsQ0FBQztBQUFBLElBQ1YsUUFBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLGdCQUFnQjtBQUFBLE1BQ2QsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLE1BQ1Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLE1BQ2hCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUk7QUFBQSxJQUNGLFNBQVE7QUFBQSxNQUNOLFNBQVEsQ0FBQyxZQUFZLENBQUM7QUFBQSxJQUN4QjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU0sRUFBRSxTQUFTLHlCQUF5QixDQUFDO0FBQUEsSUFDM0MsWUFBWSxPQUFPLEVBQUUsUUFBUSxZQUFZLENBQUM7QUFBQSxJQUMxQyxZQUFZLE9BQU8sRUFBRSxRQUFRLE9BQU8sQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFRdkM7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsVUFDWCxJQUFJLElBQUksbUJBQW1CLHdDQUFlO0FBQUEsUUFDNUM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
