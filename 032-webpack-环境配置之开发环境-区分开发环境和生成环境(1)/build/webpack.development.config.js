const webpack = require('webpack')

module.exports = {
    // 开发使用 cheap-module-source-map
    // 线上使用 source-map
    devtool: 'cheap-module-source-map', // eval，它在编译时和重新编译时速度都是非常快的

    // 配置 webpack-dev-server 开发服务器
    devServer: {
        port: 8484, // 设置访问端口
        overlay: true, // 在浏览器中遮罩层里看到相关的eslint的信息
        proxy: { // 配置代理
            '/': { // 指定匹配路径
                target: 'https://m.weibo.cn', // 指定你代理的地址，这个路径可以指向你要访问的代理的路径
                changeOrigin: true, // 设置你本次请求的host都等于target，这样跨域才能成功。
                logLevel: 'debug', // 输出不同等级的调试信息
                pathRewrite: { // 配置页面请求重定向的规则
                    '^/comments': '/api/comments' // 将comments重定向/api/comments
                },
                headers: {
                    // 给请求头添加内容，例如添加身份验证的cookie
                    'Cookie': '_T_WM=e79cf1a47ba6e0e8d877ff628de687a9; SUB=_2A25xFx0dDeRhGeNJ6lEW8C_JyDiIHXVS-6NVrDV6PUJbkdAKLVnZkW1NS-BS1JHcSmX_RgFWyJLcOp2jgnb8AGIi; SUHB=04We5ill88YroA; MLOGIN=1; M_WEIBOCN_PARAMS=lfid%3D102803%26luicode%3D20000174%26uicode%3D20000174'
                    // 还可以增加UA ，也就是使用什么环境来请求的，也就是伪造浏览器环境来发请求
                }
            }
            // '/api': { // 指定匹配路径
            //     target: 'https://m.weibo.cn', // 指定你代理的地址，这个路径可以指向你要访问的代理的路径
            //     changeOrigin: true, // 设置你本次请求的host都等于target，这样跨域才能成功。
            //     logLevel: 'debug', // 输出不同等级的调试信息
            // }
        },
        // 设置为非线上模式，这样就可以在页面顶部看到每次webpack打包的进度条 false为非线上
        inline: true, // 设置为线上模式，这样就可以在浏览器控制台看到webpack的打包机模块热更新状态信息
        hot: true, // 开启模块热更新
        hotOnly: true, // 让页面不进行全局的刷新来触发这个更新
        // historyApiFallback : true, // 当页面中访问到不存在的页面是跳转到首页，然后还可以重写路由规则
        historyApiFallback: { // 高级用法 ，重写路由规则
            rewrites: [
                // {
                //     from : '/pages/a', // 规则，可以使用正则，也可以是用一个字符串
                //     to : '/pages/a.html' // 本地确定的一个页面
                // },
                {
                    from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/, // 规则 正则
                    to: function (context) { // 通过一个函数来进行处理
                        return '/' + context.match[1] + context.match[2] + '.html'
                    }
                }
            ]
        }
    },
    plugins: [
        // 模块热更新
        new webpack.HotModuleReplacementPlugin({}),
        // 输出模块热更新中清晰的相对路径输出
        new webpack.NamedModulesPlugin({})
    ]
}