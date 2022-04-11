import base from './css/base.less';

const app = document.getElementById('app');

// 连注释的代码它也会进行 Tree-shaking CSS，这是一个bug
// 注释的代码中有使用css类，在Tree-shaking CSS的时候也会算在里面
// app.innerHTML += '<div class= "'+ base.box +'"></div>'; // 引用这个css样式中的class
// app.innerHTML += '<div class="box"></div>'

// 动态添加div
const div = document.createElement('div');
div.className = 'layerBox'
app.appendChild(div);

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
  