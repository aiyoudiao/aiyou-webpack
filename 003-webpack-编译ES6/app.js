// import "babel-polyfill"; // 引入全局的垫片

let func = () => {};
const NUM = 45;
let arr = [1, 2 , 4];
let newArr = arr.map(item => item * 2);
let newArr3 = arr.map(item => item * 2);

document.body.innerHTML += ("<br/><br/>new Set(newArr)" + new Set(newArr));
console.log("new Set(newArr)", new Set(newArr));

function* func() {

}