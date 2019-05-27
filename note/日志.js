/* pomelo nod
note: 

1, 获取到了服务器，那么服务器上的  {"id":"connector-server-1", "host":"127.0.0.1", "port":4050, "clientPort": 3050, "frontend": true},
 var connector = dispather()得到 一个服务器，那么可以connector.id,        connector.host可以获取其中的信息。

2， app.rcpInvoke(sid, { namespace:"user", service:"authServer", method:"login" ,args: , }cb .向指定sid的服务器发送（系统或用户的rpc请求）


			var params = {
				namespace: 'user',
				service: 'authRemote',
				method: 'login',
				args: [token, ip]
			}

			self.app.rpcInvoke(authServer.id, params, (err, code, user) => {});

3,  很多东西都可以通过this.app.get 得到，比如this.app.getServerId   //这些是设置好了的东西。获取当前会话的服务器id\
 
4, async.parallel, async.waterfall 了解一下

	rpcInvoke_manager_playerRemote.bind(null, this.app, session, 'getMailOrder',
	 [{	uid: playerId}, playerId, msg.pageIndex, msg.complete], 
	 (err, code, data) => {
		next(err, data);
	})();

	"gate": [     
	{"id": "gate-10001", "host": "10.0.0.2", "port": 3201, "clientPort": 3210, "frontend": true, "httpPort": 3250},
	{"id": "gate-10002", "host": "10.0.0.2", "port": 3202, "clientPort": 3211, "frontend": true, "httpPort": 3251},
	{"id": "gate-10003", "host": "10.0.0.2", "port": 3203, "clientPort": 3212, "frontend": true, "httpPort": 3252},
	{"id": "gate-10004", "host": "10.0.0.2", "port": 3204, "clientPort": 3213, "frontend": true, "httpPort": 3253}
  ],

  5, 配置表用于配置一些要经常改动的东西。next，和async.waterfall里的cb的区


  【注意事项】

1, 为什么gamehttp开启之后去开，gate, connenctor,这样用客户端的地址去连接，连接不上，必须要把gamehttp断开。

2， 为什么传ip过来，会显示错误的头信息。

3， 宝石兑换金豆，鱼骨，写成了，客户端初始化读取配置表，这样做的好处是，如果需要修改数据，就不需要改动代码， 

4，因为端口冲突，导致gamehttp开了，会登陆不了游戏。

5，为什么我这里的gate,connector,gamehttp需要改serverId.

6, 熊猛 说domain里的list不要去动它，要动要跟他说。

7， 错误提示开关在 log4js里，最后有个info,改成all,全开错误。

8，熟悉框架的时候一定要对 session 了如指掌，

9， 对于函数， 一进一出，都要控制好， 不然得话，js不会主动去报错。这样会在其他的地方报错，从而找不到错误的根源。

10， parseInt 函数，要慎用，因为，他会返回NaN， typeof xx !== 'number',要注意有时候xx

11.配置表保持 游戏道具id放到第一位。

12, 因为路由， 服务器分配的问题，有时候app.xxx.rpc调用会失败，要用rpcinvoke来调用才会成功。

13,player的json为什么会显示出局不全。

14. getBy 返回的是一个数组


1, map[id, player], return player, player改变，那么map里的player也会改变。，js值传递和引用传递。
2， 函数分配manger时，要更具uid来分配。



1.killmiceHandler.js 文件代码中实现客户端向服务端请求的协议,客户端请求服务端单款的协议都在这里实现(注意这里只是单款的实现).
2.killmiceRoom.js 文件代码中实现一桌游戏的具体逻辑流程,重点关注如下几个方法:
2-1.ready 用户准备方法(该方法不是客户端发送ready后就立即调用的,而是游戏开始之后调用的,并发送场景)
2-2.online 断线重连(断线重连后的处理,如果游戏需要做断线重连,哪么在用户断线重连回来之后发送场景数据即可)
2-3.leave 用户主动离开(用户起立的意思,如果游戏需要做托管处理,哪么可以在此调用实现)
2-3.offline 用户断线(处理与leave一致)
2-4.sendGameScene 发送游戏场景(视游戏逻辑自定代码)
1.获取用户相关的信息查看GamePlayer.js中的实现即可。
2.给用户增加道具调用接口:this.writeUserItem(参数,...),该方法在Room.js中实现,具体传参查看代码的实现。
3.给用户写分调用接口:this.writeUserScore(参数,...),解释同上.
你只需要修改单款里的逻辑,以外的逻辑尽量不要动,因为会影响其它的单款。


//增加单款游戏的加法
服务端增加单款的流程
1. game - server目录下的app.js中增加单款的路由, 例如二人斗地主: app.route('twoland', routeUtil.gameServer);
configure中添加游戏 | twoland
2. shared / config / serverSort.json 中添加游戏排序, 例如二人斗地主:
	"twoland": {
		"twoland": 501,
		"sort": 90,
		"hot": 0
	}
3. game - server / config / development / server.json 添加房间配置, 例如二人斗地主:
	"twoland": [{
		"id": "twoland-111",
		"host": "127.0.0.1",
		"port": 5010,
		"sort": 1,
		"roomName": "最高拆1元红场",
		"roomLv": 1,
		"roomType": 1,
		"cellScore": 300,
		"revenuType": 1,
		"revenuScore": 100,
		"restrictScore": 100000000,
		"enterMin": 1000,
		"enterMax": 0,
		"maxRoom": 2,
		"maxPlayer": 3,
		"minAndroidscore": 50000,
		"maxAndroidScore": 100000
	}]
4. game - server / config / data / game.json 添加房间配置, 例如二人斗地主: [501, "twoland", 1, "二人斗地主初级场", 1, 1, 100, 1, 100, 50000, 0, 100000000, 100, 3],

	5. game - server / config / development / adminServer.json 添加房间配置, 例如二人斗地主: {
		"type": "twoland",
		"token": "agarxhqb98rpajloaxn34ga8xrunpagkjwlaw3ruxnpaagl29w4rxn"
	}


 // 税收

 
举例用户A,B,C，一局游戏中,A输1000,B输1000,C赢2000.

房间税收类型为税收比例类型,收分值设置为5(千分之五)。
哪么对应的实际输赢为:
A:-1000 B:-1000 C:2000-2000*(5/1000)=1990 其中的10作为税收付给系统。
简单就是说:税收比例类型，只收赢家的钱，不收输家或和家的钱。

房间税收类型为服务台费,收分值设置为5.
哪么对应的实际输赢为:
A:-1000-5=-1005 B:-1000-5 = -1005 C:2000-5=1905
简单就是说:服务台费类型,所有用户都收。


 */