// @ts-check
// @ts-ignore
import cfg from "@mathix420/nuxt-layer/eslint.config.mjs";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  cfg,
  {
    settings: {
      tailwindcss: {
        config: "./.nuxt/tailwind.config.cjs",
      },
    },
  },
);
