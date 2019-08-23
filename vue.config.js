const webpack = require("webpack");
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },
  devServer: {
    port: 80,
    proxy: {
      "/MobilePlatform": {
        target: "http://193.112.215.30:8080",
        changeOrigin: true
      }
    }
  },
  publicPath: "./",
  lintOnSave: false
};
