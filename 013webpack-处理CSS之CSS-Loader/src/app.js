// import './css/base.css';
// import './css/common.css';

// -------------------css-loader的css-modules语法-------------start------------
import base from './css/base.css';
import common from './css/common.css';

const app = document.getElementById('app');
app.innerHTML += '<div class= "'+ base.box +'"></div>'; // 引用这个css样式中的class

// -------------------css-loader的css-modules语法-------------end------------

// -------------------style-loader/useable-------------start------------

// import base from './css/base.css';
// import common from './css/common.css';

// let flag = true;
// const id = setInterval(function () {
    
//     if (flag) {
//         base.use();
//         common.use();
//     } else {
//         base.unuse();
//         common.unuse();
//     }
   
//     flag = !flag;
 
// }, 500);

// setTimeout(() => {
//     clearInterval(id);
// }, 10000);
// -------------------style-loader/useable-------------end------------