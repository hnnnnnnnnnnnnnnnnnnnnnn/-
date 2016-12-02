// 请求数据
$.ajax({
	url:"/getcityWalk",
	success : function(data){
		//动态创建
		createDom(data);
	}
})
function createDom(data){
	// console.log(data);
	for(var i = 0; i < data.length; i++){
		//添加图片
		var div_bigcard = $("<div/>").addClass("bigcard");
		div_bigcard.append($("<img/>").attr("src",data[i].imgurl));
		//添加地点
		var div_bigcard_info = $("<div/>").addClass(("bigcard_info"));
		var span_place = $("<span/>").addClass("place").html(data[i].address);
		//添加数量
		var div_num = $("<div/>").addClass("num");
		div_num.append($("<span/>").html(data[i].browseCount))
		.append("次浏览")
		.append($("<span/>").html(data[i].soldCount))
		.append('件已售');
		//添加标题
		var h2 = $("<h2/>").html(data[i].title);
		//添加列表
		var ul = $("<ul/>").addClass("list");
		for(var j = 0; j < data[i].introduce.length; j++){
			var li = $("<li/>").html(data[i].introduce[j]);
			// console.log(data[i].introduce[j])
			ul.append(li);
		}
		// 添加价格
		var div_bigPrice = $("<div/>").addClass("bigPrice").append($("<span/>").addClass("line").html(data[i].oldPrice+"元")).append($("<em/>").html(data[i].newPrice)).append('元起');
		//添加预定按钮
		var div_bottombar = $("<div/>").addClass("bottombar").html("立即预定");
		div_bigcard_info.append(span_place).append(div_num).append(h2).append(ul).append(div_bigPrice).append(div_bottombar);
		//添加到productlist
		$(".productlist").append(div_bigcard.append(div_bigcard_info));
	}
}
// 菜单的滑动事件
$(".nav>ul").tab({
	tipsPosition:"bottom",
	trigger:"mouseover",
	animation:false
	// width:72
});
// 右侧纵向导航栏
$(window).scroll(function(){
    var showHeight = $(window).height();
    var scrHeight = $(window).scrollTop();
    // console.log($(window).height())
    // console.log($(window).scrollTop());
    if(scrHeight>showHeight/2){
        $(".navfixed .order,.navfixed .collect").fadeIn();
    }else{
        $(".navfixed .order,.navfixed .collect").fadeOut();;
    }
    if(scrHeight>showHeight*1.3){
        $(".navfixed .turnBack").fadeIn();
    }else{
        $(".navfixed .turnBack").fadeOut();
    }
})
$(".turnBack").turnTop();