// es6 module 语法
import sum from './sum.js'

console.log("sum(23, 24) = ", sum(23, 24));
document.body.innerHTML += ("sum(23, 24) = " + sum(23, 24));

// CommonJS module 语法
var minus = require("./minus.js");

console.log("minus(23, 24) = ", minus(23, 24));
document.body.innerHTML += ("<br/><br/>minus(23, 24) = " + minus(23, 24));

// amd module 语法
require(['./muti'], function (muti) {
    console.log("muti(23, 24) = ", muti(23, 24));
    document.body.innerHTML += ("<br/><br/>muti(23, 24) = " + muti(23, 24));
});