const path = require("path");
module.exports = {
  // https://v4.webpack.docschina.org/configuration/mode/
  mode: "development",
  entry: "./src/index.js",
  target: "web", // 枚举
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "dist"), // string
    libraryTarget: "umd", // 通用模块定义
  }
}