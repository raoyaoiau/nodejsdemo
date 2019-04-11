/**
 * 多个简单工厂合到一起就是抽象工厂了
 */

 class FoodFF {
     static getFactory(type) {
         if (!type) {
             return null;
         } else if (type === 'f1') {
             return new FoodFactory1();
         } else if (type === 'f') {
             return new FoodFactory();
         }
     }
 }


/**
 * 
 * 
 * 简单工厂就是一个 swich case
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

/* let f1 = FoodFactory.getFood('apple');
let b1 = f1 instanceof Apple;
let b2 = f1 instanceof Banna;
console.info( b1 );
console.info( b2 ); */


/**
 * 
 * 
 * 简单工厂就是一个 swich case
 */

class Food2{
    print(){
        console.info("food");
    }
}
class Apple2 extends Food2{
    print(){
        console.info("Apple");
    }
}
class Banna2 extends Food2{
    print(){
        console.info("Banna");
    }
}

class FoodFactory2{
   static getFood(type){
        if( !type){
            return null;
        }else if( type === 'apple'){
            return new Apple2();
        }else if( type === 'banna'){
            return new Banna2();
        }
    }
}