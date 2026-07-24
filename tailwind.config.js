/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0B0D10",
        surface: "#15181C",
        surface2: "#1D2126",
        text: "#E8E6DD",
        muted: "#8A8F98",
        accent: "#39FF88",
        accentDim: "#1E7A47",
        warm: "#F2A65A",
      },
      fontFamily: {
        mono: ["'Space Mono'", "monospace"],
        sans: ["'Inter'", "sans-serif"],
        data: ["'JetBrains Mono'", "monospace"],
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: 1 },
          "50%, 100%": { opacity: 0 },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        blink: "blink 1s step-start infinite",
        fadeUp: "fadeUp 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
