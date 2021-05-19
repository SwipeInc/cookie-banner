const path = require("path");

module.exports = {
  mode: "production",
  entry: "./script/banner.js",
  output: {
    filename: "banner.min.js",
    path: path.resolve(__dirname, "dist"),
  },
};
