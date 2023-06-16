const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //配置代理
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8088',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                     ws: true,
                }
            }
        }
    }
})
  //配置跨域

