const webpack = require("webpack");
const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry : {
        'pageA': './src/pageA.js',
        'pageB': './src/pageB.js',
        // 'vendor': ['lodash'],
    },
    output : {
        // __dirname ： 当前并行的dir路径
        path: path.resolve(__dirname, './dist'),
        publicPath: './dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    module : {} ,
    plugins : [
    //     new webpack.optimize.CommonsChunkPlugin({
    //         name: 'common',
    //         minChunks: 2,
    //         chunks: ['pageA', 'pageB']
    //         // name: 'vendor',
    //         // minChunks: Infinity
    //     }),
    //     new webpack.optimize.CommonsChunkPlugin({
    //         // name: 'common',
    //         // minChunks: 2
    //         name: 'vendor',
    //         minChunks: Infinity
    //     }),
    //     new webpack.optimize.CommonsChunkPlugin({
    //         // name: 'common',
    //         // minChunks: 2
    //         name: 'manifest',
    //         minChunks: Infinity
    //     })
        new BundleAnalyzerPlugin({}),
        // new webpack.optimize.CommonsChunkPlugin({
        //     //async: true, // 表示你要进行提取
        //     async: 'async-common', // 异步共同取出来的代码
        //     children: true, // 指定所有子模块，并不是两个页面之间，还有两个页面之间的子依赖
        //     minChunks: 2
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor', 'manifest'],
        //     minChunks: Infinity
        // })
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
            minChunks: 2
        })
    ]
}