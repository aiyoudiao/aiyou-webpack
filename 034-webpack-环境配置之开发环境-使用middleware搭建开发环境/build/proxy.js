module.exports = {
    // 原来是 / ， 修改成 /.+， 表示根目录后面还要有其它内容才能匹配，不然就直接跳到微博了
    '/.+': { // 指定匹配路径
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
}