

/**
 * js原型链总结，参考https://blog.csdn.net/m0_37589327/article/details/78655038
 * 
 * 1. 只有构造函数才有protoType， 那么什么是构造函数，就是类啦。 prototype指向构造函数的原型。
 * 
 * 2. 只有原型才有construct, consttruct顾名思义就是构造函数，construct指向构造函数。
 * 
 * 3. 任何对象都有__proto__, __proto__指向啥？ 指向产生对象的构造函数的原型。
 * 
 * 4. B原型对象---__proto__  == A 原型对象， A原型对象. __proto__ = Object的原型对象, Object的原型对象.__proto__=null
 * 
 * 5. 所有构造函数的.__proto__ 指向 Funtion的原型对象。
 */
let t = new Object();

class A{
constructor(){
    this.a = 100;
}
}

class B extends A{
    constructor(){
        super();
        this.b = 101;
    }
}

let a = new A();
let b = new B();
console.info("ok");