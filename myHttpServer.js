const http=require('http');
const fs=require('fs');
const querystring=require('querystring');
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
        let obQuery=querystring.parse(url1[1]);
        if(obQuery.submit1=="Save"){
            fs.writeFile("./savefile",obQuery.name123+'\n',(err)=>{
                if(err) console.log("Write file err!");
                else console.log("Write file success!");
            })
        }
        else{
            fs.appendFile("./savefile",obQuery.name123+'\n',(err)=>{
                if(err) console.log("Append file err!");
                else console.log("Append file success!");
            })
        }

        res.setHeader('Content-Type','text/html');
        res.write(obQuery.name123+"<br>")
        res.write(obQuery.submit1+"<br>")
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