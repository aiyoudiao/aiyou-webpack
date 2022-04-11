import './css/base.less'
import './css/common.less'
import { compomentA } from './compoments/a'

$('div').addClass('new')

let app = document.getElementById('app')
let list = compomentA()
app.append(list)

// $.get('/api/comments/show', {
//     'id': '4316823396398996',
//     'page': 1
// }, function (data) {
//     console.log(data)
// })

// $.get('/comments/show', {
//     'id': '4316823396398996',
//     'page': 1
// }, function (data) {
//     console.log(data)
// })

// $.get('/msg/index', {
//     format: 'cards'
// }, function (data) {
//     console.log(data)
// })

// 检查模块热更新是否存在
if (module.hot) {
    // 检测变动的模块
    module.hot.accept('./compoments/a', function () {
        // 移除旧节点
        app.removeChild(list)
        // 重新引入新组件
        let compomentA = require('./compoments/a').compomentA
        let newlist = compomentA() // 创建节点

        // 添加新的节点
        app.append(newlist)
        // 用新的节点替换现在旧的节点
        list = newlist
    })
}