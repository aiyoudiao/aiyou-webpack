const path = require('path');

const webpack = require('webpack');
const ExtractTestWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PurifyCSS = require('purifycss-webpack');
const glob = require("glob-all");

module.exports = {
    entry : {
        app : './src/app.js'
    },

    output : {
        path : path.resolve(__dirname, './dist'), // 解析绝对路径，也是所有资源的输出目录
        // publicPath : './dist/', // 设置页面上动态载入的路径
        publicPath : '/', // 设置页面中引入资源的路径都是位于网站根目录的
        filename : 'js/[name].bundle.js', // 打包后的文件名，都是js文件来着，你也可以把它放入也给文件夹
        chunkFilename: '[name].chunk.js' // 指定动态打包后的文件名，也就是你动态加载的模块，如动态import()方法
    },

    devServer : {
        port : 8484, // 设置访问端口
        proxy : { // 配置代理
            '/': { // 指定匹配路径
                target: 'https://m.weibo.cn', // 指定你代理的地址，这个路径可以指向你要访问的代理的路径
                changeOrigin: true, // 设置你本次请求的host都等于target，这样跨域才能成功。
                logLevel: 'debug', // 输出不同等级的调试信息
                pathRewrite: { // 配置页面请求重定向的规则
                     '^/comments': '/api/comments', // 将comments重定向/api/comments
                },
                headers: { 
                    // 给请求头添加内容，例如添加身份验证的cookie
                    'Cookie': '_T_WM=e79cf1a47ba6e0e8d877ff628de687a9; SUB=_2A25xFx0dDeRhGeNJ6lEW8C_JyDiIHXVS-6NVrDV6PUJbkdAKLVnZkW1NS-BS1JHcSmX_RgFWyJLcOp2jgnb8AGIi; SUHB=04We5ill88YroA; MLOGIN=1; M_WEIBOCN_PARAMS=lfid%3D102803%26luicode%3D20000174%26uicode%3D20000174',
                    // 还可以增加UA ，也就是使用什么环境来请求的，也就是伪造浏览器环境来发请求
                },
            },
            // '/api': { // 指定匹配路径
            //     target: 'https://m.weibo.cn', // 指定你代理的地址，这个路径可以指向你要访问的代理的路径
            //     changeOrigin: true, // 设置你本次请求的host都等于target，这样跨域才能成功。
            //     logLevel: 'debug', // 输出不同等级的调试信息
            // }
        },
        inline : false, // 设置为非线上模式，这样就可以在页面顶部看到每次webpack打包的进度条
        // historyApiFallback : true, // 当页面中访问到不存在的页面是跳转到首页，然后还可以重写路由规则
        historyApiFallback : { // 高级用法 ，重写路由规则
            rewrites : [
                // {
                //     from : '/pages/a', // 规则，可以使用正则，也可以是用一个字符串
                //     to : '/pages/a.html' // 本地确定的一个页面
                // },
                {
                    from : /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/, // 规则 正则
                    to : function (context) { // 通过一个函数来进行处理
                        return '/' + context.match[1] + context.match[2] + '.html'
                    }
                }
            ]
        },
    },

    resolve : {
        alias : {
            // 这里的$符号的意思是 只是把这个jquery这一个关键字解析到一个文件下而不是解析到某一个目录
            // 它是确切的匹配，这个jquery是要和下面webpack.ProvidePlugin中的key/value中的value一致，
            // 也就是你要告诉webpack去哪里找jquery，相当于在webpack解析webpack.ProvidePlugin中的jquery的时候，
            // 就会去 alias中找 本地的 jquery$对应的这个文件，这样一来webpack又知道这个模块在哪里了
            jquery$ : path.resolve(__dirname, './src/libs/jquery.min.js')
        }
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
                                        spritePath : './dist/assets/imgs/sprites', // 指定精灵图输出的路径，相对与webpack.config.js来说
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
                            outputPath: './assets/imgs/',
                            // publicPath : './dist/assets/imgs/',
                            // outputPath : './dist/', // 使用了postcss-sprites之后，这个选项可以不使用，因为postcss-sprites中设置了精灵图的路径
                            // useRelativePath : true,
                            limit: 10240 // 对 10kb的图片进行base64编码
                        }
                    },
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
                test : /\.(eot|woff2?|ttf|svg)$/,
                use : [
                    {
                        loader : 'url-loader',
                        options : {
                            name : '[name].min[hash:5].[ext]',
                            // publicPath : './dist/assets/fonts/', // 设置页面中动态访问的路径
                            outputPath : './assets/fonts/', // 设置发布目录
                            // useRelativePath : true, // 使用该文件的相对目录作为一部分目录
                            limit: 10240 // 对 10kb的图片进行base64编码
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
                        //    plugins : ['lodash'] // 使用 babel-plugin-lodash
                       }
                    }
                ]
            },
            {
                test : path.resolve(__dirname, './src/app.js'),
                use : [
                    {
                        loader : 'imports-loader',
                        options : {
                            $: 'jquery'
                        }
                    }
                ]
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

    plugins : [
        new ExtractTestWebpackPlugin({
            filename: 'css/[name].min.css', // 指定打包后的文件名
            allChunks: false // 是否提取所有模块引入的css代码，如果为false，那么只会提取非动态加载的css代码
        }), // purifycss 插件放到 ExtractTestWebpackPlugin后面
        new PurifyCSS({
            paths : glob.sync([
                path.join(__dirname, './*.html'), // 先传html
                path.join(__dirname, './src/*.js'), // 可能还会在src目录下建相关的模板文件
            ])
        }),
        // new webpack.ProvidePlugin({
        //     $ : 'jquery'
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name : 'manifest' // 提取模块
        }),
        new HtmlWebpackInlineChunkPlugin({
            inlineChunks : ['manifest'] // 将提取出来的模块插入到html中
        }),
        new HtmlWebpackPlugin({
            filename : 'index.html', // 文件名
            template : './index.html', // 模板名
            inject : true, // 是否注入 entry中的chunks
            chunks : ['app', 'manifest'], // 指定entry中某一个chunks，不指定就会包括所有的chunk
            minify : { // 压缩
                collapseWhitespace : true, // 压缩空格
                removeComments: true, //移除备注
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
        }),
        new CleanWebpackPlugin(['dist']),
    ]
}