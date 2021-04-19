const http=require('http');
const fs=require('fs');
var i=1;
const server=http.createServer((req,res)=>{

    res.statusCode=200;

    if(req.url=="/"){
        res.setHeader('Content-Type','text/html');
        var fsData=fs.readFileSync("form3.html");
        res.write(fsData);
        res.end();
    }
    else if(req.url=="/favicon.ico"){
        res.setHeader('Content-Type','text/img');
        fs.readFileSync("favicon.ico",(err,fsData)=>{
            if(err){
                console.log("Read file error.")
                throw err
            }
            console.log("1");
            res.write(fsData);
        })
        res.end();
    }
    else if(req.url.slice(0,6)=="/input"){
        let url1=req.url.split("?");
        let urlquery=url1[1].split("&");
        let firstQuery=urlquery[0].split("=");
        let secondQuery=urlquery[1].split("=");
        
        res.setHeader('Content-Type','text/html');
        res.write(firstQuery[1]+"<br>")
        res.write(secondQuery[1]+"<br>")
        res.end("Submit success!")
    }
    else{
        res.setHeader('Content-Type','text/html');
        res.write('<h1>This is 102. You are the'+ (i++) +'th visitor');
        res.end();
    }
    
    console.log("This is my consolelog");
});
server.listen(3000);