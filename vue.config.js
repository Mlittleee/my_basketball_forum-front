const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
    //配置代理
    // 因为现在需要部署到服务器上，故暂时将代理注释掉
    devServer: {
        proxy: {
            '/api': {
                target:  'http://localhost:8088',
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

