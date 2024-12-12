import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        title: ["Archivo", "sans-serif"],
      },
      aspectRatio: {
        "card-img": "2856 / 1920",
      },
    },
  },
};
