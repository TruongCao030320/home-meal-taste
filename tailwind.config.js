/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        video: 'url("../src/assets/images/pan.mp4")',
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        fadeOut: {
          "0%": { opacity: 0.2 },
          "100%": { opacity: 1 },
        },
        bigScale: {
          "0%": { transform: "scale(1)", opacity: 0.8 },
          "100%": { transform: "scale(1.5)", opacity: 0 },
        },
        appear: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        rightTag: {
          "0%": {
            transform: "skewY(1.2deg)",
            right: "-500px",
          },
          "100%": {
            transform: "skewY(0) right-0",
          },
        },
        closeRightTag: {
          "100%": {
            transform: "skewY(1.2deg)",
            right: "0",
          },
          "0%": {
            transform: "skewY(0) right-[-500px]",
          },
        },
      },
      animation: {
        wiggle: "wiggle 2s ease-in-out infinite",
        fadeOut: "fadeOut 0.2s ease-in-out",
        bigScale: "bigScale 1s ease-in-out infinite",
        appear: "appear 1s ease-in-out forwards",
        skewRightTag: "rightTag .5s ease-in-out",
        closeSkewRightTag: "closeRightTag .5s ease-in-out",
      },
      fontFamily: { festive: ["Festive", "Manrope"] },
      colors: {
        primaryColor: "#0065FF",
        yellowColor: "#FEB60D",
        purpleColor: "#9771FF",
        irisBlueColor: "#01B5C5",
        headingColor: "#181A1E",
        textColor: "#4E545F",
        colorBg: "#F7F5FF",
        bgColorBtn: "#50429B",
        bgBtnColor: "#FF8C21",
      },
      boxShadow: {
        // panelShadow: "rgba(17,12,46,0.15) 0px 48px 100px 0px",
        panelShadow: "black 0px 48px 100px 0px",
      },
    },
  },
  plugins: [],
};
