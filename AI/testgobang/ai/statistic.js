class Statistic {

  init (size) {
    this.table = this.create(size, size);
  }

  print (candidates) {
    console.log(this.table.map(function (r) { return r.map(i=>parseInt(Math.sqrt(i/10000))).join(',') }))
    var max = 0;
    var p;
    for (var i=0; i<candidates.length; i++) {
      var c = candidates[i];
      var s = this.table[c[0]][c[1]];
      if (s > max) {
        max = s;
        p = [c[0], c[1]];
      }
    }
    console.log('历史表推荐走法:', p);
  }

  /**
 * 创建二维数组
 * @param {*} w 
 * @param {*} h 
 */
  create(w, h) {
    var r = []
    for (var i = 0; i < w; i++) {
      var row = new Array()
      for (var j = 0; j < h; j++) {
        row.push(0)
      }
      r.push(row)
    }
    return r
  }
}
module.exports = new Statistic()
