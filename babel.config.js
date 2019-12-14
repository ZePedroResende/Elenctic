module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["last 2 versions", "safari >= 7"]
        },
        useBuiltIns: "usage",
        corejs: 3
      }
    ],
    "@babel/preset-react"
  ],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import"
  ],
  env: {
    development: {
      plugins: [
        "react-hot-loader/babel",
        "@babel/plugin-transform-react-jsx-source"
      ]
    },
    test: {
      plugins: ["@babel/plugin-transform-modules-commonjs"]
    }
  }
};
