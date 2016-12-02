// main导航栏的插件
$(".main_title ul").tab({
    animation: false,
    trigger: "mouseover",
    width: 80,
});
// **********导航栏上的二级菜单
//发送请求获取轮播图上面的导航菜单数据
$.ajax({
        url: "/getMenu",
        type: "GET",
        dateType: "json",
        success: function(data) {
            createNav(data);
        },
        err: function(err) {
            console.log(err);
        }
    })
//动态创建导航菜单
function createNav(data) {
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        // console.log(obj.title)	
        var p = $("<p/>").html(obj.title);
        p.data("moreCity", data[i].moreCity).parent().parent().mouseover(function(event) {
            console.log(this)
            var getCityMsg = $(this).data("moreCity");
        })
        $(".banner_nav_in").eq(i).append(p);
    }
    // 添加mainCity
    for (var i in data) {
        // console.log(data[i].mainCity)
        for (var j in data[i].mainCity) {
            $(".banner_nav_in").eq(i).append($("<a/>").html(data[i].mainCity[j]));
        }
    }
}
// 请求菜单的数据
$.ajax({
        url: "/getMenu",
        type: "GET",
        dateType: "json",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                $(".banner_nav>ol>li").eq(i).data("moreCity", data[i].moreCity);
                $(".banner_nav>ol>li").eq(i).data("cityImg", data[i].moreCityImg);
            }
        }
    })
// 二级菜单显示隐藏事件
$(".banner_nav>ol>li").mouseenter(function() {
    var moreCityTemp = $(this).data("moreCity");
    var cityImgTemp = $(this).data("cityImg");
    console.log($(this))
    $(this).append($(".banner_nav2").append($(".banner_nav2Content")));
    $(".banner_nav2Content").empty();
    // 有三条数据时候
    if(moreCityTemp.length == 3){
        for(var i = 0; i < moreCityTemp.length-1; i++){
            if(i==0){
                var div_column = $("<div/>").addClass("column");
                for(var j=0; j<2; j++){
                    var ul = $("<ul/>");
                    var div_nav_address = $("<div/>").addClass('nav_address')
                    .append($("<h2/>").addClass("nav_bigtitle").html(moreCityTemp[j].cityName)).append(ul);
                    var itemsTemp = moreCityTemp[j].items;
                    for (var k = 0; k < itemsTemp.length; k++) {
                        ul.append($("<li/>").html(itemsTemp[k]))
                    }
                    div_column.append(div_nav_address);
                }
                $(".banner_nav2Content").append(div_column);
            }
            if(i == 1){
                var div_column = $("<div/>").addClass("column");
                var ul = $("<ul/>");
                var div_nav_address = $("<div/>").addClass('nav_address')
                .append($("<h2/>").addClass("nav_bigtitle").html(moreCityTemp[i+1].cityName)).append(ul);
                 var itemsTemp = moreCityTemp[i+1].items;
                for (var j = 0; j < itemsTemp.length; j++) {
                    ul.append($("<li/>").html(itemsTemp[j]))
                }
                $(".banner_nav2Content").append(div_column.append(div_nav_address));
                    var p = $("<p/>").addClass("nav2_pic").append($("<img/>").attr('src', cityImgTemp));
                    div_column.append(p);
            }
        }
    }
    // 有两条数据的时候
    if(moreCityTemp.length == 2){
        for(var i = 0; i<moreCityTemp.length; i++){
            var div_column = $("<div/>").addClass("column");
            var ul = $("<ul/>");
            var div_nav_address = $("<div/>").addClass('nav_address')
            .append($("<h2/>").addClass("nav_bigtitle").html(moreCityTemp[i].cityName)).append(ul);
             var itemsTemp = moreCityTemp[i].items;
            for (var j = 0; j < itemsTemp.length; j++) {
                ul.append($("<li/>").html(itemsTemp[j]))
            }
            $(".banner_nav2Content").append(div_column.append(div_nav_address));
            if(i == moreCityTemp.length-1){
                // alert(1) 
                var p = $("<p/>").addClass("nav2_pic").append($("<img/>").attr('src', cityImgTemp));
                div_column.append(p);
            }
        }
    }
    // 主题推荐部分
    if(moreCityTemp.length == 1){
        for(var i = 0; i<moreCityTemp.length; i++){
            var div_column = $("<div/>").addClass("column");
            var div_nav_address = $("<div/>").addClass('nav_address')
            .append($("<h2/>").addClass("nav_bigtitle").html(moreCityTemp[i].cityName));
            var itemsArr = moreCityTemp[i].items;
            // console.log(itemsArr);
            for(var j = 0; j < itemsArr.length; j++){
                console.log(itemsArr[j]);
                var itemsImg = $("<img/>").attr("src",itemsArr[j]).css({
                    "width":80,
                    "height":80,
                    "float":"left",
                    "margin-bottom":10,
                    "margin-right":10,
                    "margin-top":10
                });
                div_nav_address.append(itemsImg)
            }
            $(".banner_nav2Content").append(div_column.append(div_nav_address));
        }
        $(".banner_nav2").show().css("width",400);
    }
    $(".banner_nav2").show();
    
}).mouseleave(function(){
     $(".banner_nav2").hide().css("width",720);
});;
// 鼠标离开二级菜单隐藏
// $(".banner_nav2").mouseleave(function() {
//     $(".banner_nav2").hide();
// });
// $(".banner_nav>ol").mouseleave(function() {
//     $(".banner_nav2").hide();
// });
// 请求freeWalk.json文件的数据
$.ajax({
        url: "/getfreeWalk",
        type: "GET",
        dateType: "json",
        success: function(data) {
            // ***动态创建第一个模块
            // 承载导航菜单的ul
            var ul = $("<ul/>");

            var ulCon2 = $("<ul/>");
            var ulCon3 = $("<ul/>");
            for (var i = 0; i < data.length; i++) {
                var li = $("<li/>");
                var liCon2 = $("<li/>");
                var liCon3 = $("<li/>");
                // 添加标题
                ul.append(li.data("data", data[i].data).html(data[i].title));
                ulCon2.append(liCon2.data("data", data[i].data).html(data[i].title));
                ulCon3.append(liCon3.data("data", data[i].data).html(data[i].title));

                // 给每个标题添加事件
                li.mouseover(createDom);
                liCon2.mouseover(createDom3);
                liCon3.mouseover(createDom2);
                // 动态创建第一个模块
                function createDom() {
                    $(".freeWalk>.freeWalk_main").empty();
                    // 承载内容的ul
                    // console.log($(this).data("data"))
                    $(this).css("color", "#43c77a").siblings().css("color", "#333");
                    var data = $(this).data("data");
                    // 动态添加图片
                    for (var i = 0; i < data.length; i++) {
                        var li = $("<li/>");
                        var img = $("<img/>").attr("src", data[i].imgUrl);
                        var h3div = $("<div/>").addClass("picTitle1").append($("<h3/>").html(data[i].title));
                        var indiv = $("<div/>").addClass("infos1")
                            .append($("<p/>").addClass("type1").html("机票"))
                            .append($("<p/>").addClass("pirce1").html(data[i].price));
                        li.append(img);
                        li.append(indiv);
                        li.append(h3div);
                        // console.log(clName)
                        var clName = $(this).parent().parent().parent().attr("class");
                        $(".freeWalk>.freeWalk_main").append(li);
                    }
                }
                // 动态创建第三个模块
                function createDom3() {
                    $(".theme>.freeWalk_main").empty();
                    // 承载内容的ul
                    // console.log($(this).data("data"))
                    $(this).css("color", "#43c77a").siblings().css("color", "#333");
                    var data = $(this).data("data");
                    // 动态添加图片
                    for (var i = 0; i < data.length; i++) {
                        var li = $("<li/>");
                        var img = $("<img/>").attr("src", data[i].imgUrl);
                        var h3div = $("<div/>").addClass("picTitle1").append($("<h3/>").html(data[i].title));
                        var indiv = $("<div/>").addClass("infos1")
                            .append($("<p/>").addClass("type1").html("机票"))
                            .append($("<p/>")
                                .addClass("pirce1").html(data[i].price + "￥"));
                        li.append(img);
                        li.append(indiv);
                        li.append(h3div);
                        // console.log(clName)
                        var clName = $(this).parent().parent().parent().attr("class");
                        // if(clName == "freeWalk"){
                        $(".theme>.freeWalk_main").append(li);
                    }
                    // var lastLi = $("<li/>");
                    // $(".freeWalk_main").append(lastLi);
                }
                // 触发一个mouseover事件让第一个显示
                ul.children().eq(0).trigger("mouseover");
                ulCon2.children().eq(0).trigger("mouseover");
            }
            // 
            function createDom2() {
                $(this).css("color", "#43c77a").siblings().css("color", "#333");
            }
            // 添加菜单
            $(".freeWalk>.main_title").append(ul);
            $(".theme>.main_title").append(ulCon2);
            $(".cityPlay>.main_title").append(ulCon3);
            // **动态添加第二个模块

            // ul.tab();
        }
    })
    // 图片预加载
function loading(obj) {
    var imgs = obj.imgs; //得到图片对象
    var callback = obj.done; //得到图片全部加载完成后的回调函数
    var allCount = 0; //图片总数量
    for (var key in imgs) {
        allCount++; //得到图片总数量
    }
    var index = 0; //初始化已加载完成图片数量
    var rObj = {}; //构建返回的图片对象{name:img对象}
    for (var key in imgs) {
        var img = new Image();
        img.src = imgs[key];
        rObj[key] = img;
        img.onload = function() {
            index++;
            (index == allCount) && (callback && callback(rObj))
        }
    }
}
// 请求轮播图图片数据
$.ajax({
        url: "/getBanner",
        type: "GET",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                var li = $("<li/>").css("background-image", "url(" + data[i].imgUrl + ")");
                $(".banner_loop ul").append(li);
            }
        }
    })
// 轮播动画
// 定义一个定时器
var time;
var time = setInterval(run,2000);
var i =0;
function run(){
    // console.log(i)
	i==-300?i=0:i-=100;
    // console.log(Math.abs(i/100));
    $(".loop_nub>span").eq(Math.abs(i/100)).css({
        "background":"#ff7467",
        "opacity":1
    }).siblings().css({
        "background":"#000",
        "opacity":.5
    })
	$(".banner_loop ul").animate({
		left:i+"%"
	})
}
// 鼠标在上面停止定时器
$(".banner_loop").mouseover(function(){
	clearInterval(time);
})
// 鼠标移除重启定时器
$(".banner_loop").mouseout(function(){
	time = setInterval(run,2000);
})
// 上一个按钮
$(".prve").click(function(){
	i>=0?i=-200:i+=200;
	// console.log(i)
	run();
})
// 下一个按钮
$(".next").click(function(){
	// i-=100;
	run();
})
// 轮播图的索引按钮
$(".loop_nub>span").click(function(){
    //-300 0 -100 -200
    i = $(this).index();
    i==0?i=-300:i=-100*(i-1);
    run();
})
// 打开另一个页面
$(".CityWalk").click(function() {
    window.open("html/CityWalk.html");
});
// 回到顶部事件
$(window).scroll(function(){
    var showHeight = $(window).height();
    var scrHeight = $(window).scrollTop();
    // console.log($(window).height())
    // console.log($(window).scrollTop());
    if(scrHeight>showHeight/2){
        $(".navfixed .order,.navfixed .collect").fadeIn();
    }else{
        $(".navfixed .order,.navfixed .collect").fadeOut();
    }
    if(scrHeight>showHeight*1.3){
        $(".navfixed .turnBack").fadeIn();
    }else{
        $(".navfixed .turnBack").fadeOut();
    }
})
$(".navfixed").turnTop();