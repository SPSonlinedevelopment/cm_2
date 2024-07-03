module.exports = function (api) {
  api.cache(true);
  return {
    plugins: ["nativewind/babel"],

    presets: [
      ["@babel/preset-env", { targets: { node: "current" } }],
      "@babel/preset-typescript",
      "babel-preset-expo",
    ],
  };
};
