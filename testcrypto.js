/**
 * 
 * 
 * 
 * 
 * 
 * 
 */
const c = require("crypto");

// console.info( c.constants );

// c.createCipheri 
// c.createDecipheriv
// c.createHash
const hash = c.createHash("sha256");
let data = "xiaxuiau";

hash.update(data);
const t  = hash.digest('base64');
//base64 转化
console.info(t);
console.info( new Buffer(t, 'base64').toString('hex'));

const cp = c.createCipheriv('aes-128-cbc', "1234567812345678", Buffer.from('1234567812345678', 'utf-8'));//128/8= 16
const cp1 = c.createCipheriv('aes-128-cbc', "1234567812345678", Buffer.from('1234567812345678', 'utf-8'));//128/8= 16
const cp2 = c.createCipheriv('aes-128-cbc', "1234567812345678", Buffer.from('1234567812345678', 'utf-8'));//128/8= 16
let src = cp.update( "123", 'base46', 'base64');
src += cp.final('base64');
console.info("src=%s",src);
console.log( typeof src);

let src1 = cp1.update( "123", 'base46', 'hex');
src1 += cp1.final('hex');
console.info("src1=%s", src1);
console.log( typeof src1);

let src2 = cp2.update( "123", 'base46', 'latin1');
src2 += cp2.final('latin1');
console.info("src2=%s",src2);
console.log( typeof src2);

console.info(Buffer.from(src1, 'hex').toString('base64'));


const dp = c.createDecipheriv('aes-128-cbc', "1234567812345678", Buffer.from('1234567812345678', 'utf-8'));//128/8= 16
let tt = dp.update(src2, 'latin1', 'utf8');
tt += dp.final('utf8');

console.info(tt);