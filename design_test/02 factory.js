


/**
 * 
 * 
 * 工厂就是一个 swich case
 */

class Food{
    print(){
        console.info("food");
    }
}
class Apple extends Food{
    print(){
        console.info("Apple");
    }
}
class Banna extends Food{
    print(){
        console.info("Banna");
    }
}

class FoodFactory{
   static getFood(type){
        if( !type){
            return null;
        }else if( type === 'apple'){
            return new Apple();
        }else if( type === 'banna'){
            return new Banna();
        }
    }
}

let f1 = FoodFactory.getFood('apple');
let b1 = f1 instanceof Apple;
let b2 = f1 instanceof Banna;
console.info( b1 );
console.info( b2 );