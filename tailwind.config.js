const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", " sans-serif"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        cblue: {
          400: "#354bb5",
          300: "#5768cd",
          200: "#7985e6",
          100: "#9ba2ff",
        },
        cyellow: { DEFAULT: "#FFF89B" },
        cgreen: { DEFAULT: "#9BFFC6" },
        cpink: { DEFAULT: "#ff9bd4" },
        corange: { DEFAULT: "#ffb675" },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
});
