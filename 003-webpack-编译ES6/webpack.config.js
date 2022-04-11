module.exports = {
    entry: { 
        app: './app.js'
    },

    output: { 
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: {
                    loader: 'babel-loader' //,
                    // options: {  // loader的配置项
                    //     "presets": [
                    //         [
                    //             "@babel/preset-env",
                    //             {
                    //                 "targets": {
                    //                     "browsers": [
                    //                         "last 2 versions"
                    //                     ]
                    //                 }
                    //             }
                    //         ]
                    //     ]
                    // }
                },
                exclude: '/node_modules/'
            }
        ]
    }
}