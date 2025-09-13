import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(fileURLToPath(new URL(".", import.meta.url)), "index.html"),
        about: resolve(fileURLToPath(new URL(".", import.meta.url)), "about.html"),
        work: resolve(fileURLToPath(new URL(".", import.meta.url)), "work.html"),
        project: resolve(fileURLToPath(new URL(".", import.meta.url)), "project.html"),
        contact: resolve(fileURLToPath(new URL(".", import.meta.url)), "contact.html"),
      },
    },
    assetsInclude: [
      "**/*.jpeg",
      "**/*.jpg",
      "**/*.png",
      "**/*.svg",
      "**/*.gif",
    ],
    copyPublicDir: true,
  },
});
