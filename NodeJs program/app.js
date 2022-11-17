const http = require('http');
const routes=require('./routes');
// function rqListener(req,res){
//     console.log(req);
// }
console.log(routes.someText);
console.log('Testing')
const server=http.createServer(routes.handler);

server.listen(3000);
 