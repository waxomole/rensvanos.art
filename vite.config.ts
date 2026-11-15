import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Single-page app: one HTML shell, react-router serves every clean URL.
 * Vite's dev server and preview both fall back to index.html for unknown
 * paths (appType "spa"), and the postbuild script copies index.html to
 * 404.html so GitHub Pages does the same in production.
 */
export default defineConfig({
  plugins: [react()],
});
