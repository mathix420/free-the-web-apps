import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        title: ["Archivo", "sans-serif"],
      },
    },
  },
};
