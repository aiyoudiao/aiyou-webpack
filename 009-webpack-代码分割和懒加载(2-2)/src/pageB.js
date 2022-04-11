// import './subPageA'
// import './subPageB'

// import * as _ from 'lodash'

// ------------------------------------------------------------------------------------------------

import * as _ from 'lodash'

let page = 'subPageB';

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

export default 'pageB';
