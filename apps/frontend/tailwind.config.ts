import type { Config } from "tailwindcss";

const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "slide-left": "slideLeft 0.5s ease forwards",
      },
      keyframes: {
        slideLeft: {
          "0%": { opacity: "0", transform: "translate-x-[80px]" },
          "100%": { opacity: "1", transform: "translate-x-[0]" },
        },
      },
      colors: {
        main: "#bf472d",
        second: "#f2f2f3",
        crimson: "#dc143c",
        "crimson-hover": "#e3395b",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
