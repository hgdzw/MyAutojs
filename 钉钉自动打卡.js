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
 
  //脚本执行时保持屏幕常亮  5分钟
  device.keepScreenOn(keepScreenOnMinutes * 60 * 1000);
 
  //随机休眠
  var sleep_time = random(0, randomSleepMinutes * 60 * 1000);
  sleep(sleep_time);
  //打开钉钉
  console.log("打开钉钉");
  launchApp("钉钉");
  sleep(3 * 1000);
 
  //判断是否已登录
  if (id("tv_welcome_name").exists()) {
    console.error("钉钉未登录");
    //启动自动登录
    reLogin();
  }
  //自动打卡通知
  if (click("我知道了")) {
    console.log("自动打卡成功");
  }
 
  //点击忽略更新（如果有）
  if (click("暂不更新")) {
    console.log("点击暂不更新");
  }
  sleep(5 * 1000);
 
  //点击工作台
  console.log("点击工作台");
  clickMessage("工作台");
  sleep(1 * 1000);
 
  //点击考勤进入打卡页面
  console.log("点击考勤打卡");
  clickMessage("考勤打卡");
  sleep(5 * 1000);
 
  //判断是否休息日
  if (className("android.view.View").text("今日休息").exists()) {
    console.log("今日休息");
    back();
    launchApp("Auto.js");
 
    exit();
  }
 
  //点击 查看打卡结果
  console.log("查看打卡结果");
  var x = className("android.view.View").textContains("已打卡").find();
  var send_msg = "未打卡成功";
  if (x.length > 1) {
    send_msg = x[1].text();
  } else if (x.length > 0) {
    send_msg = x[0].text();
  }
  console.log("打卡结果:", send_msg);
  //发送结果到微信
  sendWeiChat(getdate() + " " + send_msg);
  //返回控制台(避免下次启动出错)
  back();
  //返回主页
  home();
  sleep(1000);
  //打开autojs
  launchApp("Auto.js");
 
  //关闭屏幕常亮
  console.log("关闭屏幕常亮");
  device.cancelKeepingAwake();
  console.log("打卡完成");
  exit();
}
 
function reLogin() {
  sleep(2 * 1000);
  //启动自动登录
  if (id("cb_privacy").exists()) {
    //勾选协议
    id("cb_privacy").click();
    id("et_pwd_login").setText("0000");  //登录密码
    clickMessage("登录");
    console.log("登录成功");
    sleep(1 * 1000);
  }
}
 
//判断网络情况，如果没有网络，结束脚本运行
function internetCheck() {
  var url = "m.baidu.com";
  var res = http.get(url);
  if (res.statusCode != 200) {
    console.error("网络不可用");
    exit();
  }
}
 
//判断GPS是否可用，如果不可用，结束脚本运行
function gpsCheck() {
  importClass(android.location.LocationManager);
  importClass(android.content.Context);
  var locationManager = context.getSystemService(Context.LOCATION_SERVICE);
  if (!locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
    console.error("GPS不可用，无法打卡");
    exit();
  }
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
    console.error("点击" + message + "出错");
    exit();
  }
}
 
//向企业微信发送信息
function sendWeiChat(send_data) {
  var corpid = "xxxx"; //企业id  自己改
  var corpsecret = "xxxx"; //企业应用secret  自己改
  var HEADERS = { "Content-Type": "application/json ;charset=utf-8" };
  var r = http.get(
    "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=" +
      corpid +
      "&corpsecret=" +
      corpsecret,
    {
      headers: HEADERS,
    }
  );
  var js = r.body.json();
  var token = js.access_token;
  var data = {
    touser: "@all",
    msgtype: "text",
    agentid: 1000005, //应用id
    text: { content: send_data },
    safe: 0,
    enable_id_trans: 0,
    enable_duplicate_check: 0,
    duplicate_check_interval: 1800,
  };
  var wechaturl =
    "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + token;
  http.postJson(wechaturl, data, { headers: HEADERS });
}
 
function getdate() {
  fdate = new Date();
  year = fdate.getFullYear();
  month = fdate.getMonth();
  day = fdate.getDate();
  return year + "-" + month + "-" + day;
}
 
// 解锁屏幕
function unlock() {
  device.wakeUp();
  if(isDeviceLocked()){
      sleep(500);
      swipe(400, 1800, 800, 230, 1000); //上滑轨迹 自己调整
      sleep(500);
      var password = "1100"; //这里输入你手机的密码
      for (var i = 0; i < password.length; i++) {
          var p = text(password[i].toString()).findOne().bounds();
          click(p.centerX(), p.centerY());
          sleep(100);
      }
   }
}
 
//判断是否有屏幕锁
function isDeviceLocked() {
  importClass(android.app.KeyguardManager);
  importClass(android.content.Context);
  var km = context.getSystemService(Context.KEYGUARD_SERVICE);
  return km.isKeyguardLocked();
}