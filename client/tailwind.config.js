/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
    colors: {
      "background": "#1a1a1a",
      "primary": "#282828",
      "secondary": "#373737",
    }
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}

