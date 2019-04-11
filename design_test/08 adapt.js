/** \
 * oo模式：
 * 08 适配器模式 === 把一个方块放到一个圆中， 手机充电充220v的电
 * 
 * 介绍： 将一个类的接口， 转换成客户期望的另一个接口。
 * 00原则：
 * 封装变化
 * 多用组合，少用继承。
 * 针对接口编程，不针对实现编程。
 * 为交互对象之间的松耦合设计而努力。
 * 类应该对扩展开放，对修改关闭。
 * 依赖抽象 ， 不要依赖具体类。
 */

class Iterator{

    hasNext(){

    }

    next(){

    }

    remove(){

    }
}

class Enumer {
    A(){

    }

    B(){

    }

    C(){

    }
}

class EnumerIterator extends Iterator{
    constructor(enumer){
        this.enumer = enumer;
    }
    hasNext(){
        this.enumer.A();
    }
    
    next(){
        this.enumer.B();
        
    }
    
    remove(){
        this.enumer.C();

    }
}


