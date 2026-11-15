import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Multi-page app: every page is a real HTML file with its own meta tags,
 * canonical URL and hreflang alternates — no SPA fallback hacks needed on
 * GitHub Pages. React powers the interactive UI on each page.
 */
const pages = [
  "index",
  "werk",
  "over-mij",
  "commissies",
  "en/index",
  "en/work",
  "en/about",
  "en/commissions",
];

const input = Object.fromEntries(
  pages.map((page) => [page.replaceAll("/", "-"), fileURLToPath(new URL(`./${page}.html`, import.meta.url))]),
);

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: { input },
  },
});
