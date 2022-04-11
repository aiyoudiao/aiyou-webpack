const path = require('path');
const webpack = require('webpack');

module.exports = {
    // 第三方模块的入口
    entry: {
        vue: ['vue', 'vue-router'],
        ui: ['element-ui']
    },

    output: {
        // dist目录在每次打包的时候都会重新删除，所以需要新建一个文件夹来放第三方模型相关的文件
        path: path.join(__dirname, '../src/dll/'),// 专门来放dll相关的文件
        filename: '[name].dll.js', // 定义dll文件名
        library: '[name]' // 定义 使用第三方库的方式，使用的人只需要正常引用[name]即可
    },

    plugins: [
        // 生成打包清单，如果使用这份清单的时候只需要在webpack.prod.conf.js中的plugins中，
        // 通过 以下这种方式进行设置，如果有多份清单你就设置多个即可
        /*
            // 设置dll的清单
            new webpack.DllReferencePlugin({
            manifest: require('../src/dll/ui-manifest.json')
            })
        */

        // 这些dll文件都不会变，所以不需要webpack每次都打包
        new webpack.DllPlugin({ // 打包后的dll放到什么地方
            // 告诉webpack如何去打包dll
            path: path.join(__dirname, '../src/dll/', '[name]-manifest.json'),
            name: '[name]'
        }),

        // 压缩混淆第三方dll文件
        new webpack.optimize.UglifyJsPlugin()
    ]
}