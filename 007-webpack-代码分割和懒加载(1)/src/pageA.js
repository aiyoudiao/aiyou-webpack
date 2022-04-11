// import './subPageA'
// import './subPageB'

// import * as _ from 'lodash'

// -----------------------以下是代码分割的写法-----------------------------

// 加载进来不执行
require.include('./moduleA'); // 加载子模块中的共同的依赖，如果不这样的话，每个子模块中各自都会引入这份相同的代码


// 按需加载 当前子模块
if (page === 'subPageA') {

    // 动态加载
    require.ensure(['./subPageA'], function () {
        // 异步加载
        const subPageA = require('./subPageA');
    }, 'subPageA');
    
} else if (page === 'subPageB') {
    // 动态加载
    require.ensure(['./subPageB'], function () {
        // 异步加载
        const subPageB = require('./subPageB');
    }, 'subPageB');
}

// 动态加载
// 把第三方依赖和业务代码进行了一个分离
// Webpack Method ：require.ensure
require.ensure(['lodash'], function () {
    // 异步加载
    const _ = require('lodash');
    _.join(['1', '2'], '3');
}, 'vendor');

export default 'pageA';