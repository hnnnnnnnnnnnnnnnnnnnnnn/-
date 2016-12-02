$.fn.extend({
	turnTop: function(options){
		var defaults ={
			animation : true,
			trigger : "click",
			// pos : "fixed",
			// right : 10,
			// bottom : 20,
			// width : 80,
			// height : 30,
			// background : "red"
		};
		var _default = $.extend({},defaults,options);
		// console.log(this)
		// 设置按钮位置,样式
		$(this).css({
			"position" : _default.pos,
			"right" : _default.right,
			"bottom" : _default.bottom,
			"width" : _default.width,
			"height" : _default.height,
			"background" : _default.background
		})
		// 触发事件
		this.on(_default.trigger,function(){
			if(_default.animation){
				var timer = setInterval(function(){
					var scrollTemp =document.body.scrollTop +document.documentElement.scrollTop;
				 	document.body.scrollTop=document.documentElement.scrollTop = scrollTemp -scrollTemp/5;
				 	if(scrollTemp<=10){
				 		document.body.scrollTop = 0;
				 		clearInterval(timer);
				 	}
				},50);
			}else{
				document.body.scrollTop=document.documentElement.scrollTop=0;
			}
		})
	}
})