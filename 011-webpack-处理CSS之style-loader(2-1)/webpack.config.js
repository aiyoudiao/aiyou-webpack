const path = require('path');

module.exports = {
    entry : {
        app : './src/app.js'
    },

    output : {
        path : path.resolve(__dirname, './dist'), // 解析绝对路径
        publicPath : './dist/', // 设置页面上动态载入的路径
        filename : '[name].bundle.js' // 打包后的文件名
    },
    module : {
        rules: [
            {
                test : /\.css$/,
                use : [
                    // 越放在后面的loader越先被接触，
                    // 也就是先将css交给css-loader，
                    // 让它先处理完 import css之后，
                    // 再交给 style-loader 将css放入页面上
                    // {
                    //     loader: 'style-loader'
                    // },
                    // {
                    //     loader: 'css-loader'
                    // }

                    // 使用link标签的方式插入css
                    // {
                    //     loader : 'style-loader/url'
                    // },
                    // {
                    //     loader : 'file-loader'
                    // }

                    // 将样式转化为模块儿，
                    // 然后选择插入或者不插入
                    // 如： import base from './src/css/base.css'
                    // 然后你就可以在js中使用 base.use() 或者 base.unuse()
                    {
                        loader : 'style-loader/useable'
                    },
                    {
                        loader : 'css-loader'
                    }
                ]
            }
        ]
    }
}