/**
 * Compont          -----> ConcreteComponent
 * 
 * 
 * Decorator
 * 
 * 
 * 
 * 就是策略模式 的算法和本体的基类是同一个，
 * 这就是装饰者模式。
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

class Base {
    fly(){}
}

class Duck extends Base{
    constructor(opts){
        super();
        this.name = opts.name || "";
        this.sex = opts.sex || "";
        this.flyBehavi = opts.flyer;
        this.swimBehavi = opts.swimer;
    }

    fly(){
        this.flyBehavi.fly();
    }

    swim(){
        this.swimBehavi.swim();
    }
}

class Flyer extends Base{
    fly(){
        console.info("i am flyer");
    }
}

class Swimer extends Base{
    swim(){
        console.info("i am swimer");
    }
}

class NewDuck extends Duck{
    constructor(opts){
        super(opts);
        this.name = opts.name;
    }

    fly(){
        super.fly();
        console.log("我是新鸭子");
    }
}

class NoFlyer extends Flyer{
    fly(){
        console.info("i can not fly");
    }
}

/* let a = new NewDuck({name:"哈哈", flyer:new NoFlyer(), swimer:new Swimer()});
a.fly();
a.swim(); */

let a = new NewDuck({flyer:new NoFlyer()});
a.fly();