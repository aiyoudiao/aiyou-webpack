import base from './css/base.css';
import common from './css/common.css';

let flag = true;
const id = setInterval(function () {
    
    if (flag) {
        base.use();
        common.use();
    } else {
        base.unuse();
        common.unuse();
    }
   
    flag = !flag;
 
}, 500);

setTimeout(() => {
    clearInterval(id);
}, 10000);