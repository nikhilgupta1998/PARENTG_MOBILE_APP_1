module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "react-native-reanimated/plugin",
    [
      require.resolve("babel-plugin-module-resolver"),
      {
        cwd: "babelrc",
        extensions: [".ts", ".tsx", ".js", ".ios.js", ".android.js"],
        alias: {
          assets: "./App/assets",
          components: "./App/components",
          utils: "./App/utils",
          types: "./App/types",
          styles: "./App/styles",
          navigation: "./App/navigation",
          locales: "./App/locales",
        },
      },
    ],
    "jest-hoist",
  ],
};
