import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

const __dirname = import.meta.dirname;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
