
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    port: 3000,
    host: '127.0.0.1',
    proxy: {
      "/swiggy-api": {
        target: "https://www.swiggy.com",
        changeOrigin: true,

        rewrite: (path) => path.replace(/^\/swiggy-api/, ""),

        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
          Accept: "application/json",
        },
      },
    },
  },
});
