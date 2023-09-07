/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard"],
      },
      colors: {
        primary: "#0086FF",
        secondary: "#001B33",
        tertiary: "#5FB2FD",
        quaternary: "#E9F4FF",
        error: "#FF3743",
        "gray/50": "#f9f9f9",
        "gray/100": "#e1e1e1",
        "gray/200": "#c4c4c4",
        "gray/300": "#a6a6a6",
        "gray/400": "#898989",
        "gray/500": "#6b6b6b",
        "gray/600": "#565656",
        "gray/700": "#404040",
        "gray/800": "#2b2b2b",
        "gray/900": "#151515",
        "blue/100": "#cce0ff",
        "blue/200": "#99c2ff",
        "blue/300": "#66a3ff",
        "blue/400": "#3385ff",
        "blue/500": "#0066ff",
        "blue/600": "#0052cc",
        "blue/700": "#003d99",
        "blue/800": "#002966",
        "blue/900": "#001433",
        "lightblue/100": "#e3ebfd",
        "lightblue/200": "#c6d7fc",
        "lightblue/300": "#aac4fa",
        "lightblue/400": "#8db0f9",
        "lightblue/500": "#719cf7",
        "lightblue/600": "#5a7dc6",
        "lightblue/700": "#445e94",
        "lightblue/800": "#2d3e63",
        "lightblue/900": "#171f31",
        "kakaoyellow": "#FEE500",
        "staryellow": "#FEB700",
      },
      fontSize: {
        "10px":"10px"
      }
    },
  },
  plugins: [],
};