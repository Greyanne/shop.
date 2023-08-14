/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        REM: ["REM", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        products: `repeat(auto-fill, minmax(MIN(46%,301px),1fr))`,
      },
    },
  },
  plugins: [],
};
