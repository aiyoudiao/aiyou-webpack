const path = require('path');

const webpack = require('webpack');
const ExtractTestWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');

const PurifyCSS = require('purifycss-webpack');
const glob = require("glob-all");

module.exports = {
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, './dist'), // 解析绝对路径
        // publicPath : './dist/', // 设置页面上动态载入的路径
        publicPath: '/', // 设置页面中引入资源的路径都是位于网站根目录的
        filename: '[name].bundle.js', // 打包后的文件名
        chunkFilename: '[name].chunk.js' // 指定动态打包后的文件名，也就是你动态加载的模块，如动态import()方法
    },

    resolve: {
        alias: {
            // 这里的$符号的意思是 只是把这个jquery这一个关键字解析到一个文件下而不是解析到某一个目录
            // 它是确切的匹配，这个jquery是要和下面webpack.ProvidePlugin中的key/value中的value一致，
            // 也就是你要告诉webpack去哪里找jquery，相当于在webpack解析webpack.ProvidePlugin中的jquery的时候，
            // 就会去 alias中找 本地的 jquery$对应的这个文件，这样一来webpack又知道这个模块在哪里了
            jquery$: path.resolve(__dirname, './src/libs/jquery.min.js')
        }
    },

    module: {
        rules: [{
                test: /\.less$/,
                use: ExtractTestWebpackPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            insertInto: '#app', // 将style标签插入到某一个dom元素下，参数可以是选择器
                            singleton: true, // 无论有几个css模块儿都只使用一个style标签
                            transform: './css.transform.js' // 指定css变形的路径，它就是一个js函数，通过它可以在css插入到页面之前对css的内容进行修改，从而根据不同浏览器呈现不同的样式等等。
                        }
                    },
                    use: [{
                            loader: 'css-loader',
                            options: {
                                //minimize : true, // 是否压缩css
                                // modules : true, // css模块儿语法，让css支持模块儿化语法，例如引入其它样式，以对象的方式调用样式中的类选择器等等
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss', // 指定postcss
                                plugins: [
                                    // require('autoprefixer')(), // 引入 自动添加浏览器前缀的对象并调用
                                    // require('cssnano')(), // 压缩css
                                    require('postcss-cssnext')(), // 使用未来的css语法
                                    // require('stylehacks')() // 处理csshacks，失败。
                                    require('postcss-sprites')({
                                        spritePath: './dist/dist/assets/imgs/', // 指定精灵图输出的路径，相对与webpack.config.js来说
                                        retina: true, // 处理retina视网膜屏，对两倍大小的图标来进行css-sprites
                                    }), // 生成css精灵图
                                ]
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {}
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    // {
                    //     loader : 'file-loader',
                    //     options : {
                    //         publicPath : './dist/assets/imgs/', // 设置页面上动态载入的路径
                    //         outputPath : './dist/', // 指定输出目录
                    //         useRelativePath : true // 生成相对路径文件夹
                    //     }
                    // },
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].min[hash:5].[ext]',
                            outputPath: './dist/assets/imgs/',
                            // publicPath : './dist/assets/imgs/',
                            // outputPath : './dist/', // 使用了postcss-sprites之后，这个选项可以不使用，因为postcss-sprites中设置了精灵图的路径
                            // useRelativePath : true,
                            limit: 10240 // 对 10kb的图片进行base64编码
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            pngquant: {
                                quality: 80 // 调整图片质量为 65% - 90% 
                            }
                        }
                    },
                ]
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name].min[hash:5].[ext]',
                        // publicPath : './dist/assets/fonts/', // 设置页面中动态访问的路径
                        outputPath: './dist/assets/fonts/', // 设置发布目录
                        // useRelativePath : true, // 使用该文件的相对目录作为一部分目录
                        limit: 10240 // 对 10kb的图片进行base64编码
                    }
                }]
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'], // 处理ES6语法 默认处理成 ES2015
                        //    plugins : ['lodash'] // 使用 babel-plugin-lodash
                    }
                }]
            },
            {
                test: path.resolve(__dirname, './src/app.js'),
                use: [{
                    loader: 'imports-loader',
                    options: {
                        $: 'jquery'
                    }
                }]
            },
            // {
            //     test : /\.html$/,
            //     use : [
            //         {
            //             loader : 'html-loader',
            //             options : {
            //                 attrs : ['img:src', 'img:data-src'], // 对页面中要处理的标签中引入的资源文件的规则定义
            //             }
            //         }
            //     ]
            // }
        ]
    },

    plugins: [
        new ExtractTestWebpackPlugin({
            filename: 'css/[name].min.css', // 指定打包后的文件名
            allChunks: false // 是否提取所有模块引入的css代码，如果为false，那么只会提取非动态加载的css代码
        }), // purifycss 插件放到 ExtractTestWebpackPlugin后面
        new PurifyCSS({
            paths: glob.sync([
                path.join(__dirname, './*.html'), // 先传html
                path.join(__dirname, './src/*.js'), // 可能还会在src目录下建相关的模板文件
            ])
        }),
        // new webpack.ProvidePlugin({
        //     $ : 'jquery'
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest' // 提取模块
        }),
        new HtmlWebpackInlineChunkPlugin({
            inlineChunks: ['manifest'] // 将提取出来的模块插入到html中
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 文件名
            template: './index.html', // 模板名
            inject: true, // 是否注入 entry中的chunks
            chunks: ['app', 'manifest'], // 指定entry中某一个chunks，不指定就会包括所有的chunk
            minify: { // 压缩
                collapseWhitespace: true, // 压缩空格
                removeComments: true, //移除备注
            }
        }),
        new webpack.optimize.UglifyJsPlugin({}),
    ]
}