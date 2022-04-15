auto.waitFor();
var height = device.height;
var width = device.width;
toast("京东领金币")
console.show()
console.log("京东领金币")
console.log("正在初始化... \n请勿继续操作屏幕！")
console.log("分辨率宽" + width + "\n" + "分辨率高" + height + "\n" + "手机型号" + device.model + "\n安卓版本" + device.release)
 
setScreenMetrics(width, height);
purchase()
 
function purchase(){
        device.keepScreenOn()
        console.hide()
        // 点击的 如果完成了下面的会继续上来的
        for(var i = 0; i < 100; i++){
            toast("逛逛好店" + i + "次");
            sleep(1000);
            click(900, 1300)
            sleep(12000);
            back();
            sleep(1000);
        }
        device.cancelKeepingAwake()
        toast("今日份金币领完了");
}