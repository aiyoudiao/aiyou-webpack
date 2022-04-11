const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebapckPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const path = require('path')

const baseConfig = {
    entry: {
        react: ['react']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: 'css/[name].[chunkhash].css'
        }),
        new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'react',
            minChunks: Infinity // 只打包react就不会打其它的
        })
    ]
}

// 这种函数参数的书写方式是解构加上默认参数的方式
const generatePage = function ({
    title = '',
    entry = '',
    template = './src/index.html',
    name = '',
    chunks = []
} = {}){
    return {
        entry,
        plugins: [
            // 将指定的一些chunk根据模板然后生成html文件
            new HtmlWebapckPlugin({
                title,
                chunks,
                template,
                filename: name + '.html'
            })
        ]
    }
}

// 多页面pages的数组
const pages = [
    // 生成页面A
    generatePage({ // 每一项都是对这个函数的调用
        title: 'page A', // 页面的标题
        entry: { // 入口
            a: './src/pages/a'
        },
        name: 'a', // html的名称
        chunks: ['react', 'a'] // 公用的代码和自己的业务代码
    }),
    // 生成页面B
    generatePage({ // 每一项都是对这个函数的调用
        title: 'page B', // 页面的标题
        entry: { // 入口
            b: './src/pages/b'
        },
        name: 'b', // html的名称
        chunks: ['react', 'b'] // 公用的代码和自己的业务代码
    }),
    // 生成页面A
    generatePage({ // 每一项都是对这个函数的调用
        title: 'page C', // 页面的标题
        entry: { // 入口
            c: './src/pages/c'
        },
        name: 'c', // html的名称
        chunks: ['react', 'c'] // 公用的代码和自己的业务代码
    }),
]

// // 调用时
// generatePage({
//     entry: {
//         a: './src/pages/a'
//     }
// })

// 单配置与多配置不同，不是会数组中的每一项进行合并，而是将整个数组合成一个，
module.exports = webpackMerge([baseConfig].concat(pages))


// 多配置不一定是写多份的config文件，
// 可以是这一个文件里面export出来一个数组的配置，
// 数组中的每一项都是webpack的配置
// module.exports = pages.map(page => webpackMerge(baseConfig, page)) // 通过map方法返回合并后的新配置
