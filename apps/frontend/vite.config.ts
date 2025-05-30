import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  optimizeDeps: {
    include: ["pdfjs-dist/build/pdf.worker.js"],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Tu backend corriendo en WSL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
