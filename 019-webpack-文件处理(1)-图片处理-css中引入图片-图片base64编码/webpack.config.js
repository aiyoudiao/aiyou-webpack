const path = require('path');
const ExtractTestWebpackPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const PurifyCSS = require('purifycss-webpack');
const glob = require("glob-all");

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
                               // modules : true, // css模块儿语法，让css支持模块儿化语法，例如引入其它样式，以对象的方式调用样式中的类选择器等等
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
            {
                test : /\.(png|jpg|jpeg|gif)$/,
                use : [
                    // {
                    //     loader : 'file-loader',
                    //     options : {
                    //         publicPath : './dist/assets/imgs/', // 设置页面上动态载入的路径
                    //         outputPath : './dist/', // 指定输出目录
                    //         useRelativePath : true // 生成相对路径文件夹
                    //     }
                    // },
                    {
                        loader : 'url-loader',
                        options : {
                            publicPath : './dist/assets/imgs/',
                            outputPath : './dist/',
                            useRelativePath : true,
                            limit: 102400 // 对 100kb的图片进行base64编码
                        }
                    }
                ]
            },
            {
                test : /\.js$/,
                use : [
                    {
                       loader : 'babel-loader',
                       options : {
                           presets : ['env'], // 处理ES6语法 默认处理成 ES2015
                           plugins : ['lodash'] // 使用 babel-plugin-lodash
                       }
                    }
                ]
            }
        ]
    },

    plugins : [
        new ExtractTestWebpackPlugin({
            filename: '[name].min.css', // 指定打包后的文件名
            allChunks: false // 是否提取所有模块引入的css代码，如果为false，那么只会提取非动态加载的css代码
        }), // purifycss 插件放到 ExtractTestWebpackPlugin后面
        new PurifyCSS({
            paths : glob.sync([
                path.join(__dirname, './*.html'), // 先传html
                path.join(__dirname, './src/*.js'), // 可能还会在src目录下建相关的模板文件
            ])
        }),
        new webpack.optimize.UglifyJsPlugin({})
    ]
}