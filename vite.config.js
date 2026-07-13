import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath, URL } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/* Mirror the clean-URL rewrites from vercel.json so dev/preview
   behave like production */
const rewrites = {
  "/about": "/about.html",
  "/work": "/work.html",
  "/contact": "/contact.html",
  "/services": "/services.html",
};

const cleanUrls = () => {
  const middleware = (req, res, next) => {
    const [path, query] = req.url.split("?");
    if (rewrites[path]) {
      req.url = rewrites[path] + (query ? `?${query}` : "");
    }
    next();
  };

  return {
    name: "clean-urls",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
};

export default defineConfig({
  base: '/',
  plugins: [cleanUrls()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        work: resolve(__dirname, "work.html"),
        contact: resolve(__dirname, "contact.html"),
        services: resolve(__dirname, "services.html"),
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
