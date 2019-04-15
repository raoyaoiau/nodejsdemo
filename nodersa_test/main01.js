/**
 * 
 * 关于加密这块，我只记得对称加密，单向加密，和非对称加密。
 * 非对称加密，公钥加密，私钥解密， 私钥签名，公钥验签。
 * 其他的像 加密密钥对， 签名密钥对，导出公钥，私钥。这些都不太记得
 * 
 * 可以看下2018的提交。
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * PKCS#1  rsa加密标准
 * PKCS# 2, 4 并到1了
 * 
 * pkcs3 dh
 * 
 * pkcs5  
 * 
 * 
 * 
 * pem
 * 
 */











const NodeRSA = require('node-rsa');
const fs = require('fs');

// const key = new NodeRSA({b:2048});
// const text = 'rsa test';
// const encrypted = key.encrypt(text, 'base64');

// // console.log("encrypted:" + encrypted);

// const decrypted = key.decrypt(encrypted, 'utf8');
// // console.log("decypted:" + decrypted);

// console.time('t');

// const publlicDer = key333.exportKey('pkcs8-public-der');
// // console.info(  publlicDer);
// // console.info(key333.getKeySize() );
// // console.info(key333.isEmpty() );
// // console.info(key333.isPublic() );
// // console.info(publlicDer );
// console.timeEnd('t');

/***
 * 1. 生成一个2048为的密钥对，
 * 用作加密解密，签名验签
 */

//  const t = nodersa1.encrypt('xiaxu', 'base64');

// const t1 = nodersa1.decrypt(t, 'utf8');


// //各种签名验签
// const s  = nodersa1.sign('xiaxu', 'buffer');
// const s1 = nodersa1.verify('xiaxu', s);
// const ss  = nodersa1.sign('xiaxu', 'hex');
// const s2 = nodersa1.verify('xiaxu', ss, undefined, 'hex');
// const sss  = nodersa1.sign(Buffer.from('xiaxu','base64'), 'buffer', 'hex');
// const s3 = nodersa1.verify(Buffer.from('xiaxu','base64'), sss, 'base64', 'hex');

// const ssss  = nodersa1.sign(Buffer.from('xiaxu','base64'), 'binary', 'hex');
// const s4 = nodersa1.verify(Buffer.from('xiaxu','base64'), ssss, 'hex', 'binary');

// // console.info(s1);
// // console.info(s2);
// // console.info(s3);
// // console.info(s4);
// /**
//  * 2.生成一个密钥对， 导出公钥和私钥。
//  * 
//  * 导入公钥和私钥，以及各种格式的了解。
//  * 
//  * 
//  * 
//  * 
//  */


//  // string  pkcs1 private
//  let str1 = nodersa1.exportKey('pkcs1-private-pem');
// fs.writeFile('./pkcs1-private-string-01.pem', str1, (err)=>{
//     if (err) throw err;
//     console.log('文件已被保存');
// })
//  //buffer
//  let buf1 = nodersa1.exportKey('pkcs1-private-der');
// fs.writeFile('./pkcs1-private-buf-01.der', buf1, (err)=>{
//     if (err) throw err;
//     console.log('文件已被保存');
// })
//  // string
//   str1 = nodersa1.exportKey('pkcs1-public-pem');
// fs.writeFile('./pkcs1-public-string-01.crt', str1, (err)=>{
//     if (err) throw err;
//     console.log('文件已被保存');
// })
//  //buffer
//   buf1 = nodersa1.exportKey('pkcs1-public-der');
// fs.writeFile('./pkcs1-public-buf-01.der', buf1, (err)=>{
//     if (err) throw err;
//     console.log('文件已被保存');
// })

// //------------------------------------------------

//  // string
//   str1 = nodersa1.exportKey('pkcs8-private-pem');
// fs.writeFile('./pkcs8-private-string-01.pem', str1, (err)=>{
//     if (err) throw err;
//     console.log('文件已被保存');
// })
//  //buffer
//   buf1 = nodersa1.exportKey('pkcs8-private-der');
// fs.writeFile('./pkcs8-public-buf-01.der', buf1, (err)=>{
//     if (err) throw err;
//     console.log('文件已被保存');
// })


//  // string
//   str1 = nodersa1.exportKey('pkcs8-public-pem');
// fs.writeFile('./pkcs8-public-string-01.pem', str1, (err)=>{
//     if (err) throw err;
//     console.log('文件已被保存');
// })
//  //buffer
//   buf1 = nodersa1.exportKey('pkcs8-public-der');
// fs.writeFile('./pkcs8-public-buf-01.der', buf1, (err)=>{
//     if (err) throw err;
//     console.log('文件已被保存');
// })
//  // string
//   str1 = nodersa1.exportKey('pkcs1-pem');
// fs.writeFile('./pkcs1-string-01.pem', str1, (err)=>{
//     if (err) throw err;
//     console.log('文件已被保存');
// })
//  //buffer
//   buf1 = nodersa1.exportKey('pkcs1-der');
// fs.writeFile('./pkcs1-buf-01.der', buf1, (err)=>{
//     if (err) throw err;
//     console.log('文件已被保存');
// })

