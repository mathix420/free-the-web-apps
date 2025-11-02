// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["@mathix420/nuxt-layer"],

  modules: [
    "@nuxt/ui",
    "@nuxthub/core",
    "@nuxtjs/device",
    "@nuxthq/studio",
  ],

  $development: {
    runtimeConfig: {
      public: {
        remoteUrl: "http://localhost:3000",
      },
    },
  },

  $production: {
    runtimeConfig: {
      public: {
        remoteUrl: "https://ftwa.mathix.dev",
      },
    },
  },

  devtools: { enabled: true },

  site: {
    url: "https://ftwa.mathix.dev",
    name: "FTWA - Free The Web Apps",
    description: "Turn any website into an app in seconds! Let websites be free from your browser's frame, Free The Web Apps!",
    defaultLocale: "en",
  },

  runtimeConfig: {
    public: {
      remoteUrl: "http://localhost:3000",
    },
  },

  routeRules: {
    "/umami/**": { proxy: "https://cloud.umami.is/**" },
  },

  future: { compatibilityVersion: 4 },
  compatibilityDate: "2024-10-08",

  nitro: {
    prerender: {
      routes: ["/"],
      crawlLinks: true,
    },
  },

  hub: {
    kv: true,
  },

  eslint: {
    config: {
      stylistic: {
        quotes: "double",
        semi: true,
      },
    },
  },

  image: {
    provider: "ipx",
    quality: 100,
    formats: ["webp", "avif"],
  },

  ogImage: {
    enabled: false,
  },

  sitemap: {
    sources: [
      "/api/__sitemap__/urls",
    ],
  },
});
