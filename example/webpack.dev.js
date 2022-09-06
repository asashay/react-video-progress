const path = require("path");
const commonConfig = require("./webpack.common");

module.exports = {
  ...commonConfig,
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  }
}