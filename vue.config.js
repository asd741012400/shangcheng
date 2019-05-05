const Timestamp = new Date().getTime();

module.exports = {
    // webpack 配置
    configureWebpack: { 
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
            filename: `[name].${Timestamp}.js`,
            chunkFilename: `[name].${Timestamp}.js`
        },
    },
    //基本路径
    publicPath: './',
    //输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://api.gomart.cn/',
    //             changeOrigin: true,
    //             pathRewrite: {
    //               '^/': '/'
    //             }
    //         }
    //     }
    // }
};