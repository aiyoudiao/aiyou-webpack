module.exports = {
    // 当遇到什么样的请求头类型时才进行重写
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    rewrites: [
        // {
        //     from : '/pages/a', // 规则，可以使用正则，也可以是用一个字符串
        //     to : '/pages/a.html' // 本地确定的一个页面
        // },
        {
            from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/, // 规则 正则
            to: function (context) { // 通过一个函数来进行处理
                return '/' + context.match[1] + context.match[2] + '.html'
            }
        }
    ]
}