/**
 * 后端服务器的通讯方式。
 * 
 * client:客户端， con:前台服务器， back：后台服务器。
 * 
 * 一。 client  请求 back的handler 的流程:
 * 
 * 1. 走connector流程， 到doForward-------->
 * 
 * 2. sysrpc. msgRemote.forwardMessage ----->
 * 
 * 3. back的server组件，handle--------> doHandler-----> 过滤，handle，过滤. reponse
 * 
 * 二。 back上发送消息给client
 * 
 * 1. channelService的pushMessageByUids-------->
 * 
 * 2. sendMessage发送消息， 发给自己？ 发给其他服务器？
 * 
 * 3. rpcInvoke,  channalRemote.pushMessage 
 * 
 * 4. channalRemote.pushMessage-----------> connector.send();
 * 
 * 5. cb------> rpcCB(sid) -------> lath.done(),超时控制。
 */