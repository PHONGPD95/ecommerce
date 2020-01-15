const path = require("path");

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      "~": path.resolve(__dirname, "src"),
      "~assets": path.resolve(__dirname, "src/assets"),
      "~components": path.resolve(__dirname, "src/components"),
      "~graphql": path.resolve(__dirname, "src/graphql"),
      "~screens": path.resolve(__dirname, "src/screens"),
      "~stores": path.resolve(__dirname, "src/stores"),
      "~utils": path.resolve(__dirname, "src/utils")
    }
  };

  return config;
};
