/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        homePage: "url('./src/images/home.jpg')",
        "custom-gradient":
          "linear-gradient(to bottom right, #006400, #008000, #38b000, #ccff33)",
      },
    },
  },
  plugins: [],
};
