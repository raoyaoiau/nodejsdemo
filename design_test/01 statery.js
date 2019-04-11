

class Duck{
    constructor(opts){
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

class Flyer{
    fly(){
        console.info("i am flyer");
    }
}

class Swimer{
    swim(){
        console.info("i am swimer");
    }
}

class NewDuck extends Duck{
    constructor(opts){
        super(opts);
        this.name = opts.name;
    }
}

class NoFlyer extends Flyer{
    fly(){
        console.info("i can not fly");
    }
}

let a = new NewDuck({name:"哈哈", flyer:new NoFlyer(), swimer:new Swimer()});
a.fly();
a.swim();