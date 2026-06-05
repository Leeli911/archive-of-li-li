/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f4efe4",
        "paper-light": "#fbf8f0",
        ink: "#35312d",
        graphite: "#686159",
        terracotta: "#c6816d",
        moss: "#8fa58a",
        powder: "#94abb5",
        pollen: "#e7c878",
        lilac: "#b7a7b0",
      },
      fontFamily: {
        display: [
          "Cormorant Garamond",
          "Songti SC",
          "STSong",
          "Georgia",
          "serif",
        ],
        body: [
          "Inter",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "sans-serif",
        ],
        mono: ["SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      boxShadow: {
        paper: "0 18px 45px rgba(71, 61, 49, 0.08)",
        drawer: "0 22px 50px rgba(71, 61, 49, 0.12)",
      },
    },
  },
  plugins: [],
};
