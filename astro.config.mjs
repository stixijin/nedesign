import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    site: "http://nedesigner.ru",
    prefetch: {
      prefetchAll: true,
      defaultStrategy: 'viewport'
    }
  });
