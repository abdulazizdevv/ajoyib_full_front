/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
 
    variants: {
      extend: {},
    },
    extend: {
      colors: {
        mainColor: "#a93535",
        textWhite: "#FFFFFF",
        bgColor: "#F4F1EA",
      },
    },
    container: {
      screens: {
        lt: "400px",
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        "2xl": "1440px",
      },
    },
  },
  plugins: [],
};