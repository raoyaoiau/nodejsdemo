/**
 * 常量
 */
module.exports = {
    //红色棋子为正，蓝色棋子为负
    ACTION_TYPE:{  //行动类型
        DEFAULT:0, //默认
        FLIP: 1,   //翻棋
        MOVE: 2,   //移动
        EAT: 3,    //吃
        EQUAL: 4,  //碰
    },
    GAME_RESULT:{   //游戏结果
        RUNNING:1,  //运行中
        LOST:2,     //输了
        DRAW:3,     //和局
        WIN:4       //赢了
    },
    STEP_TIME: 600,     //步长
    MAX_PEACE_TIMES:3, //最大求和次数
    CHESS_TYPE:{
        EMPTY:0,       //空的
        GongBing:1,    //工兵
        PaiZhang:2,    //排长
        LianZhang:3,   //连长
        YingZhang:4,   //营长
        TuanZhang:5,   //团长
        LvZhang:6,     //旅长
        ShiZhang:7,    //师长
        JunZhang:8,    //军长
        SiLing:9,      //司令
        ZhaDan:10,     //炸弹
        DiLei:11,      //地雷
        JunQi:12,      //军棋
        NotOpen:13     //未翻开
    }

}