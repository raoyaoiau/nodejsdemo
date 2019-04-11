/**
 * oo模式：
 * 07 命令模式 === 封装调用
 * 
 * 介绍： 将请求封装成对象， 这可以让你使用不同的请求、队列，或者日志请求来参数化其他对象。命令模式也支持撤销操作
 * 
 * 00原则：
 * 封装变化
 * 多用组合，少用继承。
 * 针对接口编程，不针对实现编程。
 * 为交互对象之间的松耦合设计而努力。
 * 类应该对扩展开放，对修改关闭。
 * 依赖抽象 ， 不要依赖具体类。
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

 class Stock{
     constructor(){
         this.name = "贵州茅台";
         this.price = 800;
     }

     buy(p){
        console.info("当前%s买入了%d",new Date().toLocaleString(),  p);
    }
    
    sell(p){
        console.info("当前%s卖出了%d",new Date().toLocaleString(),  p);

     }
 }

 /**
  * 命令基类
  */
 class Order{
    execute(){}
 }

 class BuyOrder extends Order{
    constructor(stock, p){
        super();
        this.stock = stock;
        this.p = p;
    }
    execute(){
        this.stock.buy(this.p);
    }
}

class SellOrder extends Order{
    constructor(stock, p){
        super();
        this.stock = stock;
        this.p = p;
    }
    execute(){
        this.stock.sell(this.p);
    }
 }

 class Broker{
     constructor(){
        this.orderList = [];
     }

     takeOrder( order){
         this.orderList.push( order ); //代码只是说明，不做校验
     }

     placeOrders(){
         for(const order of this.orderList){
             order.execute();
         }
     }
 }


 const stock = new Stock();//创建一个股票
 const b1 = new BuyOrder( stock, 1);// 买入动作
 const b2 = new BuyOrder( stock, 2);// 买入动作
 const b3 = new BuyOrder( stock, 3);// 买入动作
 const s1 = new SellOrder( stock, 4);//卖出动作

 const broker = new Broker();
 broker.takeOrder( b1 );
 broker.takeOrder( b2 );
 broker.takeOrder( b3 );
 broker.takeOrder( s1 );

 broker.placeOrders();