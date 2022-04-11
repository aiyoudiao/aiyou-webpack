const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry : {
        'pageA': './src/pageA.js'
    },
    output : {
        // __dirname ： 当前并行的dir路径
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    module : {},
    plugins : [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        })
    ]
}