/**
 * Object 里有32个函数
 * 
 * 
 */
console.info(Object.__proto__ === Function.__proto__);
console.info('ok');


class A{
    do(){
        console.info("A.do");
    }
}

let a = new A();
console.info( a.do1);

//1.
Object.defineProperties(a, {
    'do1':{
        value:1,
        enumerable:true
    }
})
console.info( a.do1);

//2.
var t = {
    1: 1,
    "2": "xiaxu",
    3: true
}

console.info(Object.keys( t ));
console.info(Object.values(t));

//3.
let a1 = new A();
console.info( a1.hasOwnProperty('do'));