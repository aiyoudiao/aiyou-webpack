import base from './css/base.less';

const app = document.getElementById('app');
app.innerHTML += '<div class= "'+ base.box +'"></div>'; // 引用这个css样式中的class

import { a } from './common/util'
console.log(a());

// 引入第三方库
import { chunk } from 'lodash';
console.log(chunk(['A','B','C','D'], 2));
console.log(1);

// // 引入第三方库的es-module
// import { chunk } from 'lodash-es';
// console.log(chunk(['A','B','C','D'], 2));
// console.log({});
  