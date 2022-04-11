import base from './less/base.less';
// import common from './less/common.less';

const app = document.getElementById('app');
app.innerHTML += '<div class= "'+ base.box +'"></div>'; // 引用这个css样式中的class

import(/* webpackChunkName: 'compoments-a' */ './compoments/a').then(function (a) {
    console.log(a);
})