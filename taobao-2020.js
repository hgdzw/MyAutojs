auto.waitFor();//auto.waitFor()则会在在无障碍服务启动后继续运行 1080   2408
var height = device.height;
var width = device.width;
toast("\n设备宽" + width + "\n" + "设备高" + height + "\n" + "手机型号" + device.model + "\n安卓版本" + device.release)//获取手机信息并输出
setScreenMetrics(width, height);
lingqu();//缩放手机像素，并且
function lingqu() {

    init()
    sleep(1000);
    go_browse("去浏览")
    swipe22s("去逛逛")
    sleep(1500);
    toast("结束");
}

// 初始化到这个页面
function init(){
    launchApp("淘宝");//打开的程序
    toast("打开淘宝")
    sleep(2000);
    // className("android.widget.FrameLayout").depth("5").drawingOrder("19").findOne().click()
    bounds(540,1080,1054,1345).findOne().click();
    toast("进入活动界面中...")
    sleep(2000);
    press(971 , 1887.69, 500)
    toast("拉起浏览界面...")
    sleep(1500);
    if(textEndsWith("签到").exists()){
        toast("新版签到")
        textEndsWith("签到").findOne().click();
        sleep(1600);
        toast("签到成功");
    }
}

// 去浏览
function go_browse(){
    while(textContains("去浏览").exists()){        
        toast("存在去浏览");
        textContains("去浏览").findOne().click();
        sleep(2000);
        if(textContains("逛店最多").exists()){
            swipe22s("逛店最多")
            back();
        }else{
            // 没有
            sleep(1500);
            swipe(width / 2, height - 500, width / 2, 0, 500);
            sleep(2500);
            swipe(width / 2, height - 500, width / 2, 0, 500);
            sleep(10000);
            swipe(width / 2, height - 500, width / 2, 0, 500);
            sleep(8000);
            if(textContains("完成").exists()){
                back();
            } else {
                sleep(2200);
                back();
            }
            sleep(1600);
        }
    }
    toast("完成[去浏览]检测");
    sleep(2000);
}

function swipe22s(act){
    while(textContains(act).exists()){        
        toast("存在" + act);
        textContains(act).findOne().click();
        sleep(1500);
        swipe(width / 2, height - 500, width / 2, 0, 500);
        sleep(2500);
        swipe(width / 2, height - 500, width / 2, 0, 500);
        sleep(10000);
        swipe(width / 2, height - 500, width / 2, 0, 500);
        sleep(8000);
        if(textContains("完成").exists()){
            back();
        } else {
            sleep(2200);
            back();
        }
        sleep(1600);
    }
    toast("完成[" + act + "]检测");
    sleep(2000);
}