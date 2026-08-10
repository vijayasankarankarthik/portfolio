/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d1210",
        panel: "#121a17",
        seam: "#1c2621",
        paper: "#f4f2ea",
        signal: "#7fe6b8",
        signalDim: "#4fae87",
        amber: "#e2b04f",
        muted: "#8a9690",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        body: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(127,230,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(127,230,184,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
