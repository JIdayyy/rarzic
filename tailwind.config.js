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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
