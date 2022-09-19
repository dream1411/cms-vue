const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath:
    process.env.NODE_ENV === "production" ? "/" : "/",
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.resolve.alias.set("vue-i18n", "vue-i18n/dist/vue-i18n.cjs.js");
  },
});
