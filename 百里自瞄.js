// 首先点击二技能两秒  然后截图查找敌人 算出敌人和我的角度 再将点击往指定方向偏移

if (!requestScreenCapture()) {
    toast("请求截图失败");
    stop();
}
//禁用音量上键原来功能
events.setKeyInterceptionEnabled("volume_up", true);
events.setKeyInterceptionEnabled("volume_down", true);
//启用按键监听
events.observeKey();
//监听音量上键按下
events.onKeyDown("volume_up", function (event) {

    var img = captureScreen();
    // var img = images.read("image/2.jpg");
    var templ = images.read("image/小.jpg");
    var p = findImage(img, templ);
    if (p) {
        toast("找到啦:" + p);
        // toast(p.x - 1200);
        // toast(p.y - 540);
        // toast((p.y - 540) / (p.x - 1200));
        var chu = (p.y - 540) / (p.x - 1200);
        toast(chu);
        gestures([0, 500, [1758 + 20, 743 + (20 * chu)]]
        );
    } else {
        toast("没找到");
    }
    //回收图片
    img.recycle();

    //现在的位置 1200 540   找到的位置 p.x p.y
    // toast("音量上键被按下了");
});

var win_1 = floaty.rawWindow(
    <frame id="logo" w="44" h="44" alpha="0.4" >//悬浮按钮
        <img w="44" h="44" src="#ffffff" circle="true" alpha="0.8" />
        <img id="img_logo" w="32" h="32" src="https://pro.autojs.org/images/logo.png" gravity="center" layout_gravity="center" />
        <img id="logo_click" w="*" h="*" src="#ffffff" alpha="0" />
    </frame>
)
win_1.setPosition(-30, device.height / 2)//悬浮按钮定位

var terid = setInterval(() => {
    log("13")
}, 1000);

win_1.logo.on("click", () => {
    var thread = threads.start(function () {
        //设置一个空的定时来保持线程的运行状态
        setInterval(function () { }, 1000);
    });
    //等待该线程完成
    thread.join();
})