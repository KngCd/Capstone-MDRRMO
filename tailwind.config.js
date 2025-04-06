/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      }
    },
  },
  plugins: [],
};