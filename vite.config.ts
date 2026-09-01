import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // The site is published as a GitHub project page, so every asset is served
  // from /<repo>/ rather than the domain root. Set unconditionally so dev,
  // `vite preview` and the deployed build all resolve paths the same way —
  // the dev server redirects "/" here on its own.
  base: "/lingo-language-studio/",
});
