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
                                    require('postcss-sprites')({
                                        spritePath : './dist/dist/assets/imgs/', // 指定精灵图输出的路径，相对与webpack.config.js来说
                                        retina : true, // 处理retina视网膜屏，对两倍大小的图标来进行css-sprites
                                    }), // 生成css精灵图
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
                            name : '[name].min[hash:5].[ext]',
                            publicPath : './dist/assets/imgs/',
                            // outputPath : './dist/', // 使用了postcss-sprites之后，这个选项可以不使用，因为postcss-sprites中设置了精灵图的路径
                            useRelativePath : true,
                            limit: 10240 // 对 10kb的图片进行base64编码
                        }
                    },
                    // {
                    //     loader : 'img-loader',
                    //     options : {
                    //         pngquant : {
                    //             quality : 65 //,// 调整图片质量为 80% 
                    //         }
                    //     }
                    // },
                    {
                        loader : 'image-webpack-loader',
                        options : {
                            pngquant : {
                                quality : 80 // 调整图片质量为 65% - 90% 
                            }
                        }
                    },
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