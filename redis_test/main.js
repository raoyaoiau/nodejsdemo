
const redis = require("redis");
console.log("start test");

const client = redis.createClient({
    detect_buffers: true,
    host: "127.0.0.1",
    port: 6379
});

client.on('ready', function (res) {
    console.log('ready');
});

client.on('end', function (err) {
    console.log('end');
});

client.on('error', function (err) {
    console.log(err);
});

client.on('connect', function () {
    console.log('redis connect success!');
});

// client.set("foo_rand000000000000", "OK");
 
// // This will return a JavaScript String
// client.get("foo_rand000000000000", function (err, reply) {
//     console.log(reply.toString()); // Will print `OK`
// });
 
// // This will return a Buffer since original key is specified as a Buffer
// client.get(new Buffer("foo_rand000000000000"), function (err, reply) {
//     console.log(reply.toString()); // Will print `<Buffer 4f 4b>`
// });

// client.setex("myNum", 10, 1, function(err,reply){
//     if(!err){
//         console.log( reply.toString() );
//     }
// });
// client.TTL('myNum', function(err, reply){
//     if(!err){
//         console.log( reply.toString() );
//     }
// })
// client.get("myNum", function (err, reply) {
//     console.log("myNum=" + reply); // Will print `<Buffer 4f 4b>`
// });
// client.incr("myNum", redis.print);
// client.incr("myNum", redis.print);
// client.incr("myNum", redis.print);
// client.incr("myNum", redis.print);
// client.get("myNum", function (err, reply) {
//     console.log("myNum=%d", reply.toString()); // Will print `<Buffer 4f 4b>`
// });
// client.TTL('myNum', function(err, reply){
//     if(!err){
//         console.log( reply.toString() );
//     }
// })
// client.hset("hash01", "mytables", "11111111111111111111",  redis.print);
// client.hget("hash01", "mytables", redis.print);

/* client.lset("list01", 1, "baidu", redis.print);
client.lpush("list01", "11111111", redis.print);
client.lpush("list01", ['111', 1, "hello"], redis.print);
// client.lpush("list01", "22222222", redis.print);
// client.lset("list02", 1, "google", redis.print);
// client.lset("list03", 1, "sogou", redis.print);

client.lrange('list01', 0, 48, redis.print);
client.llen('list01', function(err, reply){
    if(!err){
        console.log("reply="+ reply);
    }
}); */

// client.sadd("set01", "1", redis.print);
// client.sadd("set01", "2", redis.print);
// client.sadd("set01", "3", redis.print);
// client.sadd("set01", "5", redis.print);

// client.scard('set01', redis.print);
// client.quit();

