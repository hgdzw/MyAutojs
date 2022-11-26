//脚本执行时保持屏幕常亮,默认5分钟
var keepScreenOnMinutes = 5;
 
//随机休眠时间段
var randomSleepMinutes = 1;
 
//进入打卡流程
punchTheClock();
 
function punchTheClock() {
  //唤醒手机
  device.wakeUp();
  sleep(2 * 1000);
 
  //判断屏幕是否唤醒成功
  if (!device.isScreenOn()) {
    console.error("屏幕未唤醒，解锁手机");
    exit();
  } else {
    unlock();
  }
  toast("屏幕已解锁");
 
  //脚本执行时保持屏幕常亮  5分钟
  device.keepScreenOn(keepScreenOnMinutes * 60 * 1000);

  //随机休眠
  var sleep_time = random(0, randomSleepMinutes * 60 * 1000);
  // sleep(sleep_time);
  //打开钉钉
  toast("打开钉钉");
  launchApp("钉钉");
  sleep(10 * 1000);
  
    //点击忽略更新（如果有）
    if (click("暂不更新")) {
        console.log("点击暂不更新");
    }
    // 辉哥
    // http.get("https://sctapi.ftqq.com/SCT184398T8bdHwtRm6W2OWyeuk7LmDC5k.send?title=dingding_login_success&desp=long_content");
    // 判断是不是打过卡了
    var res = className("android.view.ViewGroup").findOne();
    click(res.bounds().centerX(), res.bounds().centerY())
    sleep(2 * 1000);
    var res = id("chatting_time_tv").findOnce(1);
    var upTime = res.text()
    toast("上次打卡时间"+upTime);
    console.log("上次打卡时间"+upTime);
    sleep(1 * 1000);
    var nowTime = getTime()
    console.log("本次打卡时间"+upTime);
    toast("上次打卡时间"+upTime);
    if(nowTime == upTime || "刚刚" == upTime){
        toast("时间相等，打卡成功");
        http.get("https://sctapi.ftqq.com/SCT154874Tst5q2yeCTjPJB20GtN7DBbP2.send?title=钉钉打卡成功_结果"+upTime+"&desp=long_content");
    }else{
        toast("时间不相等，打卡失败");
        http.get("https://sctapi.ftqq.com/SCT154874Tst5q2yeCTjPJB20GtN7DBbP2.send?title=钉钉打卡失败_结果"+upTime+"&desp=long_content");
    }
  sleep(2 * 1000);
  back();
  sleep(1 * 1000);
  back();
  sleep(1 * 1000);
  back();
  //关闭屏幕常亮
  console.log("关闭屏幕常亮");
  device.cancelKeepingAwake();
  console.log("打卡完成");

  exit();
}
 
//根据控件文字点击，如果点击失败，则说明打卡流程无法正常进行，结束脚本运行
function clickMessage(message) {
  var n = 3;
  var logo = false;
  while (n--) {
    if (click(message)) {
      logo = true;
      break;
    }
    sleep(1 * 1000);
  }
  if (logo == false) {
    toast("点击" + message + "出错");
    exit();
  }
}

function getTime(){
    var date = new Date();
    var HH=date.getHours();
    HH=HH <10? "0" + HH:HH;
    var mm=date.getMinutes(); 
    mm = mm< 10?  "0"+ mm:mm; 
    return HH  + ":" + mm;
}

 
// 解锁屏幕
function unlock() {
  device.wakeUp();
  if(isDeviceLocked()){
      sleep(500);
    //   swipe(400, 1800, 400, 700, 200); //上滑轨迹 自己调整
      gesture(1000, [400, 1800], [400, 700])
      sleep(500);
          // 手机设置没密码吧
    //   var password = "1234"; //这里输入你手机的密码
    //   for (var i = 0; i < password.length; i++) {
    //       var p = text(password[i].toString()).findOne().bounds();
    //       click(p.centerX(), p.centerY());
    //       sleep(100);
    //   }
   }
}
 
//判断是否有屏幕锁
function isDeviceLocked() {
  importClass(android.app.KeyguardManager);
  importClass(android.content.Context);
  var km = context.getSystemService(Context.KEYGUARD_SERVICE);
  return km.isKeyguardLocked();
}