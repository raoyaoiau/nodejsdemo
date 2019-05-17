/**
 * RPC请求等消息逻辑
 * 
 * 
 * 
 */
/**
 *  RPC请求。
 * 
 * -----------------rpc client --------------------------
 * 
 *1. proxy组件，是rpc client的一个代理。
 * 绑定了client的 rpcInvoke, 
 * 代理这块不怎么能看懂，但是最后一定是调用rpcInvoke
 * 
 * 2. client里创建了  mailStation  dispath分发。分发其实就是过滤
 * 
 * before 过滤下，
 *取出一个mailBox  mailBox.send
 * 
 * 
 * 3. 实际炒作， mailbx.send, socket.pushlish, {rpc, msg}
 * 
 *
 * -------------------rpc server--------------------
 * 
 * 1. socket.on("publish", ()=>{}) 收到请求消息， 处理消息
 * 
 * 2. 在Gateway里，创建了 acceptor, 执行acceptor.cb()=>{ doSend }
 * 
 * 3. cb里执行 new Dispatcher().route(trace, msg, cb); 这里最终执行的是 远程方法, add(args); 然后cb
 * 
 * 4. 收到cb后开始发送消息给rpc client
 *  
 * 
 * ----------------prc client ----------------------
 * 1. 收到消息后。开始处理消息。执行cb(tracer, sendErr, pkgResp);
 * 2. after过滤下，即 cb( args )
 * 3. 执行请求的回调。
 * 
 * 这中间还有些错误处理的代码，我没有细说。
 * 
 */
