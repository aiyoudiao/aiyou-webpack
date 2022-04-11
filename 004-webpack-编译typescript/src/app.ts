import * as _ from "lodash";

// 切割数组
console.log(_.chunk([2, 5, 5 ,6 , 2, 9], 2));

const NUM = 45;

interface Cat {
    name: String,
    gender: String
}

function touchCat (cat: Cat) {
    console.log("miao", cat.name);
}

touchCat({
    name: 'tom',
    gender: 'male'
})