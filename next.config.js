const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = {
  images: {
    domains: [
      "static.fnac-static.com",
      "static.fnac-static.com",
      "m.media-amazon.com",
      "static.highsnobiety.com",
      "static.highsnobiety.com",
      "static.fnac-static.com",
      "i1.sndcdn.com",
    ],
  },
};
module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
  },
});
