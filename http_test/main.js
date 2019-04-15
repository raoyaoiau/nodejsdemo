/**
 * 
 * 
 * 
 */
const http = require('http');

const server = http.createServer(function(req, res){
    // console.log(req);
    res.writeHead(200, {'Content-type':'text/html'});
    res.write("hello this is <b>A dog</b>");
    res.end();
    
});

server.listen(3001, '127.0.0.1');