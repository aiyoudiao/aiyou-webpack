const webpack = require('webpack')
const proxy = require('./proxy')
const historyApiFallback = require('./historyFallback')

module.exports = {
    // 开发使用 cheap-module-source-map
    // 线上使用 source-map
    devtool: 'cheap-module-source-map', // eval，它在编译时和重新编译时速度都是非常快的

    // 配置 webpack-dev-server 开发服务器
    devServer: {
        port: 8484, // 设置访问端口
        overlay: true, // 在浏览器中遮罩层里看到相关的eslint的信息
        proxy: proxy,
        // 设置为非线上模式，这样就可以在页面顶部看到每次webpack打包的进度条 false为非线上
        inline: true, // 设置为线上模式，这样就可以在浏览器控制台看到webpack的打包机模块热更新状态信息
        hot: true, // 开启模块热更新
        hotOnly: true, // 让页面不进行全局的刷新来触发这个更新
        // historyApiFallback : true, // 当页面中访问到不存在的页面是跳转到首页，然后还可以重写路由规则
        historyApiFallback: historyApiFallback // 高级用法 ，重写路由规则
    },
    plugins: [
        // 模块热更新
        new webpack.HotModuleReplacementPlugin({}),
        // 输出模块热更新中清晰的相对路径输出
        new webpack.NamedModulesPlugin({})
    ]
}