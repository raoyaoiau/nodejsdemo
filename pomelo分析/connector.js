


/* 底层用到的 socket.io. httpserver.

Socketio以下简称sio.
-----------------------------------------------------
connect
1. socketio 收到连接请求。
2. sioconnector发送 "connection"消息。
3.   this.connector.on('connection', hostFilter.bind(this, bindEvents));
在this中执行 hostFilter。
4. getSession(self, socket); 如果没有就创建session. session组件处理 同时connection组件负责统计信息。

----------------------------------------------------
message
1. Socketio 接到消息。
2. WrapSocket收到消息

3. decode 对消息进行编码。

4. handleMessage(self, session, msg);

server组件处理
globalHandle-----------------> 全局前头过滤。-------->过滤-------> handle 。

 if 前台服务器-------> doHandle ---> 执行handler逻辑-------> response -------->后头过滤--------> 全局后头过滤


 if 后台服务器-------> doForward
'
-----------------------------------------------------
doSend------> send ----------> encode ------>
schedule组件控制回传。next
if 广播 全部发送。

else  sessionservice.send ---->  session.send-> socket.send
*/
