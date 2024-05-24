const http=require('http')

const Server=http.createServer((req,res)=>{
    res.end("hello world")
});

Server.listen(8000,()=>{
    console.log("app is running on port 8000")
})