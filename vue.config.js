const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath:
    process.env.NODE_ENV === "production" ? "/contractaccounting/" : "/",
  // 第三方依赖
  transpileDependencies: true,
  // 不需要生产环境的 source map
  productionSourceMap: false,
  devServer: {
    //当前项目在开发调试阶段，会把任何位置请求（没有匹配到静态资源文件的请求）代理到以下地址
    proxy: {
      "/dbapi": {
        target: "https://kc.test.com",
        ws: true,
        changeOrigin: true,
      },
      "/invoiceaspx": {
        target: "https://kc.test.com",
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
