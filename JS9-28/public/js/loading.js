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
            // if(index == allCount){
            //     if(callback){
            //         callback();
            //     }
            // }
        }
    }
}
