auto.waitFor();
var height = device.height;
var width = device.width;
toast("京东取消关注")
console.show()
console.log("京东取消关注")
console.log("正在初始化... \n请勿继续操作屏幕！")
console.log("分辨率宽" + width + "\n" + "分辨率高" + height + "\n" + "手机型号" + device.model + "\n安卓版本" + device.release)

for(var i = 0 ;i < 1000; i ++ ){
    if(textContains("去逛逛更多好店").exists()){
        break
    }
    sleep(2000);
    click(1000, 600)
    sleep(1000);
    click(737, 611)
}

toast("取消关注结束，已全部取消!")
