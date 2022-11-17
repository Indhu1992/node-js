const fs=require('fs');

const requestHandler=((req,res)=>{
    const url=req.url;
    const method=req.method;
    if (url==='/'){
        res.setHeader('Content-type','text/html');
        res.write('<html>');
        res.write('<head><title>Enter form Details</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><input type="submit" value="Send"></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url==='/message' && method == 'POST'){
        const body=[];
        req.on('data',(chunk)=>{
            body.push(chunk);
            console.log(chunk);

        })
        return req.on('end',()=>{
            console.log('End event received');
            const parsedBody= Buffer.concat(body).toString();
            console.log(parsedBody);
            const message =parsedBody.split('=');
            // fs.writeFileSync("hello.txt",message[1]); //This is async line and writeFileSync is asynchronous it will take time so others will execute
            // nbut if we need to write a sync file
            fs.writeFile("hello.txt",message[1],(err)=>{
                console.log('Filewrite is completed')
                res.setHeader('Location','/')
                res.statusCode=302; //re-direct panna soldraga   
                return res.end();

            })
            // fs.writeFileSync('hello.txt','DUMMY');
           
       
        })
        // fs.writeFileSync('hello.txt','DUMMY');
        // console.log('Filewrite is completed')
        // res.setHeader('Location','/')
        // res.statusCode=302; //re-direct panna soldraga
        // return res.end();
    }
    res.setHeader('Content-type','text/html');
    res.write('<html>');
    res.write('<head><title>NodeJS title</title></head>');
    res.write('<body><h1>Hello I am creating NodeJS app server</h1></body>');
    res.write('</html>');
    res.end();
});
// module.exports=requestHandler; 1 method
// module.exports= {handler:requestHandler,someText: "Printing the text"}; 2 moethod to send property 
// exports.handler=requestHandler;
// exports.someText="Printing the text"; 3rd method to send the property
module.exports.handler=requestHandler;
module.exports.someText='Printing the text';
