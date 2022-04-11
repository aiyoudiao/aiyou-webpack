// import './subPageA'
// import './subPageB'

// import * as _ from 'lodash'

// -----------------------以下是代码分割的写法-----------------------------

// ------------------------方式一：Webpack Methond-------------start--------

// // 加载进来不执行
// require.include('./moduleA'); // 加载子模块中的共同的依赖，如果不这样的话，每个子模块中各自都会引入这份相同的代码

// let page = 'subPageA';

// // 按需加载 当前子模块
// if (page === 'subPageA') {

//     // 动态加载
//     require.ensure(['./subPageA'], function () {
//         // 异步加载，这一步才会真正执行这个模块儿
//         const subPageA = require('./subPageA');
//         console.log(subPageA);
//     }, 'subPageA');
    
// } else if (page === 'subPageB') {
//     // 动态加载
//     require.ensure(['./subPageB'], function () {
//         // 异步加载，这一步才会真正执行这个模块儿
//         const subPageB = require('./subPageB');
//         console.log(subPageB);
//     }, 'subPageB');
// }

// // 动态加载
// // 把第三方依赖和业务代码进行了一个分离
// // Webpack Method ：require.ensure
// require.ensure(['lodash'], function () {
//     // 异步加载
//     const _ = require('lodash');
//     _.join(['1', '2'], '3');
// }, 'vendor');

// ------------------------方式一：Webpack Methond-------------end--------


// ------------------------方式二：ES 2015 Loader Spec-------------start--------

// // 加载进来不执行
// require.include('./moduleA'); // 加载子模块中的共同的依赖，如果不这样的话，每个子模块中各自都会引入这份相同的代码

// let page = 'subPageA';

// // 按需加载 当前子模块
// if (page === 'subPageA') {

//     // 动态加载 加载进来的时候就会执行
//     // 设置魔法注释，设置chunkname
//     import(/* webpackChunkName:'subPageA' */ /* webpackMode: lazy */'./subPageA').then(function (subPageA) {
//         console.log(subPageA);
//     })
    
// } else if (page === 'subPageB') {
//     // 动态加载
//     import(/* webpackChunkName:'subPageA' */ /* webpackMode: lazy */'./subPageB').then(function (subPageB) {
//         console.log(subPageB);
//     })
// }

// // 动态加载
// // 把第三方依赖和业务代码进行了一个分离
// // Webpack Method ：require.ensure
// require.ensure(['lodash'], function () {
//     // 异步加载
//     const _ = require('lodash');
//     _.join(['1', '2'], '3');
// }, 'vendor');

// ------------------------方式二：ES 2015 Loader Spec-------------end--------


// ------------------------------------------------------------------------------------------------

import * as _ from 'lodash'

let page = 'subPageA';

// 按需加载 当前子模块
if (page === 'subPageA') {

    // 动态加载 加载进来的时候就会执行
    // 设置魔法注释，设置chunkname
    import(/* webpackChunkName:'subPageA' */ /* webpackMode: lazy */'./subPageA')
    .then(function (subPageA) {
        console.log(subPageA);
    })
    
} else if (page === 'subPageB') {
    // 动态加载
    import(/* webpackChunkName:'subPageB' */ /* webpackMode: lazy */'./subPageB')
    .then(function (subPageB) {
        console.log(subPageB);
    })
}

// ------------------------------------------------------------------------------------------------

export default 'pageA';