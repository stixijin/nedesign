import { defineConfig } from "astro/config";
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
    site: "http://nedesigner.ru",
    prefetch: {
      prefetchAll: true,
      defaultStrategy: 'viewport',
    },
    integrations: [vue()]
  });
