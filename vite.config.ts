import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

/**
 * GitHub Pages serves 404.html for any path it has no file for. Handing it a
 * copy of index.html turns that into an SPA fallback, so /trial resolves on a
 * direct hit or a refresh instead of erroring.
 */
function pagesSpaFallback(): Plugin {
  // Read from the resolved config rather than __dirname — this config is ESM.
  let outDir = "dist";
  return {
    name: "pages-spa-fallback",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const dir = resolve(process.cwd(), outDir);
      copyFileSync(resolve(dir, "index.html"), resolve(dir, "404.html"));
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), pagesSpaFallback()],
  // The site is published as a GitHub project page, so every asset is served
  // from /<repo>/ rather than the domain root. Set unconditionally so dev,
  // `vite preview` and the deployed build all resolve paths the same way —
  // the dev server redirects "/" here on its own.
  base: "/lingo-language-studio/",
});
