$.fn.extend({
    tab: function(options) {
        var defaults = {
            active: 10, //激活的tab索引值  默认0 第一个
            tipsPosition: "top", //默认提示条所在位置 上
            animation: true, //提示条移动是否有动画效果 默认 true
            trigger: "click", //tab 切换 触发方式 默认 click 点击
            callback: null //tab切换后触发的回调函数 默认 null
        };
        var _default = $.extend({}, defaults, options); //合并默认配置项与传入配置项
        this.each(function(m, n) {
            var _parent = $(n); // 也等于 $(this)
            var _children = _parent.children('li'); //取得当前父元素下的所有LI
            var tips = $("<div class='z-tips'/>"); //创建提示条 赋class
            _parent.append(tips);
            if (_default.width) {
                //自定义宽度
                _children.css({
                    paddingLeft: 0,
                    paddingRight: 0,
                    width: _default.width
                })
            }
            if (_default.height) {
                //自定义高度
                _children.css({
                    height: _default.height,
                    paddingTop: 0,
                    paddingBottom: 0,
                    lineHeight: _default.height + "px"
                })
            }
            _children.on(_default.trigger, function() {
                var liH = $(this).outerHeight(), //获取点击标签的高和宽
                    liW = $(this).outerWidth(),
                    _top = $(this).position().top, //获取点击标签的位置信息
                    _left = $(this).position().left;
                var _dh = 3;//默认提示条的高度
                if (_default.tipsPosition == "bottom") {
                    //提示条显示在下方
                    _top = liH - 4+8;
                } else if (_default.tipsPosition == "left") {
                    liW = 4;
                    _dh = liH;
                }
                if (_default.animation) { //要执行提示条的动画效果
                    tips.css({
                        width: liW,
                        height : _dh
                    }).animate({
                        left: _left,
                        top: _top
                    }).show();
                } else {
                    //无动画效果
                    tips.css({
                        width: liW,
                        height : _dh,
                        left: _left+10,
                        top: _top+1
                    }).show();
                };
                //操作点击标签的样式
                $(this).addClass("z-active").siblings("li").removeClass('z-active');
                if($.isFunction(_default.callback)){
                    //如果含有激活的回调函数 则执行
                    _default.callback($(this).index(),$(this).text());
                }
            });
// .eq(_default.active).addClass('z-active').trigger(_default.trigger);
        })
    }
});
//$.fn.myPlugin = function(options){}
//$.fn.tab = function(options){}
//
