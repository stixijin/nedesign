import { defineConfig } from "astro/config";
import vue from '@astrojs/vue';
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    site: "https://nedesigner.ru",
    prefetch: {
      prefetchAll: true,
      defaultStrategy: 'load',
    },
    integrations: [
      vue(),
      icon({
        iconDir: "src/shared/icons/",
      })
    ]
  });
