var mysql = require('mysql');
var async = require('async');

console.time("t");
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "122.228.96.41",
    user: "root",
    password: "#3%899abh",
    database: "platform",
    charset: 'UTF8MB4_GENERAL_CI'
});

var query1 = function(cb){
    var sql = 'SELECT t_anysdk.openid, t_account.userid,isguest, nickname,underwrite,gender,headurl,customid,faceid,inviterid,user_level,baseliveness,registip,registtime,loginip,logintime,channel,devicetype,os,isandroid,wincount,lostcount,drawcount,fleecount,logincount,checktime,playcount,playtime,onlinetime,keepday,totalday,totalmonthday,signtime,limit_login_time,limit_login_reason,real_name,identity_card_id,email_global_id, imei, mac, brand, model, version, packageid, t_gameid.gameid, t_phone.phoneno FROM t_account LEFT JOIN t_gameid ON t_account.userid = t_gameid.userid LEFT JOIN t_anysdk ON t_anysdk.userid = t_account.userid LEFT JOIN t_phone ON t_phone.userid = t_account.userid WHERE t_account.userid = ?';
    var args = ["35614"];
    pool.getConnection(function(err, connection) {
        // 使用连接
      for(let i = 0; i< 1000; i++){
          let j = 0;
      }
      
      
      connection.query( sql, args, function(err, res) {
          
        // 连接使用完成后释放连接
        connection.release();
        cb(err, res);
          // 不要在这里使用connection进行查询，因为连接已经被归还到连接池了
        });
      });
}
var query2 = function(cb){
	//SQL语句
	var sql = 'select * from t_email where userid = ? and expiretime > ? and state != ?';
	//当前时间
	var curTimeStamp = Math.ceil(Date.now() / 1000);
	//参数列表
	var args = ["35614",curTimeStamp,5];
    pool.getConnection(function(err, connection) {
        // 使用连接
  
      if(err) throw err;
      
      connection.query( sql, args, function(err, res) {
          
        // 连接使用完成后释放连接
        connection.release();
        cb(err, res);
          // 不要在这里使用connection进行查询，因为连接已经被归还到连接池了
        });
      });
}

for(let i =0; i < 10000; i++){
    query1((err, res)=>{
    });
}

console.timeEnd('t');

/* for(let i=0; i<100;i++){
    async.parallel([
        function (callback) {
            //基础数据
            query1((err, res)=>{
                callback(err, res);
            });
        }, function (callback) {
            query2((err, res)=>{
                callback(err, res);
            });
        }
    ], function (err, results) {		
        console.log("ok");
    });
} */
