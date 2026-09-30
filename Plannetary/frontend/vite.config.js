import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/jpl-horizons": {
        target: "https://ssd-api.jpl.nasa.gov",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/jpl-horizons/, "/api/horizons.api"),
      },
    },
  },
});
