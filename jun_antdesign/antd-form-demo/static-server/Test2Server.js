const path=require("path");
const express=require("express");
const server=express();

const staticPath=path.resolve(__dirname,"./test2");
server.use(express.static(staticPath))

// server.use("/",function(request,response,next){
// 	response.send("<h1>5454</h1>")
// })

server.listen(6001,()=>{
	console.log("访问http://localhost:6001");
})