// 对图片处理的测试
//启用触摸监听
events.observeTouch();
//注册触摸监听器
events.onTouch(function (p) {
    //触摸事件发生时, 打印出触摸的点的坐标
    toast("11111111");
});
// getImg();
// 找一个点的坐标
function getCap() {
    if (!requestScreenCapture()) {
        toast("请求截图失败");
        stop();
    }
    var img = captureScreen();
    toastLog("开始找色");
    //0x1d75b3为编辑器默认主题蓝色字体(if, var等关键字)的颜色
    //找到颜色与0x1d75b3完全相等的颜色
    var point = findColorEquals(img, "#e12a33");
    if (point) {
        toastLog("x = " + point.x + ", y = " + point.y);
    } else {
        toastLog("没有找到");
    }
}

function getImg() {
    if (!requestScreenCapture()) {
        toast("请求截图失败");
        stop();
    }
    // var img = captureScreen();
    var img = images.read("image/2.jpg");
    var templ = images.read("image/小.jpg");
    // var templ = images.read("/image/小.png");
    var p = findImage(img, templ);
    if (p) {
        toast("找到啦:" + p);
    } else {
        toast("没找到");
    }
    //回收图片
    img.recycle();
}