/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "hover-line": "#e59f9b",
        "selected-line": "#d0433c",
      },
    },
  },
  plugins: [],
};
