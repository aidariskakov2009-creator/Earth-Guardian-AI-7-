/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: { 950: "#050A12", 900: "#080F1C", 800: "#0D1826", 700: "#132234", 600: "#1B3049" },
        signal: { 400: "#5EEAD4", 500: "#22D3EE", 600: "#0FB8D4" },
        amber: { 400: "#F7B955", 500: "#F5A623" },
        flare: { 400: "#FF8A75", 500: "#FF6B5B" },
        mist: { 100: "#EAF1F7", 200: "#D3DEE9", 300: "#B7C6D6", 400: "#9AAEC1", 500: "#7E92A6" },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: { glass: "0 8px 32px rgba(0,0,0,0.35)", glow: "0 0 24px rgba(94,234,212,0.25)" },
    },
  },
  plugins: [],
};
