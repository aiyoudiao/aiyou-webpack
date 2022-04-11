const path = require('path')

const productionConfig = require('./webpack.production.config')
const developmentConfig = require('./webpack.development.config')

const merge = require('webpack-merge')

const webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const generateConfig = env => {
    // 提取css
    const extractLess = new ExtractTextWebpackPlugin({
        filename: 'css/[name].min.css', // 指定打包后的文件名
        allChunks: false // 是否提取所有模块引入的css代码，如果为false，那么只会提取非动态加载的css代码
    })

    // 脚本相关的loader
    const scriptLoader = ['babel-loader']
        .concat(env === 'production'
            ? []
            : [{
                loader: 'eslint-loader',
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            }]
        )

    // css相关的loader
    const cssLoader = [
        {
            loader: 'css-loader',
            options: {
                importLoaders: 2, // 表示后面跟着几个loader
                sourceMap: env === 'devlopment'
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss', // 指定postcss
                sourceMap: env === 'devlopment',
                plugins: [
                    // require('autoprefixer')(), // 引入 自动添加浏览器前缀的对象并调用
                    // require('cssnano')(), // 压缩css
                    require('postcss-cssnext')() // 使用未来的css语法
                    // require('stylehacks')() // 处理csshacks，失败。

                ].concat(
                    env === 'production'
                        ? require('postcss-sprites')({
                            spritePath: './dist/assets/imgs/sprites', // 指定精灵图输出的路径，相对与webpack.config.js来说
                            retina: true // 处理retina视网膜屏，对两倍大小的图标来进行css-sprites
                        }) // 生成css精灵图
                        : []
                )
            }
        },
        {
            loader: 'less-loader',
            options: {
                sourceMap: env === 'devlopment'
            }
        }
    ]

    // 样式最后处理结果相关的loader
    const styleLoader = env === 'production'
        ? extractLess.extract({
            fallback: {
                loader: 'style-loader'
                // options: {
                //     insertInto: '#app', // 将style标签插入到某一个dom元素下，参数可以是选择器
                //     singleton: true, // 无论有几个css模块儿都只使用一个style标签
                //     transform: './css.transform.js'// 指定css变形的路径，它就是一个js函数，通过它可以在css插入到页面之前对css的内容进行修改，从而根据不同浏览器呈现不同的样式等等。
                // }
            },
            use: cssLoader
        })
        : [{
            loader: 'style-loader'
        }].concat(cssLoader)

    // 文件处理相关的loader
    const fileLoader = env === 'development'
        ? [{
            loader: 'file-loader',
            options: {
                name: '[name].min[hash:5].[ext]', // 文件名
                outputPath: './assets/imgs/' // 输出目录
            }
        }]
        : [{
            loader: 'url-loader',
            options: {
                name: '[name].min[hash:5].[ext]',
                outputPath: './assets/imgs/',
                limit: 1024 // 对 1kb的图片进行base64编码
            }
        }]

    // 返回公共的配置
    return {
        entry: {
            app: './src/app.js'
        },

        output: {
            path: path.resolve(__dirname, '../dist'), // 解析绝对路径，也是所有资源的输出目录
            // publicPath : './dist/', // 设置页面上动态载入的路径
            publicPath: '/', // 设置页面中引入资源的路径都是位于网站根目录的
            filename: 'js/[name].bundle.js', // 打包后的文件名，都是js文件来着，你也可以把它放入也给文件夹
            chunkFilename: '[name].chunk.js' // 指定动态打包后的文件名，也就是你动态加载的模块，如动态import()方法
        },

        resolve: {
            alias: {
                // 这里的$符号的意思是 只是把这个jquery这一个关键字解析到一个文件下而不是解析到某一个目录
                // 它是确切的匹配，这个jquery是要和下面webpack.ProvidePlugin中的key/value中的value一致，
                // 也就是你要告诉webpack去哪里找jquery，相当于在webpack解析webpack.ProvidePlugin中的jquery的时候，
                // 就会去 alias中找 本地的 jquery$对应的这个文件，这样一来webpack又知道这个模块在哪里了
                jquery$: path.resolve(__dirname, '../src/libs/jquery.min.js')
            }
        },

        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: styleLoader
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: fileLoader.concat(env === 'production'
                        ? [{
                            loader: 'image-webpack-loader',
                            options: {
                                pngquant: {
                                    quality: 80 // 调整图片质量为 65% - 90%
                                }
                            }
                        }]
                        : []
                    )
                },
                {
                    test: /\.(eot|woff2?|ttf|svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: '[name].min[hash:5].[ext]',
                                // publicPath : './dist/assets/fonts/', // 设置页面中动态访问的路径
                                outputPath: './assets/fonts/', // 设置发布目录
                                // useRelativePath : true, // 使用该文件的相对目录作为一部分目录
                                limit: 10240// 对 10kb的图片进行base64编码
                            }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    include: [path.resolve(__dirname, '../src')], // 指定处理文件的文件夹
                    exclude: [path.resolve(__dirname, '../src/libs'), path.resolve(__dirname, '../src/app.js')], // 排除指定文件夹
                    use: scriptLoader
                },
                {
                    test: path.resolve(__dirname, '../src/app.js'),
                    use: [
                        {
                            loader: 'imports-loader',
                            options: {
                                $: 'jquery'
                            }
                        }
                    ]
                }
            ]
        },

        plugins: [
            // 提取css，因为已经获取了，所以在这里写上也没有关系
            extractLess,
            // 将模块变成标签插入到html中
            new HtmlWebpackPlugin({
                filename: 'index.html', // 文件名
                template: './index.html', // 模板名
                inject: true, // 是否注入 entry中的chunks
                chunks: ['app', 'manifest'], // 指定entry中某一个chunks，不指定就会包括所有的chunk
                minify: { // 压缩
                    collapseWhitespace: true, // 压缩空格
                    removeComments: true // 移除备注
                }
            }),
            // 注意全局的模块或者变量
            new webpack.ProvidePlugin({
                $: 'jquery'
            })
        ]
    }
}

// 根据环境导出相关的配置
module.exports = env => {
    let config = env === 'production'
        ? productionConfig
        : developmentConfig

    // 合并公共配置 及 当前使用环境的配置
    return merge(generateConfig(env), config)
}