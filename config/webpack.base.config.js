const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  entry: "/src/App.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  query: {
    presets: ["es2015", "react"]
  }
};
