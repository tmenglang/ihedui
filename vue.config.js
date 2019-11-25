// const BaseUrl = require('./src/config.js');
module.exports = {
    lintOnSave: false,
    runtimeCompiler: true,
    productionSourceMap: true,
    css: {
        sourceMap: true, // 开启 CSS source maps
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'https://www.ihedui.com:10001',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''  //通过pathRewrite重写地址，将前缀/api转为/
                }
            }
        }
    }
}