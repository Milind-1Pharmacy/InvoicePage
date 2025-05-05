/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure your files are included
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
      },
      screens: {
        "xs-425": { max: "425px" },
        "xs-375": { max: "375px" },
        "xs-325": { max: "325px" },
      },
    },
  },
  plugins: [],
};
