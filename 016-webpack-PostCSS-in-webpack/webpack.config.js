const path = require('path');
const ExtractTestWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry : {
        app : './src/app.js'
    },

    output : {
        path : path.resolve(__dirname, './dist'), // 解析绝对路径
        publicPath : './dist/', // 设置页面上动态载入的路径
        filename : '[name].bundle.js', // 打包后的文件名
        chunkFilename: '[name].chunk.js' // 指定动态打包后的文件名，也就是你动态加载的模块，如动态import()方法
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
            // {
            //     test : /\.less$/,
            //     use : [
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
            //                 // minimize : true, // 是否压缩css
            //                 modules : true, // css模块儿语法，让css支持模块儿化语法，例如引入其它样式，以对象的方式调用样式中的类选择器等等
            //                 localIdentName: '[path][name]__[local]--[hash:base64:5]'
            //             }
            //         },
            //         {
            //             loader : 'less-loader',
            //             options : {}
            //         } 
            //     ]
            // },

            // 配置阶段三：配置 CSS 及其 预处理语言，
            // 还有将处理后的css提取出来

            // 使用ExtractTestWebpackPlugin的extract方法
            // 这个方法的参数是一个对象，可以使用fallback，
            // 也就是说当你不提取的时候你要告诉它你用什么来把样式
            // 加载到页面中， 这里使用style-loader，
            // 指定了fallback之后还可以继续定义use，
            // 这个use就是指定你的loader，也就是说不仅可以把样式提取出来，
            // 还可以继续使用你的处理css的loader，本来就应该这样
            // {
            //     test : /\.less$/,
            //     use : ExtractTestWebpackPlugin.extract({
            //         fallback : {
            //             loader : 'style-loader',
            //             options : {
            //                 insertInto : '#app', // 将style标签插入到某一个dom元素下，参数可以是选择器
            //                 singleton : true, // 无论有几个css模块儿都只使用一个style标签
            //                 transform : './css.transform.js'// 指定css变形的路径，它就是一个js函数，通过它可以在css插入到页面之前对css的内容进行修改，从而根据不同浏览器呈现不同的样式等等。
            //             }
            //         },
            //         use : [
            //             {
            //                 loader : 'css-loader',
            //                 options : {
            //                     //minimize : true, // 是否压缩css
            //                     modules : true, // css模块儿语法，让css支持模块儿化语法，例如引入其它样式，以对象的方式调用样式中的类选择器等等
            //                     localIdentName: '[path][name]__[local]--[hash:base64:5]'
            //                 }
            //             },
            //             {
            //                 loader : 'less-loader',
            //                 options : {}
            //             } 
            //         ]
            //     })
            // },

            // 配置阶段四：配置 CSS 及其 预处理语言，
            // 还有将处理后的css提取出来，
            // 使用PostCSS对CSS进行处理
            {
                test : /\.less$/,
                use : ExtractTestWebpackPlugin.extract({
                    fallback : {
                        loader : 'style-loader',
                        options : {
                            insertInto : '#app', // 将style标签插入到某一个dom元素下，参数可以是选择器
                            singleton : true, // 无论有几个css模块儿都只使用一个style标签
                            transform : './css.transform.js'// 指定css变形的路径，它就是一个js函数，通过它可以在css插入到页面之前对css的内容进行修改，从而根据不同浏览器呈现不同的样式等等。
                        }
                    },
                    use : [
                        {
                            loader : 'css-loader',
                            options : {
                                //minimize : true, // 是否压缩css
                                modules : true, // css模块儿语法，让css支持模块儿化语法，例如引入其它样式，以对象的方式调用样式中的类选择器等等
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        },
                        {
                            loader : 'postcss-loader',
                            options : {
                                ident : 'postcss', // 指定postcss
                                plugins : [
                                    // require('autoprefixer')(), // 引入 自动添加浏览器前缀的对象并调用
                                    // require('cssnano')(), // 压缩css
                                    require('postcss-cssnext')(), // 使用未来的css语法
                                    // require('stylehacks')() // 处理csshacks，失败。
                                ]
                            }
                        },
                        {
                            loader : 'less-loader',
                            options : {}
                        } 
                    ]
                })
            },
        ]
    },

    plugins : [
        new ExtractTestWebpackPlugin({
            filename: '[name].min.css', // 指定打包后的文件名
            allChunks: false // 是否提取所有模块引入的css代码，如果为false，那么只会提取非动态加载的css代码
        })
    ]
}