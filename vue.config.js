const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath:
    process.env.NODE_ENV === "production" ? "/cms-n06n53ogr-dream1411.vercel.app/" : "/",
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.resolve.alias.set("vue-i18n", "vue-i18n/dist/vue-i18n.cjs.js");
  },
});
