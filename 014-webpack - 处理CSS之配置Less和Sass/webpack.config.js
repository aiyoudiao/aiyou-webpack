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
            // 配置 阶段 一： 配置 CSS 
            // {
            //     test : /\.css$/,
            //     use : [
            //         // 越放在后面的loader越先被接触，
            //         // 也就是先将css交给css-loader，
            //         // 让它先处理完 import css之后，
            //         // 再交给 style-loader 将css放入页面上
            //         // {
            //         //     loader: 'style-loader'
            //         // },
            //         // {
            //         //     loader: 'css-loader'
            //         // }

            //         // 使用link标签的方式插入css
            //         // {
            //         //     loader : 'style-loader/url'
            //         // },
            //         // {
            //         //     loader : 'file-loader'
            //         // }

            //         // 将样式转化为模块儿，
            //         // 然后选择插入或者不插入
            //         // 如： import base from './src/css/base.css'
            //         // 然后你就可以在js中使用 base.use() 或者 base.unuse()
            //         // {
            //         //     loader : 'style-loader/useable'
            //         // },
            //         // {
            //         //     loader : 'css-loader'
            //         // }
            //         {
            //             loader : 'style-loader',
            //             options : {
            //                 insertInto : '#app', // 将style标签插入到某一个dom元素下，参数可以是选择器
            //                 singleton : true, // 无论有几个css模块儿都只使用一个style标签
            //                 transform : './css.transform.js'// 指定css变形的路径，它就是一个js函数，通过它可以在css插入到页面之前对css的内容进行修改，从而根据不同浏览器呈现不同的样式等等。
            //             }
            //         },
            //         {
            //             loader : 'css-loader',
            //             options : {
            //                 minimize : true, // 是否压缩css
            //                 modules : true, // css模块儿语法，让css支持模块儿化语法，例如引入其它样式，以对象的方式调用样式中的类选择器等等
            //                 localIdentName: '[path][name]__[local]--[hash:base64:5]'
            //             }
            //         }
            //     ]
            // },
            // 配置阶段二：配置 CSS 及其 预处理语言
            {
                test : /\.less$/,
                use : [
                    {
                        loader : 'style-loader',
                        options : {
                            insertInto : '#app', // 将style标签插入到某一个dom元素下，参数可以是选择器
                            singleton : true, // 无论有几个css模块儿都只使用一个style标签
                            transform : './css.transform.js'// 指定css变形的路径，它就是一个js函数，通过它可以在css插入到页面之前对css的内容进行修改，从而根据不同浏览器呈现不同的样式等等。
                        }
                    },
                    {
                        loader : 'css-loader',
                        options : {
                            // minimize : true, // 是否压缩css
                            modules : true, // css模块儿语法，让css支持模块儿化语法，例如引入其它样式，以对象的方式调用样式中的类选择器等等
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader : 'less-loader',
                        options : {}
                    } 
                ]
            }
        ]
    }
}