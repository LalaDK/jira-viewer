const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 5555,
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        ws: true,
        changeOrigin: true,
        pathRewrite: {'^/api': ''},
        secure: false,
        logLevel: 'debug'
      },
    },
  },
})
