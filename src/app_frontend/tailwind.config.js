/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ['"Open Sans"'],
        heading: ['"Merriweather Sans"'],
      },
      colors: {
        primary: "#0052cc",
        neutral: "#D3D3D3",
        accent: "#FFD700",
        secondaryAccent: "#28a745",
        secondary: "#dedcff",
        text: "#050315",
        background: "#fbfbfe",
        black: "#0b0b0b",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
  darkMode: "class",
};
