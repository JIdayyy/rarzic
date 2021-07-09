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
    boxShadow: {
      input3: '-5px -5px 10px rgba(182, 182, 182, 0.11), 5px 5px 10px rgba(0, 0, 0, 0.48)',
      input2: '5px 5px 5px rgba(0, 0, 0, 0.5), -5px -5px 5px rgba(68, 68, 68, 0.25)',
      input: 'inset 5px 5px 5px rgba(0, 0, 0, 0.8), inset -5px -5px 5px rgba(68, 68, 68, 0.25)',
      playbar: '8px 8px 15px rgba(0, 0, 0, 0.6), 10px 10px 15px rgba(255, 255, 255, 0.08)inset, -10px -10px 15px rgba(0, 0, 0, 0.5)inset',
      player: '5px 5px 15px rgba(0, 0, 0, 0.5), 10px 10px 15px rgba(255, 255, 255, 0.08)inset, -10px -10px 15px rgba(0, 0, 0, 0.5)inset',
      layoutContainer: '10px 10px 10px rgba(0, 0, 0, 0.5)',
      searchbar: '5px 5px 10px rgba(0, 0, 0, 0.8)',
      sideBar: '10px 10px 10px rgba(0, 0, 0, 0.49), -10px -10px 10px rgba(5, 5, 5, 0.25)',
      ImgPlaybar: '-5px -5px 15px rgba(255, 255, 255, 0.10), 5px 5px 10px rgba(0, 0, 0, 0.8)',
      MobilPlaybar: '-10px -10px 15px rgba(255, 255, 255, 0.10), 10px 10px 10px rgba(0, 0, 0, 0.9)',
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
