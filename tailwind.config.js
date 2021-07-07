module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        rocket: "url('/rocket.webp')",
      }),
      colors: {
        Gray: "#1F1F1F",
        Dark_gray: '#141414'
      },
    },
    fontFamily: {
      Share: ["Share Tech Mono"],
      MyFont: ['"My Font"', "serif"], // Ensure fonts with spaces have " " surrounding it.
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ["hover"],
    },
  },
  plugins: [],
};
