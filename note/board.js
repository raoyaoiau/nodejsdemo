const Constants = require('./constants');
const CHESS_TYPE = Constants.CHESS_TYPE;

class Board{
    constructor(){
        
    }
/**
 * 棋盘
 */
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

_isYRailRoad(y) {
    return (y === 1 || y === 5 || y === 6 || y === 10)
}

_isXRailRoad(x, y) {
    return (x === 0 || x === 4) && (y !== 0 && y !== 11);
}

_isRailRoad(x, y) {
    return this._isXRailRoad(x, y) || this._isYRailRoad(y);
}

equalColor(a, b) {
    return (a > 0 && b > 0) || (a < 0 && b < 0);
}
/**
 * 求铁路上任意一点的邻居
 */
_nearBy(x,y){
    if( y === 1){//铁路1
        if(x === 0 ){
            return [0,2 ,1,1];
        }
        else if(x === 4){
            return [4,2, 3,1];
        }else {
            return [x+1, 1, x-1, 1];
        }
    }

    if(y === 5){
        if( x=== 0){
            return [0, 4, 1, 5, 0, 6];
        }
        else if( x=== 2){
            return [1,5, 2, 6, 3,5];
        }else if(x === 4){
            return [3, 5, 4,4, 4,6];
        }else{
            return [x+1, 5, x-1, 5];
        }
    }

    if( y=== 6){
        if( x=== 0){
            return [0, 5, 1, 6, 0, 7];
        }
        else if( x=== 2){
            return [1, 6, 2,5, 3, 6];
        }else if(x === 4){
            return [4, 5, 3, 6, 4, 7];
        }else{
            return [x-1, 6, x+1, 6];
        }
    }

    if(y === 10){
        if(x === 0){
            return [0, 9, 1, 10];
        }else if(x === 4){
            return [4, 9, 3, 10];
        }else{
            return [x+1, 10, x-1, 10]
        }
    }

    if( x=== 0 || x === 4){
        return [x, y-1, x, y+1];
    }
}

equalColor(a, b) {
    return (a > 0 && b > 0) || (a < 0 && b < 0);
}
/**
 * 还需要考虑铁路和工兵
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
    if (absId === CHESS_TYPE.GongBing && this._isRailRoad(x, y)) {
        tempArray = this._findGongBingRoute(map, x, y, isEnemyNoMine);
    } else {  //3. 考虑铁路
        tempArray = this._findComanRoute(map, x, y, isEnemyNoMine);
    }
    routeArray = routeArray.concat(tempArray);
    return routeArray.filter((v, i) => {
        return routeArray.indexOf(v) === i;//去重复
    })
}

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
 * 排除过河
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
        if (absNextId === CHESS_TYPE.NotOpen) {
            continue;
        }

        //无地雷，任何能动的棋子都可以扛军棋
        if(isEnemyNoMine && absNextId === CHESS_TYPE.JunQi){
            routeArray.push( ''+ tempX + tempY);
            continue;
        }

        //炸弹什么都可以碰
        if (absId === CHESS_TYPE.ZhaDan || absNextId === CHESS_TYPE.ZhaDan) {//炸弹
            routeArray.push(''+ tempX + tempY);
            continue;
        } 
        
        //工兵   -工兵 ， 0， 地雷
        if(absId === CHESS_TYPE.GongBing) {//工兵
            if (absNextId === CHESS_TYPE.DiLei || absNextId === CHESS_TYPE.GongBing || absNextId === CHESS_TYPE.EMPTY) {
                routeArray.push(''+ tempX + tempY);//军棋暂时不放
            }
            continue;
        }

        //大吃小
        if(absId >= absNextId) {//大
            routeArray.push(''+ tempX + tempY);
            continue;
        }
    }
    return routeArray;
}


_isRoute(id, nextId, isEnemyNoMine) {
    const absId = Math.abs(id);
    const absNextId = Math.abs(nextId);
    if ((absNextId === CHESS_TYPE.EMPTY) || (isEnemyNoMine && (absNextId === CHESS_TYPE.JunQi))) {
        return true;
    } else if (!this.equalColor(id, nextId)) {
        if (absId === CHESS_TYPE.ZhaDan || absNextId === CHESS_TYPE.ZhaDan || absId >= absNextId || (isEnemyNoMine && (absNextId === CHESS_TYPE.JunQi))) {
            return true;
        }
    }
    return false;
}


/**
 * 寻找普通棋子在铁路上所有可走位置的数组
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
                routeArray.push('' + x + down);
            }
            break;
        }
        //向上走动
        for (let up = y + 1; up < 11; up++) {
            if (this._isRoute(id, map[x][up], isEnemyNoMine)) {
                routeArray.push('' + x + up);
            }
        }
    }

    //y===1的铁路上
    if (this._isYRailRoad(y)) {
        //向左走动
        for (let left = x - 1; left >= 0; left--) {
            if (this._isRoute(id, map[left][y], isEnemyNoMine)) {
                routeArray.push('' + left + y);
            }
        }
        //向右走动
        for (let right = x + 1; right < 5; right++) {
            if (this._isRoute(id, map[right][y], isEnemyNoMine)) {
                routeArray.push('' + right + y);
            }
        }
    }

    return routeArray;
}

/**
 * 寻找工兵在铁路上所有可走位置的数组
 */
_findGongBingRoute(map, x,y, isEnemyNoMine){
    const id = map[x][y];
    let tempMap = [];//用于记录重复
    for (let x = 0; x < 5; x++) { //x轴， 棋盘左下角为原点
        tempMap[x] = [];
        for (let y = 0; y < 12; y++) { //y轴
            tempMap[x][y] = 0;
        }
    }
    this._searchRoute(map, id,  x,y, tempMap, isEnemyNoMine);
    let routeArray = [];
    for(let i=0; i<  5; i++){
        for(let j= 0; j< 12; j++){
            if( tempMap[i][j] === 1){
                routeArray.push('' + i + j);
            }
        }
    }
    return routeArray;
}


_searchRoute(map, id,  x, y, tempMap, isEnemyNoMine){
    let p = this._nearBy(x, y);
    for (let i = 0; i < p.length / 2; i++) {
        x = p[2 * i];
        y = p[2 * i + 1];
        const nextId = map[x][y];
        const absNextId = Math.abs( nextId);
        if ( nextId === CHESS_TYPE.EMPTY) {
            if (tempMap[x][y] === 0) {
                tempMap[x][y] = 1;

                if (this._searchRoute(map, id,  x, y,  tempMap, isEnemyNoMine)) {
                    return true;
                }
            }
        } else if (!this.equalColor(id, nextId)) {
            if (absNextId === CHESS_TYPE.GongBing || absNextId === CHESS_TYPE.ZhaDan || absNextId === CHESS_TYPE.DiLei || (isEnemyNoMine&& absNextId === CHESS_TYPE.JunQi)) {
                if (tempMap[x][y] === 0) {
                    tempMap[x][y] = 1;
                }
            }
        }
        continue;
    }
    return false;
}

/**
 * 去掉斜线
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
}
/* 
let t = new Board();

 const b1 = t._validGongBing();
 console.info("b1=%s", b1);
 */

 /**
  * 给定一个Map 和一个点，求出它可以走的位置，包含吃掉和碰掉
  */

  /**
   * 8方向
   */  
let map = [];
for (let x = 0; x < 5; x++) { //x轴， 棋盘左下角为原点
    map[x] = [];
    for (let y = 0; y < 12; y++) { //y轴
        map[x][y] = 0;
    }
}

// map[2][3] = 13;

// -----------------------y铁路--------------------------------
// map[1][5] = 9;
// map[4][5] = -12;
// console.time("t");
// let t = new Board();
// const a1 = t._findRoute(map,1, 5);
// console.info(a1);


// console.timeEnd('t');
//-----------------------x铁路--------------------------------

// map[4][5] = 7;
// map[4][10] = -12;
// map[0][5] = -10;
// console.time("t");
// let t = new Board();
// const a1 = t._findRoute(map, 4, 5);
// console.info(a1);
// console.info(a1.length);


// console.timeEnd('t');
//-----------------------工兵在铁路--------------------------------
map[0][1] = 1;
map[0][0] = -1;
map[0][2]  = 0
map[1][1]  = 0
map[1][2]  = 0
map[0][3]  = 5
map[2][1]  = 3
console.time("t");
let t = new Board();
let a1 = t._findRoute(map, 0, 1, 0);
console.info(a1);
console.info(a1.length);
