/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
      screens: {
        xl: "1440px",
      },
    },
    extend: {
      colors: {
        yellow: {
          20: "#fdf9ee",
          50: "#F1E2A6",
          100: "#FFEC9E",
          200: "#F9F7F7",
          500: "#F7F1DF",
          600: "#ECE5E0",
          700: "#F7F4F4",
          800: "#F7F7F7",
        },
        text: "#330A21",
        bordo: {
          20: "#ecdbe3",
          100: "#750843",
          200: "#60113D",
          300: "#330A21",
        },
        beige: "#C4B7AF",
        grey: {
          100: "#D6D6D6",
          200: "#1F1F1F",
          300: "#383838",
          400: "#F9F7F7",
          500: "#EFEEED",
        },
        error: "#B00000",
        main:{
          100: "#651B22",
          200: "#7D141B",
          300: "#4D171B",
          400: "#60113D",
          900: "#330A21"
        },
        second:{
          100: "#d62b39",
          200: "#f4c48d",
          300: "#AC7E42",
          400: "#F5F1EB",
          900: "#322713"
        },
        gold: {
          100: "#F4C48D",
          200: "#f4c38b",
        }
      },
    },
  },
  plugins: [],
};
