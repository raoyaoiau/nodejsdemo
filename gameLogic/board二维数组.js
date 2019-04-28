/**
 *     CHESS_TYPE:{
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
 */

class Board {
    constructor() {

    }
    /**
     * i,j位置是否行营 左下角做原点的坐标
     * @param {*} i 
     * @param {*} j 
     */
    _isMoveCamp(i, j) {
        if (j * 5 + i == 11 || j * 5 + i == 13 || j * 5 + i == 17 || j * 5 + i == 21 || j * 5 + i == 23 || j * 5 + i == 36 || j * 5 + i == 38 || j * 5 + i == 42 || j * 5 + i == 46 || j * 5 + i == 48) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 是否在 y=y的铁路上
     * @param {*} y 
     */
    _isYRailRoad(y) {
        return (y === 1 || y === 5 || y === 6 || y === 10)
    }

    /**
     * 是否在 x=x 的铁路上
     * @param {*} y 
     */
    _isXRailRoad(x, y) {
        return (x === 0 || x === 4) && (y !== 0 && y !== 11);
    }
    /**
     * 是否在铁路上
     * @param {*} y 
     */
    _isRailRoad(x, y) {
        return this._isXRailRoad(x, y) || this._isYRailRoad(y);
    }

    /**
     * 求铁路上任意一点的邻居
     * @param {*} x 
     * @param {*} y 
     */
    _nearBy(x, y) {
        if (y === 1) {//铁路1
            if (x === 0) {
                return [0, 2, 1, 1];
            }
            else if (x === 4) {
                return [4, 2, 3, 1];
            } else {
                return [x + 1, 1, x - 1, 1];
            }
        }

        if (y === 5) {
            if (x === 0) {
                return [0, 4, 1, 5, 0, 6];
            }
            else if (x === 2) {
                return [1, 5, 2, 6, 3, 5];
            } else if (x === 4) {
                return [3, 5, 4, 4, 4, 6];
            } else {
                return [x + 1, 5, x - 1, 5];
            }
        }

        if (y === 6) {
            if (x === 0) {
                return [0, 5, 1, 6, 0, 7];
            }
            else if (x === 2) {
                return [1, 6, 2, 5, 3, 6];
            } else if (x === 4) {
                return [4, 5, 3, 6, 4, 7];
            } else {
                return [x - 1, 6, x + 1, 6];
            }
        }

        if (y === 10) {
            if (x === 0) {
                return [0, 9, 1, 10];
            } else if (x === 4) {
                return [4, 9, 3, 10];
            } else {
                return [x + 1, 10, x - 1, 10]
            }
        }

        if (x === 0 || x === 4) {
            return [x, y - 1, x, y + 1];
        }
    }

    /**
     * 判断两个棋子颜色是否相同
     * @param {*} a 
     * @param {*} b 
     */
    equalColor(a, b) {
        return (a > 0 && b > 0) || (a < 0 && b < 0);
    }
    /**
     * 寻找(x,y)棋子在地图map上所有可行动位置的数组
     * @param {*} map 
     * @param {*} x 
     * @param {*} y 
     * @param {*} isEnemyNoMine 是否清除了对方的地雷
     */
    _findRoute(map, x, y, isEnemyNoMine) {
        if (x < 0 || x > 4 || y < 0 || y > 11) {
            return null;
        }
        const id = map[x][y];
        const absId = Math.abs(id);
        if (absId < 1 || absId > 10) {
            return null;
        }

        //1,找到8方向可防止
        let routeArray = this._find8DirRoute(map, x, y, isEnemyNoMine);
        let tempArray = [];
        //2. 考虑工兵
        if (absId === 1 && this._isRailRoad(x, y)) {
            tempArray = this._findGongBingRoute(map, x, y, isEnemyNoMine);
        } else {  //3. 考虑铁路
            tempArray = this._findComanRoute(map, x, y, isEnemyNoMine);
        }
        return routeArray.concat(tempArray);
    }

    /**
     * 求棋子8方向的位置时排除过河
     * @param {*} x 
     * @param {*} y 
     */
    _get8DirExceptPoint(x, y) {
        if (x === 1 && y === 5) {
            return [1, 6];
        } else if (x === 1 && y === 6) {
            return [1, 5];
        }
        else if (x === 3 && y === 5) {
            return [3, 6];
        } else if (x === 3 && y == 6) {
            return [3, 5];
        }
        return null;
    }

    /**
     * 寻找普通棋子在8方向上所有可走位置的数组
     * @param {*} map 
     * @param {*} x 
     * @param {*} y 
     * @param {*} isEnemyNoMine 
     */
    _find8DirRoute(map, x, y, isEnemyNoMine) {
        const id = map[x][y];
        const absId = Math.abs(id);
        let posCamp = this._isMoveCamp(x, y);
        let dirArray = [[x - 1, y - 1], [x - 1, y + 1], [x + 1, y - 1], [x + 1, y + 1], [x - 1, y], [x, y - 1], [x, y + 1], [x + 1, y]];
        let routeArray = [];

        let exceptArray = this._get8DirExceptPoint(x, y);
        for (let i = 0, len = dirArray.length; i < len; i++) {
            let dir = dirArray[i];
            let tempX = dir[0];
            let tempY = dir[1];
            if (tempX < 0 || tempX > 4 || tempY < 0 || tempY > 11) {
                continue;
            }

            if (exceptArray && tempX === exceptArray[0] && tempY === exceptArray[1]) {
                continue;
            }
            const nextCamp = this._isMoveCamp(tempX, tempY);
            const nextId = map[tempX][tempY];
            const absNextId = Math.abs(nextId);
            if (this.equalColor(id, nextId)) {
                continue;
            }
            if (nextCamp && nextId !== 0) { //坐营时，营必须为空
                continue;
            }
            if (i < 4) {
                if (!posCamp && !nextCamp) {//有斜线时，必定有一个坐营
                    continue;
                }
            }

            //棋子未翻开
            if (absNextId === 13) {
                continue;
            }

            //无地雷，任何能动的棋子都可以扛军棋
            if (isEnemyNoMine && absNextId === 12) {
                routeArray.push(dir);
                continue;
            }

            //炸弹什么都可以碰
            if (absId === 10 || absNextId === 10) {//炸弹
                routeArray.push(dir);
                continue;
            }

            //工兵   -工兵 ， 0， 地雷
            if (absId === 1) {//工兵
                if (absNextId === 11 || absNextId === 1 || absNextId === 0) {
                    routeArray.push(dir);//军棋暂时不放
                }
                continue;
            }

            //大吃小
            if (absId >= absNextId) {//大
                routeArray.push(dir);
                continue;
            }
        }
        return routeArray;
    }


    /**
     * id到nextId是否合理
     * @param {*} id
     * @param {*} nextId
     * @param {*} isEnemyNoMine
     */
    _isRoute(id, nextId, isEnemyNoMine) {
        const absId = Math.abs(id);
        const absNextId = Math.abs(nextId);
        if ((absNextId === 0) || (isEnemyNoMine && (absNextId === 12))) {
            return true;
        } else if (!this.equalColor(id, nextId)) {
            if (absId === 10 || absNextId === 10 || absId >= absNextId || (isEnemyNoMine && (absNextId === 12))) {
                return true;
            }
        }
        return false;
    }

    /**
     * 寻找普通棋子在铁路上所有可走位置的数组
     * @param {*} map 
     * @param {*} x 
     * @param {*} y 
     * @param {*} isEnemyNoMine 
     */
    _findComanRoute(map, x, y, isEnemyNoMine) {
        const id = map[x][y];
        const absId = Math.abs(id);
        let routeArray = [];
        //在x= 0的铁路上
        if (this._isXRailRoad(x, y)) {
            //向下走动
            for (let down = y - 1; down > 0; down--) {
                if (this._isRoute(id, map[x][down], isEnemyNoMine)) {
                    routeArray.push([x, down]);
                }
                break;
            }
            //向上走动
            for (let up = y + 1; up < 11; up++) {
                if (this._isRoute(id, map[x][up], isEnemyNoMine)) {
                    routeArray.push([x, up]);
                }
            }
        }

        //y===1的铁路上
        if (this._isYRailRoad(y)) {
            //向左走动
            for (let left = x - 1; left >= 0; left--) {
                if (this._isRoute(id, map[left][y], isEnemyNoMine)) {
                    routeArray.push([left, y]);
                }
            }
            //向右走动
            for (let right = x + 1; right < 5; right++) {
                if (this._isRoute(id, map[right][y], isEnemyNoMine)) {
                    routeArray.push([right, y]);
                }
            }
        }
        return routeArray;
    }

    /**
     * 寻找工兵在铁路上所有可走位置的数组
     * @param {*} map 
     * @param {*} x 
     * @param {*} y 
     * @param {*} isEnemyNoMine 
     */
    _findGongBingRoute(map, x, y, isEnemyNoMine) {
        const id = map[x][y];
        let tempMap = [];//用于记录重复
        for (let x = 0; x < 5; x++) { //x轴， 棋盘左下角为原点
            tempMap[x] = [];
            for (let y = 0; y < 12; y++) { //y轴
                tempMap[x][y] = 0;
            }
        }
        this._searchRoute(map, id, x, y, tempMap, isEnemyNoMine);
        let routeArray = [];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 12; j++) {
                if (tempMap[i][j] === 1) {
                    routeArray.push([i, j]);
                }
            }
        }
        return routeArray;
    }


    /**
     * 工兵搜索路径
     * @param {*} map 
     * @param {*} id 
     * @param {*} x 
     * @param {*} y 
     * @param {*} tempMap 
     * @param {*} isEnemyNoMine 
     */
    _searchRoute(map, id, x, y, tempMap, isEnemyNoMine) {
        let p = this._nearBy(x, y);
        for (let i = 0; i < p.length / 2; i++) {
            x = p[2 * i];
            y = p[2 * i + 1];
            const nextId = map[x][y];
            const absNextId = Math.abs(nextId);
            if (nextId === 0) {
                if (tempMap[x][y] === 0) {
                    tempMap[x][y] = 1;
                    if (this._searchRoute(map, id, x, y, tempMap, isEnemyNoMine)) {
                        return true;
                    }
                }
            } else if (!this.equalColor(id, nextId)) {
                if (absNextId === 1 || absNextId === 10 || absNextId === 11 || (isEnemyNoMine && absNextId === 12)) {
                    if (tempMap[x][y] === 0) {
                        tempMap[x][y] = 1;
                    }
                }
            }
            continue;
        }
        return false;
    }
}
/**
 * 一个测试
 */
let map = [];
for (let x = 0; x < 5; x++) { //x轴， 棋盘左下角为原点
    map[x] = [];
    for (let y = 0; y < 12; y++) { //y轴
        map[x][y] = 0;
    }
}
map[0][1] = 1;
map[0][0] = -1;
map[0][2] = 0
map[1][1] = 0
map[1][2] = 0
map[0][3] = 5
map[2][1] = 3
console.time("t");
let t = new Board();
let a1 = t._findRoute(map, 0, 1, 0);//返回的内容没有去重复
console.info(a1);
console.info(a1.length);
