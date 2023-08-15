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

function back(){
    // 点击这个位置什么都没有 能返回到最开始的页面 主页面弹窗什么的都能去掉  多点也没事
    click(250,250)
}
// 找对应的图标
function findIco(icoName){
    sleep(1000);
    let bigImg = captureScreen();
    let smallImg = images.read("/storage/emulated/0/Pictures/Screenshots/"+icoName+".png");
    if(smallImg == null){
        logF('小图没有');
    }else{
        logF('找到小图');
    }
    let result = images.matchTemplate(bigImg, smallImg, {
        threshold: 0.8
    });
    if (result != null) {
        logF('找到'+result.matches.length+'个！')
        for (let i = 0; i < result.matches.length; i++) {
            let pp = result.matches[i].point
            // log(pp)
            // console.log("找到" + 所找图)
            click(pp.x, pp.y)
            toast("find");
            sleep(2000)
            break;
        }
    } else {
        logF('一个都没找到')
    }
    
}
function logF(msg){
    toast(msg);
    console.log(msg);
}
// back();
// findIco('dongfu');
// sleep(2000);
// findIco('fudi');
// sleep(2000);
// findIco('tanxun');


// var superMario = images.read("./super_mario.jpg");
// var mario = images.read("./mario.png");
let superMario = captureScreen();
let mario = images.read("/storage/emulated/0/Pictures/Screenshots/"+icoName+".png");
var point = findImage(superMario, mario);
toastLog(point);

superMario.recycle();
mario.recycle();