
 var min = function(board, deep){
     var v = evaluate(board);//评价函数

     if( deep <= 0 || win(board)){
         return v;
     }

     var best = MAX;//极大
     var points = gen( board, deep);//人类可能走的棋子位置

     for(var i=0; i< points.length; i++){ //人类
         var p = points[i];
         board[p[0]][p[1]] = R.hum; //人类尝试下一个棋子
         var  v= max(board, deep-1);// 假如deep == 1; 获取每个地方的当前局势的平均。
         board[p[0]][p[1]] = R.empty;//还原人类尝试下的棋子
         if( v < best){
             best = v;//人类取最小的
         }
     }
     return best;//返回人类尝试下棋的极小的值。
 }

 var max = function(board, deep){// deep ==2
    var v = evaluate(board);//评价函数

    if( deep <= 0 || win(board)){
        return v;
    }

    var best = MIN;
    var points = gen(board, deep);//生成一些可能下的位置
    for(var i= 0; i< points.length; i++){//遍历电脑可能下的位置。
        var p = points[i];
        board[ p[0]][p[1]] = R.com; //电脑尝试下一个棋子。
        var v = min(board, deep-1);//对每一个电脑尝试下的棋子，取出人类会下的位置的最优得分
        board[p[0]][p[1]] = R.empty;
        if( v > best){
            best = v;
        }
    }
    return best;
 }

 var maxmin = function( board, deep){
     var best = MIN;
     var points = gen(board, deep);//生成待选的列表，就是可以下子的空位。
 }