const express = require('express') // express 服务器
const webpack = require('webpack') // webpack 构建工具
const opn = require('opn') // 打开浏览器

const app = express() // 创建express对象
const port = 3000 // 设置监听端口

const webpackDevMiddleware = require('webpack-dev-middleware') // 开发中间件
const webpackHotMiddleware = require('webpack-hot-middleware') // 热更新中间件
const httpProxyMiddleware = require('http-proxy-middleware') // http代理中间件
const connectHistoryApiFallback = require('connect-history-api-fallback') // 路由重写

// 获取开发环境下的配置
const config = require('./webpack.common.config')('development')
    // 根据配置生成webpack编译器
const compiler = webpack(config)

// 获取代理数据
const proxyTable = require('./proxy')
    // 以遍历的方式依次放入添加代理
for (let context in proxyTable) {
    app.use(httpProxyMiddleware(context, proxyTable[context]))
}

// 引入路由规则对象，并且应用
const historyApiFallback = require('./historyFallback')
app.use(connectHistoryApiFallback(historyApiFallback))

// 应用 webpack开发中间件，并且传入编译器，及输出目录
app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }))
    // 应用 webpack模块热更新，并传入webpack编译器
app.use(webpackHotMiddleware(compiler))

// 监听端口
app.listen(port, function() {
    console.log('success listen to ' + port)
        // 打开浏览器
    opn('http://localhost:' + port)
})