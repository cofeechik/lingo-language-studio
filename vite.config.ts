import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

/** Client-side routes that need to resolve on a direct hit or a refresh. */
const ROUTES = ["trial"];

/**
 * GitHub Pages has no rewrite rules, so a client-side route needs a real file.
 * Each route gets <route>/index.html, which Pages serves with a 200 — its
 * 404.html fallback would answer with the page but a 404 status. 404.html is
 * still written as a safety net for anything else.
 */
function pagesRoutes(): Plugin {
  // Read from the resolved config rather than __dirname — this config is ESM.
  let outDir = "dist";
  return {
    name: "pages-routes",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const dir = resolve(process.cwd(), outDir);
      const index = resolve(dir, "index.html");
      copyFileSync(index, resolve(dir, "404.html"));
      for (const route of ROUTES) {
        mkdirSync(resolve(dir, route), { recursive: true });
        copyFileSync(index, resolve(dir, route, "index.html"));
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), pagesRoutes()],
  // The site is published as a GitHub project page, so every asset is served
  // from /<repo>/ rather than the domain root. Set unconditionally so dev,
  // `vite preview` and the deployed build all resolve paths the same way —
  // the dev server redirects "/" here on its own.
  base: "/lingo-language-studio/",
});
