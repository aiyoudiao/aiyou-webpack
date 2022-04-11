const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry : {
        'pageA': './src/pageA.js',
        // 'pageB': './src/pageB.js',
        // 'vendor': ['lodash'],
    },
    output : {
        // __dirname ： 当前并行的dir路径
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    module : {}//,
    // plugins : [
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
    //     // new webpack.optimize.CommonsChunkPlugin({
    //     //     names: ['vendor', 'manifest'],
    //     //     minChunks: Infinity
    //     // })
    // ]
}