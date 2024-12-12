import tailwind from "eslint-plugin-tailwindcss";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "vue/html-self-closing": "off",
  },
}, ...tailwind.configs["flat/recommended"],
{
  settings: {
    tailwindcss: {
      config: "./.nuxt/tailwind.config.cjs",
    },
  },
});
