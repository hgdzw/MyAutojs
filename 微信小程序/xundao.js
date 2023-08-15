// 自动找桃子
auto()
//请求截图，自动点击掉 立即开始
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
sleep(1000)

click(316,2253);
