//请求截图，用找图方法，第一个就要先写的请求截图代码，不然找图没法用
threads.start(function (){
    var beginBtn;
    if (beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000)) {
    beginBtn.click();
    }
});

if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}
sleep(2000)

let image = captureScreen();

//返回 ARGB   32位整数    -1184275
let se = images.pixel(image, 470, 280)

toast(se)

// 找色   指定颜色 返回颜色点 
// var img = captureScreen();
var point = findColor(image, se);
if(point){
    toast("找到红色，坐标为(" + point.x + ", " + point.y + ")");
}else{
    toast("没找到");
}

// 找图  指定图片 返回图片点
var p = findImage(img, templ);



//比较点    判断点 是否是制定的颜色   
if(images.detectsColor(img, "#fed9a8", x, y)){
    //是的话则已经是点赞过的了，不做任何动作
}else{
    //否则点击点赞按钮
    like.click();
}
// let bigImg = captureScreen();

//循环找色，找到红色(#ff0000)时停止并报告坐标
// while(true){
//     var img = captureScreen();
//     var point = findColor(img, "#ff0000");
//     if(point){
//         toast("找到红色，坐标为(" + point.x + ", " + point.y + ")");
//     }
// }




