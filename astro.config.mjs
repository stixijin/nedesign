import { defineConfig } from "astro/config";
import vue from '@astrojs/vue';
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    site: "https://nedesigner.ru",
    devToolbar: {
      enabled: false
    },
    prefetch: {
      prefetchAll: true,
    },
    integrations: [
      vue({ appEntrypoint: '/src/app/_main.ts' }),
      icon({
        iconDir: "src/tokens/icons/",
      })
    ]
  });
