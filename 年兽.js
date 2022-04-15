//请求截图，用找图方法，第一个就要先写的请求截图代码，不然找图没法用
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}
let 大图 = captureScreen()
// let 小图 = images.read("/storage/emulated/0/Pictures/Screenshots/kuangniu/" + 所找图 + ".png");
let 小图 = images.read("手机存储/Pictures/WeiXin/mmexport1643253597062.jpg");
toast(小图);
let result = images.matchTemplate(大图, 小图, {
    max: 5
});

if (result != null) {
    for (let i = 0; i < result.matches.length; i++) {
        let pp = result.matches[i].point
        // log(pp)
        // console.log("找到" + 所找图)
        click(pp.x, pp.y)
        console.log("点击" + 所找图)
        sleep(2000)
        break;
    }
} else {
    console.log("===未找到" + 所找图)
}
