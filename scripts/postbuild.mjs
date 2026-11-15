import { copyFileSync } from "node:fs";
import { join } from "node:path";

/**
 * GitHub Pages serves 404.html for any path without a real file. A copy of
 * the SPA shell there means deep links (e.g. /werk) load the app, which then
 * routes to the right page client-side.
 */
const dist = new URL("../dist", import.meta.url).pathname;
copyFileSync(join(dist, "index.html"), join(dist, "404.html"));
console.log("Copied dist/index.html → dist/404.html (SPA fallback for GitHub Pages)");
