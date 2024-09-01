/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{html,js}"],
  darkMode: "selector", // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        logo: 'url("../img/logo.png")',
      },
      backgroundColor: (theme) => ({
        ...theme("colors"),
        primary: "#7F2323",
        secondary: "#DFA334",
        tertiary: "#560000",
        body: "#FFEEEE",
      }),
      colors: {
        primary: "#7F2323",
        secondary: "#DFA334",
        tertiary: "#560000",
        primaryLight: "#E53F3F",
        links: "#FF8B8B",
      },
      textColor: {
        title: "#A2283F",
        paragraph: "#8B5E5E",
        inputPlaceholder: "rgba(128, 0, 0, 0.4)",
        footer: "#FFEEEE",
      },
      fontFamily: {
        Monserrat: ["Monserrat", "sans-serif"],
      },
    },
  },
  plugins: [require('./node_modules/tailwindcss-animated/src/index.js')],
};
