/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F33843',
        'primary-hover': '#D7101B',
        'secondary': '#696969',
        'background': '#FAFAFA',
        'line': '#E9E9E9',
      }
    },
  },
  plugins: [require("daisyui")],
}

