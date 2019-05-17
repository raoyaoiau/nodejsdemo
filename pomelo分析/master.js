/**
 * ---------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *  
 * */

 var a = [];
a.push(100);
( function(){
    // Array.prototype.push.apply(a,  arguments);
    Array.prototype.push.call(a, 99);
})(1,2,3);

Array.prototype.slice.call(a, 8);
Array.prototype.push
 console.info(a);