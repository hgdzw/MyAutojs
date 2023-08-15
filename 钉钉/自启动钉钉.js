//脚本执行时保持屏幕常亮,默认5分钟
var keepScreenOnMinutes = 5;
 
//随机休眠时间段
var randomSleepMinutes = 1;

var tang = "";
var pPlus = "";
var hui = false
if(hui){
  tang = "SCT184398T8bdHwtRm6W2OWyeuk7LmDC5k";
  pPlus = "f049e5d1a9ce4db2ab4ddde7e4347630";
}else{
  // tang = "SCT154874Tst5q2yeCTjPJB20GtN7DBbP2";
  pPlus = "2f81cce471ce4ace9d732b686d5d77e8";
  //ping
  // pPlus = "acebbffed8704d0c8300091596f5d0bf";

  // pPlus = "95cc17ff0767482f8c13bd641391de30";
}

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
  // http.get("https://sctapi.ftqq.com/SCT184398T8bdHwtRm6W2OWyeuk7LmDC5k.send?title="+title+"&desp="+context);
  // http.get("http://www.pushplus.plus/send?token=f049e5d1a9ce4db2ab4ddde7e4347630&title="+title+"&content="+context+"&template=txt");
  
  // 判断是不是打过卡了
  var res = id("session_item").findOne();
  click(res.bounds().centerX(), res.bounds().centerY())
  sleep(2 * 1000);
  try{
    // findTimePushOne();
    findTimePushTwo();
  }catch(e){
    console.log("发送消息异常！",e);
    var message = "大概是text又找不到了，不过基本上进了这里自动打卡应该成功了~";
    // http.get("https://sctapi.ftqq.com/"+tang+".send?title=打卡出现异常&desp="+message);
    http.get("http://www.pushplus.plus/send?token="+pPlus+"&title=打卡出现异常&content="+message+"&template=txt");
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

//第一种方式 找时间 和当前时间比较
function findTimePushOne(){

  var res = id("chatting_time_tv").findOnce(1);
  var upTime = res.text()
  toast("上次打卡时间"+upTime);
  console.log("上次打卡时间"+upTime);
  sleep(1 * 1000);
  var nowTime = getTime()
  console.log("本次打卡时间"+upTime);
  toast("上次打卡时间"+upTime);
  var result = "";
  if(nowTime == upTime || "刚刚" == upTime){
      toast("时间相等，打卡成功");
      result = "成功";
  }else{
      result = "失败";
      toast("时间不相等，打卡失败");
  }
  var title = "钉钉打卡"+ result +"_结果"+upTime;
  var context = '当前时间' + nowTime + ',钉钉获取第一个时间为' + upTime
  //推送到两个地方
  // http.get("https://sctapi.ftqq.com/"+tang+".send?title="+title+"&desp="+context);
  http.get("http://www.pushplus.plus/send?token="+pPlus+"&title="+title+"&content="+context+"&template=txt");
}

// 第二种方式 找屏幕中当前时间是不是有 有的话就发送
function findTimePushTwo(){

  var nowTime = getTime()
  console.log("本次打卡时间"+nowTime);
  var result = "";
  if (text(nowTime).findOnce()) {
    toast("时间相等，打卡成功");
    result = "成功";
  }else{
      result = "失败";
      toast("时间不相等，打卡失败");
  }
  var title = "钉钉打卡"+ result;
  var context = '当前时间' + nowTime
  //推送到两个地方
  // http.get("https://sctapi.ftqq.com/"+tang+".send?title="+title+"&desp="+context);
  http.get("http://www.pushplus.plus/send?token="+pPlus+"&title="+title+"&content="+context+"&template=txt");
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
      swipe(400, 1800, 400, 700, 200); //上滑轨迹 自己调整
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