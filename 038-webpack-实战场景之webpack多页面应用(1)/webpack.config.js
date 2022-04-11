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
    plugins: [
        new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'react',
            minChunks: Infinity // 只打包react就不会打其它的
        })
    ]
}