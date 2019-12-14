const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const nodeEnv = process.env.NODE_ENV || "development";

const config = {
  entry: "./frontend/src/index.js",
  mode: nodeEnv,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /module\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[folder]__[local]--[hash:base64:5]"
              }
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.(css|scss)$/,
        exclude: /\.module\.(css|scss)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        exclude: /\.inline\.svg$/,
        use: [
          {
            loader: "url-loader",
            options: {
              fallback: "file-loader",
              limit: 16000 // 16kb
            }
          }
        ]
      },
      {
        test: /\.inline\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true,
              svgo: {
                plugins: [{ removeViewBox: false }]
              }
            }
          }
        ]
      }
    ]
  },
  devtool: nodeEnv === "development" ? "source-map" : "none",
  plugins: [new CopyWebpackPlugin([{ from: "frontend/static/", to: "./" }])],
  output:
    process.env.NODE_ENV === "production"
      ? {
          path: path.resolve(__dirname, "./priv/static"),
          filename: "app.js",
          publicPath: "/"
        }
      : {
          path: path.resolve(__dirname, "./priv/static"),
          filename: "app.js",
          publicPath: "http://localhost:8000/"
        },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css", ".scss"],
    alias: { root: path.resolve(__dirname, "./frontend/src/") }
  },
  devServer: {
    historyApiFallback: true,
    host: "0.0.0.0",
    port: 8000,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    writeToDisk: filePath => {
      return /(favicon\.ico|texture.jpg|robots.txt|particle.png)$/.test(
        filePath
      );
    },
    /* eslint-disable */
    before: function(app, webpackServer) {
      // We override the listen() function to set keepAliveTimeout.
      // See: https://github.com/microsoft/WSL/issues/4340
      // Original listen(): https://github.com/webpack/webpack-dev-server/blob/f80e2ae101e25985f0d7e3e9af36c307bfc163d2/lib/Server.js#L744
      const { listen } = webpackServer;
      webpackServer.listen = function(...args) {
        const server = listen.call(this, ...args);
        server.keepAliveTimeout = 0;
        return server;
      };
    }
    /* eslint-enable */
  }
};

module.exports = config;
