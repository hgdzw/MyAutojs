
// device.wakeUp();

  //判断屏幕是否唤醒成功
if (!device.isScreenOn()) {
    console.error("屏幕未唤醒，解锁手机");
    exit();
} else {
    unlock();
}


if (!requestScreenCapture()) {
    toast("请求截图失败");
    stop();
}


// 截图 然后识别
//请求横屏截图
requestScreenCapture(true);
//截图
// var img = captureScreen();
captureScreen("/sdcard/ad公告22.jpg");
var src = images.read("/sdcard/公告.jpg");
// 裁剪图片 (x, y)处剪切大小为w * h
var clip =images.clip(src, 200, 500, 400, 400)
images.save(clip, "/sdcard/clip.png");
toast("保存成功")

// 解锁屏幕
function unlock() {
    device.wakeUp();
    if(isDeviceLocked()){
        toast("有锁 开始解锁");
        sleep(500);
        swipe(400, 1800, 800, 230, 1000); //上滑轨迹 自己调整
        sleep(500);
     }
  }
   
  //判断是否有屏幕锁
  function isDeviceLocked() {
    importClass(android.app.KeyguardManager);
    importClass(android.content.Context);
    var km = context.getSystemService(Context.KEYGUARD_SERVICE);
    return km.isKeyguardLocked();
  }