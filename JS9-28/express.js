var express = require("express"),
    fs = require("fs");
var app = new express();
// 静态目录
app.use(express.static("public"));
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
//获取轮播图上的导航菜单数据
app.get("/getMenu", function (req, res) {
    res.setHeader("Content-type", "application/json");
    //当前脚本所执行的目录
    res.sendFile(__dirname+"/public/data/index/menu.json");
});
//获取轮播图数据
app.get("/getBanner",function (req,res){
	res.setHeader("Content-type", "application/json");
    res.sendFile(__dirname+"/public/data/index/banner.json");
});
// mian模块 freewalk的数据
app.get("/getfreeWalk",function (req,res){
	res.setHeader("Content-type", "application/json");
    res.sendFile(__dirname+"/public/data/index/freeWalk.json");
});
// citywalk数据
app.get("/getcityWalk",function (req,res){
	res.setHeader("Content-type", "application/json");
    res.sendFile(__dirname+"/public/data/cityWalk/cityWalkList.json");
})
app.listen(8080);
console.log("服务器启动80");