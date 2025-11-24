// tailwind.config.js (or tailwind.config.ts)
export default {
  darkMode: "class",            // <— IMPORTANT
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F97316",
          hover: "#EA580C",
        },
      },
    },
  },
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
}
