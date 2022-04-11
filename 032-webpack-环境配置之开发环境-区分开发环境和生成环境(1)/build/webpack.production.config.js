const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')
const PurifyCSS = require('purifycss-webpack')

const path = require('path')
const glob = require('glob-all')

module.exports = {
    // 使用非常多的插件来进行优化
    plugins: [
        // purifycss 插件放到 ExtractTestWebpackPlugin后面
        new PurifyCSS({
            paths: glob.sync([
                path.join(__dirname, './*.html'), // 先传html
                path.join(__dirname, './src/*.js') // 可能还会在src目录下建相关的模板文件
            ])
        }),
        // 提取模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest' // 提取模块
        }),
        // 将提取到的模块注入到html中
        new HtmlWebpackInlineChunkPlugin({
            inlineChunks: ['manifest'] // 将提取出来的模块插入到html中
        }),
        // 压缩js
        new webpack.optimize.UglifyJsPlugin({
        }),

        // 每次打包都会清除之前生成的目录
        new CleanWebpackPlugin(['dist'])
    ]
}