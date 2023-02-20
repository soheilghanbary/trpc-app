/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      colors: {
        body: "var(--body-color)",
        heading: "var(--heading-color)",
        line: "var(--line-color)",
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
      },
    },
  },
  plugins: [],
};
