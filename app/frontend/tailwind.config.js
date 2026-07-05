/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F8FAFC",
        card: "#FFFFFF",
        ink: "#1E293B",
        accent: "#3B82F6",
        success: "#22C55E",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
