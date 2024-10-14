// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2024-10-08",

  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@nuxt/eslint", "@nuxt/image", "@nuxthub/core", "@nuxt/fonts", "@nuxtjs/seo", "@nuxt/scripts", "@nuxtjs/device"],

  site: {
    url: "https://ftwa.mathix.dev",
    name: "FTWA - Free The Web Apps",
    description: "Turn any website into an app in seconds! Let websites be free from your browser's frame, Free The Web Apps!",
    defaultLocale: "en",
  },

  ogImage: {
    enabled: false,
  },

  sitemap: {
    enabled: false,
  },

  image: {
    provider: "ipx",
    quality: 100,
    formats: ["webp", "avif"],
  },

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

  runtimeConfig: {
    public: {
      remoteUrl: "http://localhost:3000",
    },
  },
});