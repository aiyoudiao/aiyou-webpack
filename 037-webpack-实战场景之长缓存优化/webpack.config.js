const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    main: './src/foo',
    vendor: ['react']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: '[name].[hash].js'
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    // 给每一个chunk使用name而不是webpack随机生成的id
    new webpack.NamedChunksPlugin(),
    // 给每一个module使用name而是webpack随机生成的id
    new webpack.NamedModulesPlugin(),
    // 提取公共代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // 选择上面的vendor
      minChunks: Infinity
    }),
    // 提取 webpack runtime
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest' // 选中上面entry中没有的chunk就可以了
    })
  ]
}
